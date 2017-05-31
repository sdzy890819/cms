package com.cn.cms.web.interceptor;

import com.cn.cms.biz.PermissionBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.web.ann.CheckAuth;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 检测当前用户是否有权限。如果没有权限的话 直接返回失败
 * Created by ADMIN on 16/11/15.
 */
public class CheckAuthInterceptor extends HandlerInterceptorAdapter {

    @Resource
    private PermissionBiz permissionBiz;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        if(handler instanceof HandlerMethod) {
            HandlerMethod hm = (HandlerMethod) handler;
            CheckAuth checkAuth = hm.getMethodAnnotation(CheckAuth.class);
            if (checkAuth != null) {
                String userID = CookieUtil.getCookieVal(request, StaticContants.COOKIE_USER_ID);
                if(!permissionBiz.checkPermission(userID, checkAuth.name())){
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

