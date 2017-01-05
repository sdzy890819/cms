package com.cn.cms.dao;

import com.cn.cms.po.NewsColumn;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface NewsColumnDao {

    List<NewsColumn> queryList(@Param(value = "channelId") Long channelId);

    void saveNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    void updateNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    NewsColumn getNewsColumn(@Param(value = "p1") Long id);

    void publishListNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    void publishDetailNewsColumn(@Param(value = "p1") NewsColumn newsColumn);

    void delNewsColumn(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);
}
