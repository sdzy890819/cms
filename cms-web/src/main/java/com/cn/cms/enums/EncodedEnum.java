package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by zhangyang on 16/11/16.
 */
public enum EncodedEnum {

    utf8("UTF-8", 1),
    gbk("GBK", 2),
    big5("BIG5", 3),
    error("UTF-8", -1);
    @Getter
    private int type;
    @Getter
    private String name;

    EncodedEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static EncodedEnum get(int type){
        EncodedEnum[] a = EncodedEnum.values();
        for(int i=0; i<a.length; i++){
            EncodedEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return EncodedEnum.error;
    }
}
