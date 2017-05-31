package com.cn.cms.dao;

import com.cn.cms.po.TopicColumn;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface TopicColumnDao {

    List<TopicColumn> findAll();

    void saveTopicColumn(@Param(value = "p1") TopicColumn topicColumn);

    void delTopicColumn(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void updateTopicColumn(@Param(value = "p1") TopicColumn topicColumn);

    TopicColumn getTopicColumn(@Param(value = "id") Long id);
}
