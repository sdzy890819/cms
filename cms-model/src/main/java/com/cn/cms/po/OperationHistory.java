package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 操作信息表
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class OperationHistory extends Base {

    /**
     * 操作完整的URL
     */
    private String url;

    /**
     * 操作描述
     */
    private String description;

    /**
     * 纪录body信息
     */
    private String body;

    /**
     * 操作人
     */
    private String userId;

    /**
     * 当前操作时间
     */
    private Date currTime;
}
