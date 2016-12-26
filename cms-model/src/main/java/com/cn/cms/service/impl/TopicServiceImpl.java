package com.cn.cms.service.impl;

import com.cn.cms.dao.TopicClassifyDao;
import com.cn.cms.dao.TopicColumnDao;
import com.cn.cms.dao.TopicDao;
import com.cn.cms.po.Topic;
import com.cn.cms.po.TopicClassify;
import com.cn.cms.po.TopicColumn;
import com.cn.cms.service.TopicService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class TopicServiceImpl implements TopicService {

    @Resource
    private TopicDao topicDao;

    @Resource
    private TopicClassifyDao topicClassifyDao;

    @Resource
    private TopicColumnDao topicColumnDao;


    public Integer queryTopicCount() {
        return topicDao.queryTopicCount();
    }

    public List<Topic> queryTopicList(Page page) {
        return topicDao.queryTopicList(page);
    }

    public Topic getTopic(Long id) {
        return topicDao.getTopic(id);
    }

    public void delTopic(String lastModifyUserId, Long id) {
        topicDao.delTopic(lastModifyUserId, id);
    }

    public void saveTopic(Topic topic) {
        topicDao.saveTopic(topic);
    }

    public void updateTopic(Topic topic) {
        topicDao.updateTopic(topic);
    }

    public List<TopicColumn> findTopicColumnAll() {
        return topicColumnDao.findAll();
    }

    public void saveTopicColumn(TopicColumn topicColumn) {
        topicColumnDao.saveTopicColumn(topicColumn);
    }

    public void delTopicColumn(String lastModifyUserId, Long id) {
        topicColumnDao.delTopicColumn(lastModifyUserId, id);
    }

    public void updateTopicColumn(TopicColumn topicColumn) {
        topicColumnDao.updateTopicColumn(topicColumn);
    }

    public List<TopicClassify> findTopicClassifyAll() {
        return topicClassifyDao.findAll();
    }

    public void saveTopicClassify(TopicClassify topicClassify) {
        topicClassifyDao.saveTopicClassify(topicClassify);
    }

    public void delTopicClassify(String lastModifyUserId, Long id) {
        topicClassifyDao.delTopicClassify(lastModifyUserId, id);
    }

    public void updateTopicClassify(TopicClassify topicClassify) {
        topicClassifyDao.updateTopicClassify(topicClassify);
    }

    @Override
    public List<Topic> findTopicByClassify(Long topicClassifyId, Page page) {
        return topicDao.findTopicByClassify(topicClassifyId, page);
    }

    @Override
    public List<Topic> findTopicByColumn(Long topicColumnId, Page page) {
        return topicDao.findTopicByColumn(topicColumnId, page);
    }

    @Override
    public void publishTopic(Topic topic) {
        topicDao.publishTopic(topic);
    }
}
