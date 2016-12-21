package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by zhangyang on 16/11/17.
 */
public enum TemplateClassifyEnum {

    index("首页", 1),
    list("列表页", 2),
    detail("详情页", 3),
    fragment("碎片页", 4);

    @Getter
    private int type;
    @Getter
    private String name;

    TemplateClassifyEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static TemplateClassifyEnum get(int type){
        TemplateClassifyEnum[] a = TemplateClassifyEnum.values();
        for(int i=0; i<a.length; i++){
            TemplateClassifyEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return TemplateClassifyEnum.fragment;
    }
    
}
