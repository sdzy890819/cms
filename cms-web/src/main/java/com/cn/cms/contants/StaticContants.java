package com.cn.cms.contants;

import java.util.HashMap;
import java.util.Map;

/**
 * 所有静态类的变量定义。都在这个类里
 * Created by zhangyang on 16/11/15.
 */
public class StaticContants {


    public static Map<Integer,String> errorMap = new HashMap<Integer, String>();
    static {
        errorMap.put(-1 ,"上帝发怒了,肿么办");
        errorMap.put(110 ,"自定义范例");
    }
}
