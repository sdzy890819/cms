package com.cn.cms.service.impl;

import com.cn.cms.dao.NewsColumnDao;
import com.cn.cms.dao.NewsDao;
import com.cn.cms.dao.NewsDetailDao;
import com.cn.cms.dao.RecommendColumnDao;
import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.job.IndexThread;
import com.cn.cms.po.*;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.Page;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
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

    public List<News> queryNewsList(String userId, Integer publish ,Page page) {
        return newsDao.queryNewsList(userId, publish, page);
    }

    public Integer queryNewsCount(String userId, Integer publish) {
        return newsDao.queryNewsCount(userId, publish);
    }

    public News findNewsAndDetail(Long id) {
        News news = newsDao.findNewsAndDetail(id);
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
        sendIndex(news);
    }

    private void sendIndex(Base base){
        IndexThread indexThread = new IndexThread();
        indexThread.setBase(base);
        indexThread.setIndexOperEnum(IndexOperEnum.update);
        indexThread.setEsSearchTypeEnum(ESSearchTypeEnum.news);
        threadTaskExecutor.execute(indexThread);
    }

    private void delIndex(Long id){
        Base base = new Base();
        base.setId(id);
        IndexThread indexThread = new IndexThread();
        indexThread.setBase(base);
        indexThread.setIndexOperEnum(IndexOperEnum.delete);
        indexThread.setEsSearchTypeEnum(ESSearchTypeEnum.news);
        threadTaskExecutor.execute(indexThread);
    }


    public void updateNews(News news) {
        newsDao.updateNews(news);
        newsDetailDao.updateNewsDetail(news.getNewsDetail());
        sendIndex(news);
    }

    public void delNews(String lastModifyUserId, Long id) {
        newsDao.delNews(lastModifyUserId, id);
        newsDetailDao.delNewsDetail(lastModifyUserId, id);
        delIndex(id);
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
        return newsDao.findNewsAndDetail(id);
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
}
