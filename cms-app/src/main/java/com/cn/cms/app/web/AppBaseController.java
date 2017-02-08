package com.cn.cms.app.web;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.utils.CookieUtil;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhangyang on 17/2/8.
 */
public class AppBaseController {

    public CommonLog log = CommonLogFactory.getLog(this.getClass());

    protected String getCurrentUserId(HttpServletRequest request){
        return CookieUtil.getCookieVal(request, StaticContants.APP_COOKIE_USER_ID);
    }
}
