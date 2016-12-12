package com.cn.cms.service;

import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface NewsService {

    List<NewsColumn> queryList(Long channelId);

    void saveNewsColumn(NewsColumn newsColumn);

    void delNewsColumn(String lastModifyUserId, Long id);

    List<News> queryNewsList(Page page);

    Integer queryNewsCount();

    News findNewsAndDetail(Long id);

    void saveNews(News news);

    void updateNews(News news);

    void delNews(String lastModifyUserId, Long id);

}
