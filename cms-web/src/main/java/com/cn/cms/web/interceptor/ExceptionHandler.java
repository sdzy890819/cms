package com.cn.cms.web.interceptor;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangyang on 16/11/23.
 */
@Component
public class ExceptionHandler implements HandlerExceptionResolver {

    private static CommonLog log = CommonLogFactory.getLog(ExceptionHandler.class);


    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        String message = ErrorCodeEnum.ERROR_CODE_DEFAULT.getMessage();
        Integer code = ErrorCodeEnum.ERROR_CODE_DEFAULT.getType();
        try {
            response.setHeader(StaticContants.HEADER_CONTENT_TYPE, StaticContants.JSON_UTF8);
            if(ex instanceof BizException){
                BizException bizException = (BizException) ex;
                message = bizException.getMessage();
                code = bizException.getCode();
            }
            response.getWriter().write(ApiResponse.returnFail(code, message));
            response.getWriter().flush();
            response.getWriter().close();
        }catch(Exception e){
            log.info("错误拦截器出现错误",e);
        }
        return null;
    }

}
