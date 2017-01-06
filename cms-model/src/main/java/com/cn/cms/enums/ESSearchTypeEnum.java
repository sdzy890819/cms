package com.cn.cms.enums;

import lombok.Getter;

/**
 * 压缩枚举
 * Created by zhangyang on 16/11/17.
 */
public enum ESSearchTypeEnum {

    news("news", "cmsindex", 1),
    topic("topic", "cmsindex", 2),
    images("images", "cmsindex", 3),
    video("video", "cmsindex", 4);

    @Getter
    private int type;
    @Getter
    private String name;
    @Getter
    private String index;

    ESSearchTypeEnum(String name, String index,int type){
        this.type = type;
        this.name = name;
        this.index = index;
    }

    public static ESSearchTypeEnum get(int type){
        ESSearchTypeEnum[] a = ESSearchTypeEnum.values();
        for(int i=0; i<a.length; i++){
            ESSearchTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
