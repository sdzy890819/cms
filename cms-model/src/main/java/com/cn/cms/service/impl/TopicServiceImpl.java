package com.cn.cms.service.impl;

import com.cn.cms.dao.TopicClassifyDao;
import com.cn.cms.dao.TopicColumnDao;
import com.cn.cms.dao.TopicDao;
import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.job.IndexThread;
import com.cn.cms.po.Base;
import com.cn.cms.po.Topic;
import com.cn.cms.po.TopicClassify;
import com.cn.cms.po.TopicColumn;
import com.cn.cms.service.TopicService;
import com.cn.cms.utils.Page;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
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

    @Override
    public Topic getTopicManage(Long id) {
        return topicDao.getTopicManage(id);
    }

    @Override
    public Topic doGetTopicManage(Long id) {
        return topicDao.getTopicManage(id);
    }

    public void delTopic(String lastModifyUserId, Long id) {
        topicDao.delTopic(lastModifyUserId, id);
        //delIndex(id);
    }

    public void saveTopic(Topic topic) {
        topicDao.saveTopic(topic);
        //sendIndex(topic);
    }

    public void updateTopic(Topic topic) {
        topicDao.updateTopic(topic);
        //sendIndex(topic);
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
    public Integer findTopicByClassifyCount(Long topicClassifyId) {
        return topicDao.findTopicByClassifyCount(topicClassifyId);
    }

    @Override
    public List<Topic> findTopicByColumn(Long topicColumnId, Page page) {
        return topicDao.findTopicByColumn(topicColumnId, page);
    }

    @Override
    public Integer findTopicByColumnCount(Long topicColumnId) {
        return topicDao.findTopicByColumnCount(topicColumnId);
    }

    @Override
    public void publishTopic(Topic topic) {
        topicDao.publishTopic(topic);
        //sendIndex(topic);
    }



    @Override
    public TopicClassify getTopicClassify(Long id) {
        return topicClassifyDao.getTopicClassify(id);
    }

    @Override
    public TopicColumn getTopicColumn(Long id) {
        return topicColumnDao.getTopicColumn(id);
    }

    @Override
    public Integer queryFilenameAndPathCount(Topic topic) {
        return topicDao.queryFilenameAndPathCount(topic);
    }

    @Override
    public List<Topic> queryFilenameAndPath(Topic topic) {
        return topicDao.queryFilenameAndPath(topic);
    }
}
