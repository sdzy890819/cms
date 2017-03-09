package com.cn.cms.enums;

import lombok.Getter;

/**
 * 压缩枚举
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public enum CompressEnum {

    compress("压缩", 1),
    nocompress("不压缩", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    CompressEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static CompressEnum get(int type){
        CompressEnum[] a = CompressEnum.values();
        for(int i=0; i<a.length; i++){
            CompressEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return CompressEnum.nocompress;
    }
}
