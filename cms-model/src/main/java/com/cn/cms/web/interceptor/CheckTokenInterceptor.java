package com.cn.cms.web.interceptor;

import com.cn.cms.biz.UserBiz;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.web.ann.CheckToken;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckTokenInterceptor extends HandlerInterceptorAdapter {


	@Resource
	private UserBiz userBiz;

	/**
	 * 请求前验证。是否通过
	 */
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		if(handler instanceof HandlerMethod){
			HandlerMethod hm = (HandlerMethod) handler;
			if(hm.getMethodAnnotation(CheckToken.class) != null) {
				if(userBiz.checkUserToken(request)){
					return true;
				}else{
					throw new BizException(ErrorCodeEnum.ERROR_LOGIN_FAIL.getType(),ErrorCodeEnum.ERROR_LOGIN_FAIL.getMessage());
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
