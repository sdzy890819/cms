package com.cn.cms.enums;

import lombok.Getter;

/**
 * 压缩枚举
 * Created by ADMIN on 16/11/17.
 */
public enum RegexNumEnum {

    REGEX_ALL("REGEX", 0),
    REGEX_MATCHER_1("REGEX1", 1);

    @Getter
    private int type;
    @Getter
    private String name;

    RegexNumEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static RegexNumEnum get(int type){
        RegexNumEnum[] a = RegexNumEnum.values();
        for(int i=0; i<a.length; i++){
            RegexNumEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return RegexNumEnum.REGEX_ALL;
    }
}
