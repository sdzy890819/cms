package com.cn.cms.enums;

import lombok.Getter;

/**
 * 压缩枚举
 * Created by zhangyang on 16/11/17.
 */
public enum AuthEnum {

    READ("read", 1),
    QUERY("query", 2),
    WRITE("write", 3),
    UPDATE("update", 4),
    EDIT("edit", 5),
    DELETE("delete", 6),
    PUBLISH("publish", 7);


    @Getter
    private int type;
    @Getter
    private String name;

    AuthEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static AuthEnum get(int type){
        AuthEnum[] a = AuthEnum.values();
        for(int i=0; i<a.length; i++){
            AuthEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return AuthEnum.READ;
    }
}
