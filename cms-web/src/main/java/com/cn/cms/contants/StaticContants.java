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

    public static final int PAGE_SIZE = 20 ;


    public static Map<Integer,String> errorMap = new HashMap<Integer, String>();
    static {
        errorMap.put(-1 ,"上帝发怒了,肿么办");
        errorMap.put(110 ,"自定义范例");
    }
}
