package com.cn.cms.po;

import com.cn.cms.enums.PublishStatusEnum;
import com.cn.cms.enums.TemplateTypeEnum;
import com.cn.cms.enums.TriggerTypeEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 17/5/9.
 */
@Getter
@Setter
public class PublishInfo extends Base{

    /**
     * 触发类型
     */
    private Integer triggerType;

    /**
     * 触发ID
     */
    private Long triggerId;

    /**
     * 模版类型
     */
    private Integer templateType;

    /**
     * 模版ID
     */
    private Long templateId;

    /**
     * 发布情况说明
     */
    private String message;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 错误信息
     */
    private String errorMessage;
}
