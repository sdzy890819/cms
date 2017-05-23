package com.cn.cms.dao;

import com.cn.cms.po.Topic;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface TopicDao {

    Integer queryTopicCount();

    List<Topic> queryTopicList(@Param(value = "page") Page page);

    Topic getTopic(@Param(value = "id") Long id);

    Topic getTopicManage(@Param(value = "id") Long id);

    void delTopic(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void saveTopic(@Param(value = "p1") Topic topic);

    void updateTopic(@Param(value = "p1") Topic topic);

    List<Topic> findTopicByClassify(@Param(value = "topicClassifyId") Long topicClassifyId, @Param(value = "page") Page page);

    Integer findTopicByClassifyCount(@Param(value = "topicClassifyId") Long topicClassifyId);

    List<Topic> findTopicByColumn(@Param(value = "topicColumnId") Long topicColumnId, @Param(value = "page") Page page);

    Integer findTopicByColumnCount(@Param(value = "topicColumnId") Long topicColumnId);

    void publishTopic(@Param(value = "p1") Topic topic);

    Integer queryFilenameAndPathCount(@Param(value = "p1") Topic topic);
}
