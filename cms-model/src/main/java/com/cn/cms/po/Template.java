package com.cn.cms.po;

import com.cn.cms.enums.EncodedEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * 模版PO
 * Created by zhangyang on 16/11/17.
 */

public class Template extends TemplateBasics {


    /**
     * 模版说明
     */
    @Getter
    @Setter
    private String templateDesc;




    /**
     * 是否定时生成。1是定时生成。0是触发生成
     */
    @Getter
    @Setter
    private Integer job;


    /**
     * 频道ID
     */
    @Getter
    @Setter
    private Long channelId;

    /**
     * 排序值
     */
    @Getter
    @Setter
    private Integer sortNum;

    /**
     * 是否发布
     */
    @Getter
    @Setter
    private Integer publish = PublishEnum.NO.getType();

}
