package com.cn.cms.middleware.bo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Created by ADMIN on 17/1/6.
 */
@Getter
@Setter
public class TopicSearch {

    private String condition;

    /**
     * 专题分类ID
     */
    private Long topicClassifyId;

    /**
     * 部门类别ID
     */
    private Long categoryId;

    /**
     * 频道ID
     */
    private Long channelId;

    /**
     * 发布时间
     * 填写的。
     */
    private Long releaseTimeMillis;

    /**
     * 专题栏目ID(做系列专题使用)
     */
    private Long topicColumnId;

    /**
     * 开始时间
     */
    private Long startTimeMillis;

    /**
     * 结束时间
     */
    private Long endTimeMillis;
}
