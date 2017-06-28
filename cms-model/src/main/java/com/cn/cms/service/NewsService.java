package com.cn.cms.service;

import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.po.*;
import com.cn.cms.utils.Page;

import java.util.Date;
import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
 */
public interface NewsService {

    Integer queryListCount(Long channelId, int delTag);

    List<NewsColumn> queryListForPage(Long channelId, int delTag, Page page);

    List<NewsColumn> queryList(Long channelId);

    List<NewsColumn> getListForChannelIds(List<Long> ids);

    void saveNewsColumn(NewsColumn newsColumn);

    void updateNewsColumn(NewsColumn newsColumn);

    NewsColumn getNewsColumn(Long id);

    NewsColumn doGetNewsColumn(Long id);

    void delNewsColumn(String lastModifyUserId, Long id);

    void recoverNewsColumn(String lastModifyUserId, Long id);

    List<News> queryNewsList(String userId, Integer publish, Integer delTag, Page page);

    Integer queryNewsCount(String userId, Integer publish, Integer delTag);

    News findNewsAndDetail(Long id);

    List<NewsPushColumn> getNewsPushColumns(Long newsId);

    void saveNews(News news);

    void updateNews(News news);

    void delNews(String lastModifyUserId, Long id);

    void recoverNews(List<NewsStock> list, String lastModifyUserId, Long id);

    List<News> findNewsByColumnId(Long columnId, Page page);

    Integer findNewsByColumnIdCount(Long columnId);

    void publishNews(News news);

    List<News> findNewsByAutoPublish(PublishEnum publishEnum, AutoPublishEnum autoPublishEnum, Date timer);

    List<News> findNewsAndDetailList(List<Long> ids);

    News findNews(Long id);

    News findNewsManage(Long id);

    List<News> findNewsManageList(List<Long> id);

    News findNewsAndDetailManage(Long id);

    News doFindNewsAndDetailManage(Long id);

    NewsRecommend findNewsRecommend(Long id);

    NewsRecommend findNewsRecommendManage(Long id);

    List<NewsRecommend> findListByRecommedColumnId(Long recommendColumnId, Page page);

    Integer findListByRecommedColumnIdCount(Long recommendColumnId);

    void updateNewsRecommend(NewsRecommend newsRecommend);

    List<RecommendColumn> findAll();

    List<RecommendColumn> findRecommendColumnByIds(List<Long> ids);

    void createRecommendColumn(RecommendColumn recommendColumn);

    List<NewsPushColumn> findNewsPushColumnsByNewsId(Long newsId);

    void updateRecommendColumn(RecommendColumn recommendColumn);

    void publishListTemplate2(NewsColumn newsColumn);

    List<NewsStock> findNewsStocks(List<Long> newsIds);

    List<NewsStock> findNewsStockList(Long newsId);

    List<NewsStock> doFindNewsStockList(Long newsId);

    void updateRescind(News news);

    Integer findColumnNameCount(String columnName);

    Integer queryNewsRecommendCount(Long recommendColumnId);

    void deleteRecommend(Long id);

    void deleteRecommendColumn(Long id, String lastModifyUserId);

    List<Long> findNewsIdWithColumnIds(Long columnId, int size, Long id);

}
