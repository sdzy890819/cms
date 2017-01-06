package com.cn.cms.service;

import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.utils.Page;

import java.util.Date;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface NewsService {

    List<NewsColumn> queryList(Long channelId);

    List<NewsColumn> getListForChannelIds(List<Long> ids);

    void saveNewsColumn(NewsColumn newsColumn);

    void updateNewsColumn(NewsColumn newsColumn);

    NewsColumn getNewsColumn(Long id);

    void delNewsColumn(String lastModifyUserId, Long id);

    List<News> queryNewsList(Page page);

    Integer queryNewsCount();

    News findNewsAndDetail(Long id);

    void saveNews(News news);

    void updateNews(News news);

    void delNews(String lastModifyUserId, Long id);

    List<News> findNewsByColumnId(Long columnId, Page page);

    void publishNews(News news);

    List<News> findNewsByAutoPublish(PublishEnum publishEnum, AutoPublishEnum autoPublishEnum, Date timer);

    List<News> findNewsAndDetailList(List<Long> ids);

    News findNews(Long id);

}
