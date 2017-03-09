package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by 华盛信息科技有限公司(HS) on 16/11/16.
 */
public enum TAGDetailTypeEnum {

    NEWSID("NEWSID", 1),
    NEWSCOLUMNID("NEWSCOLUMNID", 2),
    CHANNELID("CHANNELID", 3),
    CATEGORYID("CATEGORYID", 4),
    TOPICID("TOPICID", 5),
    TOPICCLASSIFY("TOPICCLASSIFYID", 6),
    TOPICCOLUMNID("TOPICCOLUMNID", 7),
    FRAGMENTID("FRAGMENTID", 8),
    SQL("SQL", 9);

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
