package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public enum Template2ClassifyEnum {

    list("列表页", 2),
    detail("详情页", 3);

    @Getter
    private int type;
    @Getter
    private String name;

    Template2ClassifyEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static Template2ClassifyEnum get(int type){
        Template2ClassifyEnum[] a = Template2ClassifyEnum.values();
        for(int i=0; i<a.length; i++){
            Template2ClassifyEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
    
}
