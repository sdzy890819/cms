package com.cn.cms.enums;

import lombok.Getter;

/**
 * 触发类型
 * Created by 华盛信息科技有限公司(HS) on 16/11/16.
 */
public enum TriggerTypeEnum {

    NEWS("新闻", 1),
    TOPIC("专题", 2),
    FRAGMENT("碎片", 3),
    RECOMMEND("推荐新闻", 4),
    OTHER("模版自动生成", 5);

    @Getter
    private int type;
    @Getter
    private String name;

    TriggerTypeEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static TriggerTypeEnum get(int type){
        TriggerTypeEnum[] a = TriggerTypeEnum.values();
        for(int i=0; i<a.length; i++){
            TriggerTypeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
