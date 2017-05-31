package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by ADMIN on 16/11/29.
 */
public enum AutoPublishEnum {

    YES("YES", 1),
    NO("NO", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    AutoPublishEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static AutoPublishEnum get(int type){
        AutoPublishEnum[] a = AutoPublishEnum.values();
        for(int i=0; i<a.length; i++){
            AutoPublishEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return AutoPublishEnum.NO;
    }
}
