package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by zhangyang on 16/11/29.
 */
public enum PublishEnum {

    YES("YES", 1),
    NO("NO", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    PublishEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static PublishEnum get(int type){
        PublishEnum[] a = PublishEnum.values();
        for(int i=0; i<a.length; i++){
            PublishEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return PublishEnum.NO;
    }
}
