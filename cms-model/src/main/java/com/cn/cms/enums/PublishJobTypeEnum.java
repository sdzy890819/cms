package com.cn.cms.enums;

import lombok.Getter;

/**
 * 文件名生成方式枚举
 * Created by zhangyang on 16/11/15.
 */
public enum PublishJobTypeEnum {

    template("template", 1),
    topic("topic", 2);

    @Getter
    private int type;
    @Getter
    private String name;

    PublishJobTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static PublishJobTypeEnum get(int type){
        PublishJobTypeEnum[] a = PublishJobTypeEnum.values();
        for(int i=0; i<a.length; i++){
            PublishJobTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
