package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by ADMIN on 16/11/29.
 */
public enum RecommendEnum {

    YES("YES", 1),
    NO("NO", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    RecommendEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static RecommendEnum get(int type){
        RecommendEnum[] a = RecommendEnum.values();
        for(int i=0; i<a.length; i++){
            RecommendEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return RecommendEnum.NO;
    }
}
