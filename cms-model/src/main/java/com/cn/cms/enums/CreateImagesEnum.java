package com.cn.cms.enums;

import lombok.Getter;

/**
 * 删除枚举
 * Created by 华盛信息科技有限公司(HS) on 16/11/15.
 */
public enum CreateImagesEnum {

    DEL("删除", 0),
    NORMAL("正常", 1);

    @Getter
    private int type;

    @Getter
    private String name;

    CreateImagesEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static CreateImagesEnum get(int type){
        CreateImagesEnum[] a = CreateImagesEnum.values();
        for(int i=0; i<a.length; i++){
            CreateImagesEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return CreateImagesEnum.NORMAL;
    }
}
