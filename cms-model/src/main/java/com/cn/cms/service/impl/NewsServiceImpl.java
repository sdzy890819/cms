package com.cn.cms.service.impl;

import com.cn.cms.dao.*;
import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.PushTagEnum;
import com.cn.cms.po.*;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.TextUtils;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
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


    @Override
    public Integer queryListCount(Long channelId, int delTag) {
        return newsColumnDao.queryListCount(channelId, delTag);
    }

    @Override
    public List<NewsColumn> queryListForPage(Long channelId, int delTag, Page page) {
        return newsColumnDao.queryListForPage(channelId, delTag, page);
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

    @Override
    public NewsColumn doGetNewsColumn(Long id) {
        return newsColumnDao.doGetNewsColumn(id);
    }

    public void delNewsColumn(String lastModifyUserId, Long id) {
        newsColumnDao.delNewsColumn(lastModifyUserId, id);
    }

    @Override
    public void recoverNewsColumn(String lastModifyUserId, Long id) {
        newsColumnDao.recoverNewsColumn(lastModifyUserId, id);
    }

    public List<News> queryNewsList(String userId, Integer publish, Integer delTag , Page page) {
        return newsDao.queryNewsList(userId, publish, delTag, page);
    }

    @Override
    public List<News> queryNewsLimit(Page page) {
        return newsDao.queryNewsLimit(page);
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
        //sendIndex(news);
    }






    public void updateNews(News news) {
        if(news.getColumnIds()!=null && news.getColumnIds().size() >0){
            news.setPushTag(PushTagEnum.YES.getType());
        }else{
            news.setPushTag(PushTagEnum.NO.getType());
        }
        newsDao.updateNews(news);
        List<NewsPushColumn> newsPushColumns = TextUtils.packagingNewsPushColumns(news);
        newsDetailDao.updateNewsDetail(news.getNewsDetail());
        newsStockDao.delStocks(news.getId());
        if(StringUtils.isNotEmpty(news.getNewsStocks())) {
            newsStockDao.saveStocks(news.getNewsStocks());
        }
        newsPushColumnDao.delNewsPushColumns(news.getId());
        if(StringUtils.isNotEmpty(newsPushColumns)){
            newsPushColumnDao.saveNewsPushColumns(newsPushColumns);
        }
        //sendIndex(news);
    }

    public void delNews(String lastModifyUserId, Long id) {
        newsDao.delNews(lastModifyUserId, id);
        newsDetailDao.delNewsDetail(lastModifyUserId, id);
        //newsStockDao.delStocks(id);
        //delIndex(id);
    }

    public void recoverNews(List<NewsStock> list, String lastModifyUserId, Long id){
        newsDao.recoverNews(lastModifyUserId, id);
        newsDetailDao.recoverNewsDetail(lastModifyUserId, id);
//        if(StringUtils.isNotEmpty(list)) {
//            newsStockDao.saveStocks(list);
//        }
//        Base base = new Base();
//        base.setId(id);
//        sendIndex(base);
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
        //sendIndex(news);
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
    public List<News> findNewsManageList(List<Long> id) {
        return newsDao.findNewsAndDetailManageList(id);
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
    public List<NewsRecommend> findNewsRecommendNear(int start, int size) {
        return newsDao.findNewsRecommendNear(start, size);
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
    public List<News> findNewsListByRecommedColumnId(Long recommendColumnId, Page page) {
        return newsDao.findNewsListByRecommedColumnId(recommendColumnId, page);
    }

    @Override
    public Integer findListByRecommedColumnIdCount(Long recommendColumnId) {
        return newsDao.findListByRecommedColumnIdCount(recommendColumnId);
    }

    @Override
    public void updateNewsRecommend(NewsRecommend newsRecommend) {
        newsDao.updateNewsRecommend(newsRecommend);
        //sendIndex(newsRecommend);
    }

    @Override
    public List<RecommendColumn> findAll(String st) {
        return recommendColumnDao.findAll(st);
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
        //sendIndex(news);
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
//        Base base =new Base();
//        base.setId(id);
//        sendIndex(base);
    }

    @Override
    public void deleteRecommendColumn(Long id, String lastModifyUserId) {
        recommendColumnDao.deleteRecommendColumn(id, lastModifyUserId);
    }

    @Override
    public List<Long> findNewsIdWithColumnIds(Long columnId, int size, Long id) {
        return newsDao.findNewsIdWithColumnIds(columnId, size, id);
    }
}
