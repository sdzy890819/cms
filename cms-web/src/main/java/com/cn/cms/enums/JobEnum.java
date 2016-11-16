package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by zhangyang on 16/11/16.
 */
public enum JobEnum {

    job("定时生成", 1),
    trigger("触发生成", 0),
    error("无生成", -1);

    @Getter
    private int type;
    @Getter
    private String name;

    JobEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static JobEnum get(int type){
        JobEnum[] a = JobEnum.values();
        for(int i=0; i<a.length; i++){
            JobEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return JobEnum.error;
    }
}
