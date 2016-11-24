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

    //--------默认返回代码 start
    public static final Integer DEFAULT_SUCCESS_CODE = 0;

    public static final String DEFAULT_SUCCESS_MESSAGE = "成功!!!";

    public static final Integer DEFAULT_FAIL_CODE = -1;

    public static final String DEFAULT_FAIL_MESSAGE = "失败!!!";
    //--------默认返回代码 end
    //---默认分页数  start
    public static final int PAGE_SIZE = 20 ;
    //---默认分页书  end

    public static final String COOKIE_USER_ID = "CMS_QUANJING_USER_ID";

}
