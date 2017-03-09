package com.cn.cms.message.common;

import com.cn.cms.enums.CommonMessageOperationEnum;
import com.cn.cms.message.bean.Body;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/10.
 */
public class CommonMessage {

    @Getter
    @Setter
    private Object message;

    /**
     * JobEnum
     */
    @Getter
    @Setter
    private Integer source;

    @Getter
    @Setter
    private Integer operation;

    public CommonMessage(Object message, Integer source){
        this.source = source;
        this.message = message;
        this.operation = CommonMessageOperationEnum.PUBLISH.getType();
    }

    public CommonMessage(){}


    public CommonMessage(Object message, Integer source, Integer operation){
        this.source = source;
        this.message = message;
        this.operation = operation;
    }

}
