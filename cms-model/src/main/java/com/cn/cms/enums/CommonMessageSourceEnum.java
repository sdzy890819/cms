package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by 华盛信息科技有限公司(HS) on 16/11/16.
 */
public enum CommonMessageSourceEnum {

    NEWS("NEWS", 1),
    TOPIC("TOPIC", 2),
    FRAGMENT("FRAGMENT", 3),
    RECOMMEND("RECOMMEND", 4),
    OTHER("OTHER", 5);

    @Getter
    private Integer type;

    @Getter
    private String name;


    CommonMessageSourceEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static CommonMessageSourceEnum get(int type){
        CommonMessageSourceEnum[] a = CommonMessageSourceEnum.values();
        for(int i=0; i<a.length; i++){
            CommonMessageSourceEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
