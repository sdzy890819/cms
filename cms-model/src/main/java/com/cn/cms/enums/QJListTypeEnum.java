package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by zhangyang on 16/11/16.
 */
public enum QJListTypeEnum {

    NEWCOLUMN("NEWCOLUMN", 1),
    TOPICCOLUMN("TOPICCOLUMN", 2),
    TOPICCLASSIFY("TOPICCLASSIFY", 3),
    FRAGMENTCLASSIFY("FRAGMENTCLASSIFY", 4),
    SQL("SQL", 5);

    @Getter
    private int type;

    @Getter
    private String name;


    QJListTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static QJListTypeEnum get(int type){
        QJListTypeEnum[] a = QJListTypeEnum.values();
        for(int i=0; i<a.length; i++){
            QJListTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return QJListTypeEnum.SQL;
    }
}
