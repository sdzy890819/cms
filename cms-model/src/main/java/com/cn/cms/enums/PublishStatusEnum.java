package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/24.
 */
public enum PublishStatusEnum {

    //-- ERROR_CODE_DEFAULT是动态可变。的messages
    //-- SUCCESS_CODE_DETAIL是动态可变化的message
    SUCCESS("SUCCESS", 1, "发布成功!"),
    ERROR("ERROR",-1,"发布失败"),
    EXECING("EXECING",0,"发布中");

    @Getter
    private int type;
    @Getter
    private String name;
    @Getter
    private String message;

    PublishStatusEnum(String name, int type, String message){
        this.type = type;
        this.name = name;
        this.message = message;
    }

    public static PublishStatusEnum get(int type){
        PublishStatusEnum[] a = PublishStatusEnum.values();
        for(int i=0; i<a.length; i++){
            PublishStatusEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
