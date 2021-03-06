package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by ADMIN on 16/11/24.
 */
public enum PublishStatusEnum {

    PUBLISH_SUCCESS("PUBLISH_SUCCESS", 8, "发布成功"),
    ERROR("ERROR", 4, "发布失败"),
    RE_SUCCESS("RE_SUCCESS", 9, "撤销成功"),
    RE_ERROR("RE_ERROR", 3, "撤销失败"),
    EXECING("EXECING", 1, "发布中");

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
