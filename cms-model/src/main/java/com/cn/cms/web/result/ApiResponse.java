package com.cn.cms.web.result;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * 返回信息
 * Created by zhangyang on 16/11/23.
 */
@Getter
@Setter
public class ApiResponse {

    private Integer code;

    private String message;

    private Object data;

    public ApiResponse(Integer code, String message, Object data){
        this.code = code;
        this.message = message;
        this.data = data;
    }


    public static String returnSuccess(){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.SUCCESS_CODE_DETAIL.getType(),ErrorCodeEnum.SUCCESS_CODE_DETAIL.getMessage(),null);
        return JSONObject.toJSONString(apiResponse);
    }

    public static String returnSuccess(Object data){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.SUCCESS_CODE_DETAIL.getType(),ErrorCodeEnum.SUCCESS_CODE_DETAIL.getMessage(),data);
        return JSONObject.toJSONString(apiResponse, StaticContants.config);
    }

    public static String returnSuccess(String message, Object data){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.SUCCESS_CODE_DETAIL.getType(),message,data);
        return JSONObject.toJSONString(apiResponse, StaticContants.config);
    }

    public static String returnSuccess(Integer code, String message){
        ApiResponse apiResponse = new ApiResponse(code,message,null);
        return JSONObject.toJSONString(apiResponse);
    }

    public static String returnSuccess(Integer code, String message, Object data){
        ApiResponse apiResponse = new ApiResponse(code, message, data);
        return JSONObject.toJSONString(apiResponse, StaticContants.config);
    }

    public static String returnSuccess(String message){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.SUCCESS_CODE_DETAIL.getType(), message, null);
        return JSONObject.toJSONString(apiResponse);
    }

    public static String returnSuccess(Integer code){
        ApiResponse apiResponse = new ApiResponse(code, ErrorCodeEnum.get(code).getMessage(), null);
        return JSONObject.toJSONString(apiResponse);
    }



    public static String returnFail(Integer code, String message, Object data){
        ApiResponse apiResponse = new ApiResponse(code, message, data);
        return JSONObject.toJSONString(apiResponse, StaticContants.config);
    }

    public static String returnFail(String message, Object data){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.ERROR_CODE_DEFAULT.getType(), message, data);
        return JSONObject.toJSONString(apiResponse, StaticContants.config);
    }

    public static String returnFail(Integer code, String message){
        ApiResponse apiResponse = new ApiResponse(code, message, null);
        return JSONObject.toJSONString(apiResponse);
    }

    public static String returnFail(Object data){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.ERROR_CODE_DEFAULT.getType(), ErrorCodeEnum.ERROR_CODE_DEFAULT.getMessage(), data);
        return JSONObject.toJSONString(apiResponse, StaticContants.config);
    }

    public static String returnFail(){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.ERROR_CODE_DEFAULT.getType(), ErrorCodeEnum.ERROR_CODE_DEFAULT.getMessage(), null);
        return JSONObject.toJSONString(apiResponse);
    }

    public static String returnFail(String message){
        ApiResponse apiResponse = new ApiResponse(ErrorCodeEnum.ERROR_CODE_DEFAULT.getType(), message, null);
        return JSONObject.toJSONString(apiResponse);
    }
}
