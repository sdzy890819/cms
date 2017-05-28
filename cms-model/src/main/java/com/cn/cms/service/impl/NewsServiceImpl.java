package com.cn.cms.service.impl;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.dao.*;
import com.cn.cms.enums.*;
import com.cn.cms.job.IndexThread;
import com.cn.cms.po.*;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.HtmlUtils;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.TextUtils;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.*;

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

    @Resource
    private NewsPushColumnDao newsPushColumnDao;

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
        return newsDao.queryNewsCount(userId, publish, delTag);
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

    @Override
    public List<NewsPushColumn> getNewsPushColumns(Long newsId) {
        return newsPushColumnDao.findListByNewsId(newsId);
    }

    public void saveNews(News news) {
        if(news.getColumnIds()!=null && news.getColumnIds().size() >0){
            news.setPushTag(PushTagEnum.YES.getType());
        }else{
            news.setPushTag(PushTagEnum.NO.getType());
        }
        newsDao.saveNews(news);
        List<NewsPushColumn> newsPushColumns = TextUtils.packagingNewsPushColumns(news);
        news.getNewsDetail().setNewsId(news.getId());
        newsDetailDao.saveNewsDetail(news.getNewsDetail());
        news.setNewsStocks(TextUtils.getNewsStock(news.getNewsDetail().getContent(), news.getLastModifyUserId(), news.getId(), news));

        if(StringUtils.isNotEmpty(news.getNewsStocks())) {
            newsStockDao.saveStocks(news.getNewsStocks());
        }
        if(StringUtils.isNotEmpty(newsPushColumns)){
            newsPushColumnDao.saveNewsPushColumns(newsPushColumns);
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
        List<NewsPushColumn> newsPushColumns = TextUtils.packagingNewsPushColumns(news);
        if(StringUtils.isNotEmpty(newsPushColumns)){
            news.setPushTag(PushTagEnum.YES.getType());
        }else{
            news.setPushTag(PushTagEnum.NO.getType());
        }
        newsDetailDao.updateNewsDetail(news.getNewsDetail());
        newsStockDao.delStocks(news.getId());
        if(StringUtils.isNotEmpty(news.getNewsStocks())) {
            newsStockDao.saveStocks(news.getNewsStocks());
        }
        newsPushColumnDao.delNewsPushColumns(news.getId());
        if(StringUtils.isNotEmpty(newsPushColumns)){
            newsPushColumnDao.saveNewsPushColumns(newsPushColumns);
        }
        sendIndex(news);
    }

    public void delNews(String lastModifyUserId, Long id) {
        newsDao.delNews(lastModifyUserId, id);
        newsDetailDao.delNewsDetail(lastModifyUserId, id);
        //newsStockDao.delStocks(id);
        delIndex(id);
    }

    public void recoverNews(List<NewsStock> list, String lastModifyUserId, Long id){
        newsDao.recoverNews(lastModifyUserId, id);
        newsDetailDao.recoverNewsDetail(lastModifyUserId, id);
//        if(StringUtils.isNotEmpty(list)) {
//            newsStockDao.saveStocks(list);
//        }
        Base base = new Base();
        base.setId(id);
        sendIndex(base);
    }

    @Override
    public List<News> findNewsByColumnId(Long columnId, Page page) {
        return newsDao.findNewsByColumnId(columnId, page);
    }

    @Override
    public Integer findNewsByColumnIdCount(Long columnId) {
        return newsDao.findNewsByColumnIdCount(columnId);
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
    public News doFindNewsAndDetailManage(Long id) {
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
    public NewsRecommend findNewsRecommendManage(Long id) {
        return newsDao.findNewsRecommendManage(id);
    }

    @Override
    public List<NewsRecommend> findListByRecommedColumnId(Long recommendColumnId, Page page) {
        return newsDao.findListByRecommedColumnId(recommendColumnId, page);
    }

    @Override
    public Integer findListByRecommedColumnIdCount(Long recommendColumnId) {
        return newsDao.findListByRecommedColumnIdCount(recommendColumnId);
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
    public List<RecommendColumn> findRecommendColumnByIds(List<Long> ids) {
        return recommendColumnDao.findRecommendColumnByIds(ids);
    }

    @Override
    public void createRecommendColumn(RecommendColumn recommendColumn) {
        recommendColumnDao.createRecommendColumn(recommendColumn);
    }

    @Override
    public List<NewsPushColumn> findNewsPushColumnsByNewsId(Long newsId) {
        return newsPushColumnDao.findListByNewsId(newsId);
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
    public List<NewsStock> doFindNewsStockList(Long newsId) {
        return newsStockDao.findNewsStockList(newsId);
    }

    @Override
    public void updateRescind(News news) {
        newsDao.updateRescind(news);
        sendIndex(news);
    }

    @Override
    public Integer findColumnNameCount(String columnName) {
        return newsColumnDao.findColumnNameCount(columnName);
    }

    @Override
    public Integer queryNewsRecommendCount(Long recommendColumnId) {
        return newsDao.queryNewsRecommendCount(recommendColumnId);
    }

    @Override
    public void deleteRecommend(Long id) {
        newsDao.deleteRecommend(id);
    }

    @Override
    public void deleteRecommendColumn(Long id, String lastModifyUserId) {
        recommendColumnDao.deleteRecommendColumn(id, lastModifyUserId);
    }
}
