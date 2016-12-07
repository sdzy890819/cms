package com.cn.cms.service;

import com.cn.cms.po.Topic;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface TopicService {

    Integer queryTopicCount();

    List<Topic> queryTopicList(Page page);

}
