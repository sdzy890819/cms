package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by ADMIN on 16/11/29.
 */
public enum ShowFlagEnum {

    YES("YES", 1),
    NO("NO", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    ShowFlagEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static ShowFlagEnum get(int type){
        ShowFlagEnum[] a = ShowFlagEnum.values();
        for(int i=0; i<a.length; i++){
            ShowFlagEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return ShowFlagEnum.NO;
    }
}
