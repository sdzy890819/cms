package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/24.
 */
public enum ErrorCodeEnum {

    //-- ERROR_CODE_DEFAULT是动态可变。的messages
    //-- SUCCESS_CODE_DETAIL是动态可变化的message
    SUCCESS_CODE_DETAIL("SUCCESS_CODE_DETAIL", 0, "成功!"),
    ERROR_CODE_DEFAULT("ERROR_CODE_DEFAULT",-1,"天塌了，地陷了，小花猫不见了"),
    ERROR_LOGIN_FAIL("ERROR_LOGIN_FAIL",-110,"登录失败，请重新登录"),
    ERROR_NO_PERMISSION("ERROR_NO_PERMISSION",-111,"无权限"),
    ERROR_USERNAME_RE("ERROR_USERNAME_RE",-210,"用户名重复");

    @Getter
    private int type;
    @Getter
    private String name;
    @Getter
    private String message;

    ErrorCodeEnum(String name, int type,String message){
        this.type = type;
        this.name = name;
        this.message = message;
    }

    public static ErrorCodeEnum get(int type){
        ErrorCodeEnum[] a = ErrorCodeEnum.values();
        for(int i=0; i<a.length; i++){
            ErrorCodeEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return ErrorCodeEnum.ERROR_CODE_DEFAULT;
    }
}
