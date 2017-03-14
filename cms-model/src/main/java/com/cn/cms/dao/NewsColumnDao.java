package com.cn.cms.dao;

import com.cn.cms.po.NewsColumn;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface NewsColumnDao {

    Integer queryListCount();

    List<NewsColumn> queryListForPage(@Param(value = "page") Page page);

    List<NewsColumn> queryList(@Param(value = "channelId") Long channelId);

    List<NewsColumn> getListForChannelIds(@Param(value = "list") List<Long> ids);

    void saveNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    void updateNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    NewsColumn getNewsColumn(@Param(value = "id") Long id);

    void publishListNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    void publishDetailNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    void publishListTemplate2(@Param(value = "p1") NewsColumn newsColumn);

    void delNewsColumn(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    Integer findColumnNameCount(@Param(value = "columnName") String columnName);
}
