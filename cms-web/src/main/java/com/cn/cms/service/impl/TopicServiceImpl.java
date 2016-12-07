package com.cn.cms.service.impl;

import com.cn.cms.dao.TopicDao;
import com.cn.cms.po.Topic;
import com.cn.cms.service.TemplateService;
import com.cn.cms.service.TopicService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class TopicServiceImpl implements TopicService {

    @Resource
    private TopicDao topicDao;

    public Integer queryTopicCount() {
        return topicDao.queryTopicCount();
    }

    public List<Topic> queryTopicList(Page page) {
        return topicDao.queryTopicList(page);
    }
}
