package com.cn.cms.dao;

import com.cn.cms.po.Topic;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface TopicDao {

    Integer queryTopicCount();

    List<Topic> queryTopicList(@Param(value = "page") Page page);

}
