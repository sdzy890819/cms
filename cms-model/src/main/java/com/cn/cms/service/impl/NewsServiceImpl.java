package com.cn.cms.service.impl;

import com.cn.cms.dao.NewsColumnDao;
import com.cn.cms.dao.NewsDao;
import com.cn.cms.dao.NewsDetailDao;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.po.NewsDetail;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
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

    public List<NewsColumn> queryList(Long channelId) {
        return newsColumnDao.queryList(channelId);
    }

    public void saveNewsColumn(NewsColumn newsColumn) {
        newsColumnDao.saveNewsColumn(newsColumn);
    }

    public void delNewsColumn(String lastModifyUserId, Long id) {
        newsColumnDao.delNewsColumn(lastModifyUserId, id);
    }

    public List<News> queryNewsList(Page page) {
        return newsDao.queryNewsList(page);
    }

    public Integer queryNewsCount() {
        return newsDao.queryNewsCount();
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
    }

    public void updateNews(News news) {
        newsDao.updateNews(news);
        newsDetailDao.updateNewsDetail(news.getNewsDetail());

    }

    public void delNews(String lastModifyUserId, Long id) {
        newsDao.delNews(lastModifyUserId, id);
        newsDetailDao.delNewsDetail(lastModifyUserId, id);
    }

    @Override
    public List<News> findNewsByColumnId(Long columnId, Page page) {
        return newsDao.findNewsByColumnId(columnId, page);
    }

    @Override
    public void publishNews(News news) {
        newsDao.publishNews(news);
    }
}
