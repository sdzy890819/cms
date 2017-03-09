package com.cn.cms.enums;

import lombok.Getter;

/**
 * 水印枚举
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public enum WatermarkEnum {

    watermark("水印", 1),
    notwatermark("不打水印", 0);

    @Getter
    private int type;
    @Getter
    private String name;

    WatermarkEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static WatermarkEnum get(int type){
        WatermarkEnum[] a = WatermarkEnum.values();
        for(int i=0; i<a.length; i++){
            WatermarkEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return WatermarkEnum.notwatermark;
    }
}
