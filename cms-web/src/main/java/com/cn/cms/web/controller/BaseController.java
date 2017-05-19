package com.cn.cms.web.controller;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/24.
 */
public class BaseController {

    public CommonLog log = CommonLogFactory.getLog(this.getClass());

    protected String getCurrentUserId(HttpServletRequest request){
        String userId = CookieUtil.getCookieVal(request, StaticContants.COOKIE_USER_ID);
        if(StringUtils.isBlank(userId)){
            userId = String.valueOf(request.getAttribute(StaticContants.CMS_INSIDE_USER_KEY));
        }
        return userId;
    }
}
