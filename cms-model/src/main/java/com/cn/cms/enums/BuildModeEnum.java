package com.cn.cms.enums;

import lombok.Getter;

/**
 * 文件名生成方式枚举
 * Created by zhangyang on 16/11/15.
 */
public enum BuildModeEnum {

    RANDOM("随机生成", 1),
    COLUMN("栏目ID", 2);

    @Getter
    private int type;
    @Getter
    private String name;

    BuildModeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static BuildModeEnum get(int type){
        BuildModeEnum[] a = BuildModeEnum.values();
        for(int i=0; i<a.length; i++){
            BuildModeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return BuildModeEnum.RANDOM;
    }
}
