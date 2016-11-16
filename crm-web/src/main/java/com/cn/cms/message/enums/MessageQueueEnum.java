package com.cn.cms.message.enums;

import lombok.Getter;

/**
 * Created by zhangyang on 16/11/15.
 */
public enum MessageQueueEnum {

    BUILD_CMSWEB("build.cmsweb");

    @Getter
    private String name;

    MessageQueueEnum(String name){
        this.name=name;
    }

}
