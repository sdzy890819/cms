package com.cn.cms.service;

import com.cn.cms.po.Topic;
import com.cn.cms.po.TopicClassify;
import com.cn.cms.po.TopicColumn;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/18.
 */
public interface TopicService {

    Integer queryTopicCount();

    List<Topic> queryTopicList(Page page);

    Topic getTopic(Long id);

    Topic getTopicManage(Long id);

    void delTopic(String lastModifyUserId, Long id);

    void saveTopic(Topic topic);

    void updateTopic(Topic topic);

    List<TopicColumn> findTopicColumnAll();

    void saveTopicColumn(TopicColumn topicColumn);

    void delTopicColumn(String lastModifyUserId, Long id);

    void updateTopicColumn(TopicColumn topicColumn);

    List<TopicClassify> findTopicClassifyAll();

    void saveTopicClassify(TopicClassify topicClassify);

    void delTopicClassify(String lastModifyUserId, Long id);

    void updateTopicClassify(TopicClassify topicClassify);

    List<Topic> findTopicByClassify(Long topicClassifyId, Page page);

    List<Topic> findTopicByColumn(Long topicColumnId, Page page);

    void publishTopic(Topic topic);

    TopicClassify getTopicClassify(Long id);

    TopicColumn getTopicColumn(Long id);

    Integer queryFilenameAndPathCount(Topic topic);

}
