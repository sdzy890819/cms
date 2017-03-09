package com.cn.cms.enums;

import lombok.Getter;

/**
 * 类型枚举
 * Created by 华盛信息科技有限公司(HS) on 16/11/16.
 */
public enum TAGListTypeEnum {

    NEWCOLUMN("NEWCOLUMN", 1),
    TOPICCOLUMN("TOPICCOLUMN", 2),
    TOPICCLASSIFY("TOPICCLASSIFY", 3),
    RECOMMENDCOLUMN("RECOMMENDCOLUMN", 4),
    SQL("SQL", 5);

    @Getter
    private int type;

    @Getter
    private String name;


    TAGListTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static TAGListTypeEnum get(int type){
        TAGListTypeEnum[] a = TAGListTypeEnum.values();
        for(int i=0; i<a.length; i++){
            TAGListTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return TAGListTypeEnum.SQL;
    }
}
