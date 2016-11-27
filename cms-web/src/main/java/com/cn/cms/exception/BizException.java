package com.cn.cms.exception;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class BizException extends Exception {

    private static CommonLog log = CommonLogFactory.getLog(BizException.class);

    private Integer code = ErrorCodeEnum.ERROR_CODE_DEFAULT.getType();

    private String message = ErrorCodeEnum.ERROR_CODE_DEFAULT.getMessage();

    public BizException(){
        log.error("非异常错误, 使用默认错误返回");
    }

    public BizException(Exception e){
        log.error("抛出异常信息,",e);
    }

    public BizException(String message,Exception e){
        this.message = message;
        log.error("抛出异常信息,自定义内容：".concat(message),e);
    }

    public BizException(Integer code,Exception e){
        this.code = code;
        this.message = ErrorCodeEnum.get(code).getMessage();
    }

    public BizException(Integer code, String message, Exception e){
        this.code = code;
        this.message = message;
        log.error("抛出异常信息,自定义内容：".concat(message),e);
    }

    public BizException(Integer code,String message){
        this.code = code;
        this.message = message;
        log.error("非异常错误, 使用默认错误返回");
    }

}
