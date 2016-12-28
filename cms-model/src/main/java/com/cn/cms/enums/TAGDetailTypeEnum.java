package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by zhangyang on 16/11/16.
 */
public enum TAGDetailTypeEnum {

    NEWSID("NEWSID", 1),
    NEWSCOLUMNID("NEWSCOLUMNID", 2),
    TOPICID("TOPICID", 3),
    FRAGMENTID("FRAGMENTID", 4),
    SQL("SQL", 5);

    @Getter
    private int type;

    @Getter
    private String name;


    TAGDetailTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static TAGDetailTypeEnum get(int type){
        TAGDetailTypeEnum[] a = TAGDetailTypeEnum.values();
        for(int i=0; i<a.length; i++){
            TAGDetailTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return TAGDetailTypeEnum.SQL;
    }
}
