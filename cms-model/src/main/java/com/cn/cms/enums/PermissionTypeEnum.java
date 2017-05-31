package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by ADMIN on 16/11/29.
 */
public enum PermissionTypeEnum {

    MENU("MENU", 1),
    BUTTON("BUTTON", 2);

    @Getter
    private int type;
    @Getter
    private String name;

    PermissionTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static PermissionTypeEnum get(int type){
        PermissionTypeEnum[] a = PermissionTypeEnum.values();
        for(int i=0; i<a.length; i++){
            PermissionTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return PermissionTypeEnum.MENU;
    }
}
