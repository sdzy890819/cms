package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by zhangyang on 16/11/16.
 */
public enum QJDetailTypeEnum {

    NEWSID("NEWSID", 1),
    NEWSCOLUMNID("NEWSCOLUMNID", 2),
    TOPICID("TOPICID", 3),
    FRAGMENTID("FRAGMENTID", 4),
    SQL("SQL", 5);

    @Getter
    private int type;

    @Getter
    private String name;


    QJDetailTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static QJDetailTypeEnum get(int type){
        QJDetailTypeEnum[] a = QJDetailTypeEnum.values();
        for(int i=0; i<a.length; i++){
            QJDetailTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return QJDetailTypeEnum.SQL;
    }
}
