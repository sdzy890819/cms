package com.cn.cms.contants;

import java.util.HashMap;
import java.util.Map;

/**
 * 所有静态类的变量定义。都在这个类里
 * Created by zhangyang on 16/11/15.
 */
public class StaticContants {


    public static final String HEADER_CONTENT_TYPE = "Content-Type";

    public static final String JSON_UTF8 = "application/json;charset=UTF-8";

    public static final String UTF8 = "UTF-8";

    //---默认分页数  start
    public static final int PAGE_SIZE = 20 ;
    public static final int PAGE = 1 ;
    //---默认分页书  end

    public static final String COOKIE_USER_ID = "CMS_QUANJING_USER_ID";

    public static final String COOKIE_USER_TOKEN = "CMS_QUANJING_USER_TOKEN";

    public static final String COOKIE_TIME = "CMS_QUANJING_TIME";

    public static final String COOKIE_USER_KEY = "CMS_QUANJING_USER_KEY";

    public static final String COOKIE_REAL_NAME = "CMS_QUANJING_NAME";

    //----自定义错误码
    public static final String ERROR_NOT_AUTH = "无权限操作!";

    public static final String ERROR_NO_POSITION = "此用户组不存在!";

    public static final String ERROR_PWD = "密码错误!";

    public static final String ERROR_NO_USER = "用户不存在!";

    public static final String ERROR_POSITION_RE = "用户组已经存在";

    //----自定义错误码

    //----自定义成功码
    public static final String SUCCESS_LOGIN = "登录成功!";
    //----自定义成功码

    public static final int DEFAULT_SECONDS = 24*60*60;
}
