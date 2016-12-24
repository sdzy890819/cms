package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by zhangyang on 16/11/16.
 */
public enum CommonMessageSourceEnum {

    NEWS("NEWS", 1),
    TOPIC("TOPIC", 2),
    FRAGMENT("FRAGMENT", 3),
    OTHER("OTHER", 4);

    @Getter
    private int type;

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
        return CommonMessageSourceEnum.NEWS;
    }
}
