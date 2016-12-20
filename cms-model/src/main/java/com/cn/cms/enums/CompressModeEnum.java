package com.cn.cms.enums;

import lombok.Getter;

/**
 * 等比压缩
 * Created by zhangyang on 16/11/17.
 */
public enum CompressModeEnum {

    WIDTH("WIDTH", 1),
    HEIGHT("HEIGHT", 2);

    @Getter
    private int type;
    @Getter
    private String name;

    CompressModeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static CompressModeEnum get(int type){
        CompressModeEnum[] a = CompressModeEnum.values();
        for(int i=0; i<a.length; i++){
            CompressModeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return CompressModeEnum.WIDTH;
    }
}
