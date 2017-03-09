package com.cn.cms.dao;

import com.cn.cms.po.TopicClassify;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface TopicClassifyDao {

    List<TopicClassify> findAll();

    void saveTopicClassify(@Param(value = "p1") TopicClassify topicClassify);

    void delTopicClassify(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void updateTopicClassify(@Param(value = "p1") TopicClassify topicClassify);

    TopicClassify getTopicClassify(@Param(value = "id") Long id);

}
