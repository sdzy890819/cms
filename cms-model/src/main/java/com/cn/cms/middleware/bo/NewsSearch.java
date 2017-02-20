package com.cn.cms.middleware.bo;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 17/1/6.
 */
@Getter
@Setter
public class NewsSearch {

    /**
     * 模糊匹配
     */
    private String condition;

    /**
     * 作者
     */
    private String author;

    /**
     * 来源
     */
    private String source;

    /**
     * 部门分类ID
     */
    private Long categoryId;

    /**
     * 频道ID
     */
    private Long channelId;

    /**
     * 栏目ID
     */
    private Long columnId;

    /**
     * 平台
     */
    private Integer platform;


    /**
     * 开始时间
     */
    private Long startTimeMillis;

    /**
     * 结束时间
     */
    private Long endTimeMillis;

    /**
     * 排序值
     */
    private Integer sort;

    /**
     * ID
     */
    private Integer id;

    /**
     * 发布人
     */
    private String buildUserId;

    /**
     * 修改人
     */
    private String lastModifyUserId;
}
