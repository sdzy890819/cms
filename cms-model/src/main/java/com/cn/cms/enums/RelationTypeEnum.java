package com.cn.cms.enums;

import lombok.Getter;

/**
 * 关系类型枚举
 * Created by zhangyang on 16/11/16.
 */
public enum RelationTypeEnum {

    column("新闻栏目", 1),
    topic("专题分类", 3),
    fragment("碎片", 2);

    @Getter
    private int type;
    @Getter
    private String name;

    RelationTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static RelationTypeEnum get(int type){
        RelationTypeEnum[] a = RelationTypeEnum.values();
        for(int i=0; i<a.length; i++){
            RelationTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return RelationTypeEnum.column;
    }
}
