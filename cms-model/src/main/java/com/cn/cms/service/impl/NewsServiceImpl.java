package com.cn.cms.service.impl;

import com.cn.cms.dao.*;
import com.cn.cms.enums.*;
import com.cn.cms.job.IndexThread;
import com.cn.cms.po.*;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/18.
 */
@Repository
public class NewsServiceImpl implements NewsService {

    @Resource
    private NewsColumnDao newsColumnDao;

    @Resource
    private NewsDao newsDao;

    @Resource
    private NewsDetailDao newsDetailDao;

    @Resource
    private NewsStockDao newsStockDao;

    @Resource
    private RecommendColumnDao recommendColumnDao;

    @Resource(name = "threadTaskExecutor")
    private ThreadPoolTaskExecutor threadTaskExecutor;

    @Override
    public Integer queryListCount() {
        return newsColumnDao.queryListCount();
    }

    @Override
    public List<NewsColumn> queryListForPage(Page page) {
        return newsColumnDao.queryListForPage(page);
    }

    public List<NewsColumn> queryList(Long channelId) {
        return newsColumnDao.queryList(channelId);
    }

    @Override
    public List<NewsColumn> getListForChannelIds(List<Long> ids) {
        return newsColumnDao.getListForChannelIds(ids);
    }

    public void saveNewsColumn(NewsColumn newsColumn) {
        newsColumnDao.saveNewsColumn(newsColumn);
    }

    @Override
    public void updateNewsColumn(NewsColumn newsColumn) {
        newsColumnDao.updateNewsColumn(newsColumn);
    }

    @Override
    public NewsColumn getNewsColumn(Long id) {
        return newsColumnDao.getNewsColumn(id);
    }

    public void delNewsColumn(String lastModifyUserId, Long id) {
        newsColumnDao.delNewsColumn(lastModifyUserId, id);
    }

    public List<News> queryNewsList(String userId, Integer publish, Integer delTag ,Page page) {
        return newsDao.queryNewsList(userId, publish, delTag, page);
    }

    public Integer queryNewsCount(String userId, Integer publish, Integer delTag) {
        return newsDao.queryNewsCount(userId, delTag, publish);
    }

    public News findNewsAndDetail(Long id) {
        News news = newsDao.findNewsAndDetail(id, null);
        if(news!=null){
            NewsDetail newsDetail = newsDetailDao.findNewsDetail(id);
            news.setNewsDetail(newsDetail);
            return news;
        }
        return null;
    }


    public void saveNews(News news) {
        newsDao.saveNews(news);
        news.getNewsDetail().setNewsId(news.getId());
        newsDetailDao.saveNewsDetail(news.getNewsDetail());
        if(StringUtils.isNotEmpty(news.getNewsStocks())) {
            newsStockDao.saveStocks(news.getNewsStocks());
        }
        sendIndex(news);
    }

    private void sendIndex(Base base){
        IndexThread indexThread = new IndexThread();
        indexThread.setId(base.getId());
        indexThread.setIndexOperEnum(IndexOperEnum.update);
        indexThread.setEsSearchTypeEnum(ESSearchTypeEnum.news);
        threadTaskExecutor.execute(indexThread);
    }

    private void delIndex(Long id){
        Base base = new Base();
        base.setId(id);
        IndexThread indexThread = new IndexThread();
        indexThread.setId(base.getId());
        indexThread.setIndexOperEnum(IndexOperEnum.delete);
        indexThread.setEsSearchTypeEnum(ESSearchTypeEnum.news);
        threadTaskExecutor.execute(indexThread);
    }


    public void updateNews(News news) {
        newsDao.updateNews(news);
        newsDetailDao.updateNewsDetail(news.getNewsDetail());
        newsStockDao.delStocks(news.getId());
        if(StringUtils.isNotEmpty(news.getNewsStocks())) {
            newsStockDao.saveStocks(news.getNewsStocks());
        }
        sendIndex(news);
    }

    public void delNews(String lastModifyUserId, Long id) {
        newsDao.delNews(lastModifyUserId, id);
        newsDetailDao.delNewsDetail(lastModifyUserId, id);
        newsStockDao.delStocks(id);
        delIndex(id);
    }

    public void recoverNews(List<NewsStock> list, String lastModifyUserId, Long id){
        newsDao.recoverNews(lastModifyUserId, id);
        newsDetailDao.recoverNewsDetail(lastModifyUserId, id);
        if(StringUtils.isNotEmpty(list)) {
            newsStockDao.saveStocks(list);
        }
        Base base = new Base();
        base.setId(id);
        sendIndex(base);
    }

    @Override
    public List<News> findNewsByColumnId(Long columnId, Page page) {
        return newsDao.findNewsByColumnId(columnId, page);
    }

    @Override
    public void publishNews(News news) {
        newsDao.publishNews(news);
        sendIndex(news);
    }

    @Override
    public List<News> findNewsByAutoPublish(PublishEnum publishEnum, AutoPublishEnum autoPublishEnum, Date timer) {
        return newsDao.findNewsByAutoPublish(publishEnum.getType(), autoPublishEnum.getType(), timer);
    }

    @Override
    public List<News> findNewsAndDetailList(List<Long> ids) {
        List<News> list = newsDao.findNewsByIds(ids);
        List<NewsDetail> details = newsDetailDao.findNewsDetailByNewsIds(ids);
        for(int i=0;i<list.size();i++){
            list.get(i).setNewsDetail(details.get(i));
        }
        return list;
    }

    @Override
    public News findNews(Long id) {
        return newsDao.findNewsAndDetail(id, null);
    }

    @Override
    public News findNewsManage(Long id) {
        return newsDao.findNewsAndDetailManage(id);
    }

    @Override
    public News findNewsAndDetailManage(Long id) {
        News news = newsDao.findNewsAndDetailManage(id);
        if(news!=null){
            NewsDetail newsDetail = newsDetailDao.findNewsDetailManage(id);
            news.setNewsDetail(newsDetail);
            return news;
        }
        return null;
    }

    @Override
    public NewsRecommend findNewsRecommend(Long id) {
        return newsDao.findNewsRecommend(id);
    }

    @Override
    public List<NewsRecommend> findListByRecommedColumnId(Long recommendColumnId, Page page) {
        return newsDao.findListByRecommedColumnId(recommendColumnId, page);
    }

    @Override
    public void updateNewsRecommend(NewsRecommend newsRecommend) {
        newsDao.updateNewsRecommend(newsRecommend);
        sendIndex(newsRecommend);
    }

    @Override
    public List<RecommendColumn> findAll() {
        return recommendColumnDao.findAll();
    }

    @Override
    public void createRecommendColumn(RecommendColumn recommendColumn) {
        recommendColumnDao.createRecommendColumn(recommendColumn);
    }

    @Override
    public void updateRecommendColumn(RecommendColumn recommendColumn) {
        recommendColumnDao.updateRecommendColumn(recommendColumn);
    }

    @Override
    public void publishListTemplate2(NewsColumn newsColumn) {
        newsColumnDao.publishListTemplate2(newsColumn);
    }

    @Override
    public List<NewsStock> findNewsStocks(List<Long> newsIds) {
        return newsStockDao.findNewsStocks(newsIds);
    }

    @Override
    public List<NewsStock> findNewsStockList(Long newsId) {
        return newsStockDao.findNewsStockList(newsId);
    }

    @Override
    public void updateRescind(News news) {
        newsDao.updateRescind(news);
    }

    @Override
    public Integer findColumnNameCount(String columnName) {
        return newsColumnDao.findColumnNameCount(columnName);
    }
}
