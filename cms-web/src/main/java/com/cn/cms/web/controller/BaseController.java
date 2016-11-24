package com.cn.cms.web.controller;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.utils.CookieUtil;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhangyang on 16/11/24.
 */
public class BaseController {



    protected String getCurrentUserId(HttpServletRequest request){
        return CookieUtil.getCookieVal(request, StaticContants.COOKIE_USER_ID);
    }
}
