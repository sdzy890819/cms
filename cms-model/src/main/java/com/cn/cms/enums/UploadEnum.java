package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by ADMIN on 16/11/29.
 */
public enum UploadEnum {

    YES("已上传模版", 1),
    NO("未上传模版", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    UploadEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static UploadEnum get(int type){
        UploadEnum[] a = UploadEnum.values();
        for(int i=0; i<a.length; i++){
            UploadEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return UploadEnum.NO;
    }
}
