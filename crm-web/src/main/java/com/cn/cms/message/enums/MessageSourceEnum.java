package com.cn.cms.message.enums;

import lombok.Getter;

/**
 * Created by zhangyang on 16/11/15.
 */
public enum MessageSourceEnum {

    CMSSEND("CMS发布", 1);

    @Getter
    private int type;

    @Getter
    private String name;

    MessageSourceEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static MessageSourceEnum get(int type){
        MessageSourceEnum[] a = MessageSourceEnum.values();
        for(int i=0; i<a.length; i++){
            MessageSourceEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return MessageSourceEnum.CMSSEND;
    }
}
