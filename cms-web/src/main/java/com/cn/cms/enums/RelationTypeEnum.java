package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by zhangyang on 16/11/16.
 */
public enum RelationTypeEnum {

    topic("专题分类ID", 3),
    fragment("碎片ID", 2),
    column("栏目ID", 1),
    error("不存在的类型ID", -1);

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
        return RelationTypeEnum.error;
    }
}
