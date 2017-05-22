package com.cn.cms.enums;

import lombok.Getter;

/**
 * 模版类型
 * Created by 华盛信息科技有限公司(HS) on 16/11/15.
 */
public enum TemplateTypeEnum {

    TEMPLATE("模版", 1),
    TEMPLATE2("第二模版", 2),
    NONE("无模版", 3);

    @Getter
    private int type;
    @Getter
    private String name;

    TemplateTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static TemplateTypeEnum get(int type){
        TemplateTypeEnum[] a = TemplateTypeEnum.values();
        for(int i=0; i<a.length; i++){
            TemplateTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
