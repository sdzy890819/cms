package com.cn.cms.exception;

import com.cn.cms.contants.StaticContants;
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

    private Integer code = -1;

    private String message = "上帝发怒了,肿么办";

    public BizException(){
        log.error("非异常错误,只是为了使用错误返回");
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
        this.message = StaticContants.errorMap.get(code);
    }



}
