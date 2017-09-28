package com.cn.cms.dao;

import com.cn.cms.po.News;
import com.cn.cms.po.NewsRecommend;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface NewsDao {

    List<News> queryNewsList(@Param(value = "userId") String userId,
                             @Param(value = "publish") Integer publish,
                             @Param(value = "delTag") Integer delTag,
                             @Param(value = "page") Page page);

    List<News> queryNewsLimit(@Param(value = "page") Page page);

    Integer queryNewsCount(@Param(value = "userId") String userId, @Param(value = "publish") Integer publish, @Param(value = "delTag") Integer delTag);

    News findNewsAndDetail(@Param(value = "id") Long id, @Param(value = "delTag") Integer delTag);

    News findNewsAndDetailManage(@Param(value = "id") Long id);

    List<News> findNewsAndDetailManageList(@Param(value = "list") List<Long> id);

    void delNews(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void recoverNews(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void saveNews(@Param(value = "p1") News news);

    void updateNews(@Param(value = "p1") News news);

    List<News> findNewsByColumnId(@Param(value = "columnId") Long columnId, @Param(value = "page") Page page);

    Integer findNewsByColumnIdCount(@Param(value = "columnId") Long columnId);

    void publishNews(@Param(value = "p1") News news);

    List<News> findNewsByAutoPublish(@Param(value = "publish") Integer publish,
                                     @Param(value = "autoPublish") Integer autoPublish,
                                     @Param(value = "timer") Date timer);
    List<News> findNewsByIds(@Param(value = "list") List<Long> ids);

    NewsRecommend findNewsRecommend(@Param(value = "id") Long id);

    List<NewsRecommend> findNewsRecommendNear(@Param(value = "start") int start, @Param(value = "size") int size);

    NewsRecommend findNewsRecommendManage(@Param(value = "id") Long id);

    List<NewsRecommend> findListByRecommedColumnId(@Param(value = "recommendColumnId") Long recommendColumnId, @Param(value = "page") Page page);

    List<News> findNewsListByRecommedColumnId(@Param(value = "recommendColumnId") Long recommendColumnId, @Param(value = "page") Page page);

    Integer findListByRecommedColumnIdCount(@Param(value = "recommendColumnId") Long recommendColumnId);

    void updateNewsRecommend(@Param(value = "p1") NewsRecommend newsRecommend);

    void updateRescind(@Param(value = "p1") News news);

    Integer queryNewsRecommendCount(@Param(value = "recommendColumnId") Long recommendColumnId);

    void deleteRecommend(@Param(value = "id") Long id);

    List<Long> findNewsIdWithColumnIds(@Param(value = "columnId") Long columnId, @Param(value = "pageSize") int size, @Param(value = "id") Long id);

}
