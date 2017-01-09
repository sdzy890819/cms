package com.cn.cms.web.controller;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.utils.CookieUtil;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhangyang on 16/11/24.
 */
@RequestMapping(value="/webapi/")
public class BaseController {

    public CommonLog log = CommonLogFactory.getLog(this.getClass());

    protected String getCurrentUserId(HttpServletRequest request){
        return CookieUtil.getCookieVal(request, StaticContants.COOKIE_USER_ID);
    }
}
