package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by ADMIN on 16/11/16.
 */
public enum PlatformEnum {

    APP("APP", 2),
    CMS("CMS", 1);

    @Getter
    private int type;
    @Getter
    private String name;

    PlatformEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static PlatformEnum get(int type){
        PlatformEnum[] a = PlatformEnum.values();
        for(int i=0; i<a.length; i++){
            PlatformEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return PlatformEnum.CMS;
    }
}
