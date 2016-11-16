package com.cn.cms.enums;

import com.cn.cms.message.enums.MessageSourceEnum;
import lombok.Getter;

/**
 * Created by zhangyang on 16/11/15.
 */
public enum DelTagEnum {

    DEL("删除", 0),
    NORMAL("正常", 1),
    ERROR("错误", -1);

    @Getter
    private int type;
    @Getter
    private String name;

    DelTagEnum(String name, int type){
        this.type = type;
        this.name = name;
    }

    public static DelTagEnum get(int type){
        DelTagEnum[] a = DelTagEnum.values();
        for(int i=0; i<a.length; i++){
            DelTagEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return DelTagEnum.ERROR;
    }
}
