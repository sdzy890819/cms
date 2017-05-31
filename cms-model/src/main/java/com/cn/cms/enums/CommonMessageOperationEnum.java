package com.cn.cms.enums;

import lombok.Getter;

/**
 * 定时生成或者触发生成枚举
 * Created by ADMIN on 16/11/16.
 */
public enum CommonMessageOperationEnum {

    PUBLISH("发布", 1),
    RESCIND("撤销发布", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    CommonMessageOperationEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static CommonMessageOperationEnum get(int type){
        CommonMessageOperationEnum[] a = CommonMessageOperationEnum.values();
        for(int i=0; i<a.length; i++){
            CommonMessageOperationEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
