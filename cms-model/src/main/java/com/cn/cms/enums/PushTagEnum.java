package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by ADMIN on 16/11/29.
 */
public enum PushTagEnum {

    YES("有推送", 1),
    NO("无推送", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    PushTagEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static PushTagEnum get(int type){
        PushTagEnum[] a = PushTagEnum.values();
        for(int i=0; i<a.length; i++){
            PushTagEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return PushTagEnum.NO;
    }
}
