package com.cn.cms.enums;

import lombok.Getter;

/**
 * 平台枚举
 * Created by ADMIN on 16/11/16.
 */
public enum CommonMessageSourceEnum {

    NEWS("NEWS", 1, TriggerTypeEnum.NEWS),
    TOPIC("TOPIC", 2, TriggerTypeEnum.TOPIC),
    FRAGMENT("FRAGMENT", 3, TriggerTypeEnum.FRAGMENT),
    RECOMMEND("RECOMMEND", 4, TriggerTypeEnum.RECOMMEND),
    OTHER("OTHER", 5, TriggerTypeEnum.OTHER),
    COLUMN("COLUMN", 9, TriggerTypeEnum.DEFAULT);

    @Getter
    private Integer type;

    @Getter
    private String name;

    @Getter
    private TriggerTypeEnum triggerTypeEnum;


    CommonMessageSourceEnum(String name, int type, TriggerTypeEnum triggerTypeEnum){
        this.type = type;
        this.name = name;
        this.triggerTypeEnum = triggerTypeEnum;
    }

    public static CommonMessageSourceEnum get(int type){
        CommonMessageSourceEnum[] a = CommonMessageSourceEnum.values();
        for(int i=0; i<a.length; i++){
            CommonMessageSourceEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
