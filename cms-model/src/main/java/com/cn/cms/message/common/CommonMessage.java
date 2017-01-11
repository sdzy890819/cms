package com.cn.cms.message.common;

import com.cn.cms.message.bean.Body;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 16/11/10.
 */
public class CommonMessage {

    @Getter
    @Setter
    private Object message;

    /**
     * CommonMessageSourceEnum
     */
    @Getter
    @Setter
    private Integer source;

    public CommonMessage(Object message, Integer source){
        this.source = source;
        this.message = message;
    }

    public CommonMessage(){}

}
