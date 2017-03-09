package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by 华盛信息科技有限公司(HS) on 16/11/16.
 */
public enum MQQueueKeyEnum {

    BUILD("build.cmsweb", 1);

    @Getter
    private int type;

    @Getter
    private String name;


    MQQueueKeyEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static MQQueueKeyEnum get(int type){
        MQQueueKeyEnum[] a = MQQueueKeyEnum.values();
        for(int i=0; i<a.length; i++){
            MQQueueKeyEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return MQQueueKeyEnum.BUILD;
    }
}
