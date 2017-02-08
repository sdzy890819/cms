package com.cn.cms.web.interceptor;

import com.cn.cms.biz.PermissionBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.web.ann.CheckAppAuth;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 检测当前用户是否有权限。如果没有权限的话 直接返回失败
 * Created by zhangyang on 16/11/15.
 */
public class CheckAppAuthInterceptor extends HandlerInterceptorAdapter {

    @Resource
    private PermissionBiz permissionBiz;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        if(handler instanceof HandlerMethod) {
            HandlerMethod hm = (HandlerMethod) handler;
            CheckAppAuth checkAppAuth = hm.getMethodAnnotation(CheckAppAuth.class);
            if (checkAppAuth != null) {
                String userID = CookieUtil.getCookieVal(request, StaticContants.APP_COOKIE_USER_ID);
                if(!permissionBiz.checkAppPermission(userID, checkAppAuth.name())){
                    throw new BizException(ErrorCodeEnum.ERROR_NO_PERMISSION.getType(),ErrorCodeEnum.ERROR_NO_PERMISSION.getMessage());
                }
            }
        }
        return true;
    }


    @Override
    public void postHandle(
            HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
            throws Exception {
    }
}

