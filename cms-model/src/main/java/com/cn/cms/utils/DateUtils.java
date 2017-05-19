package com.cn.cms.utils;

import java.util.Date;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/6.
 */
public class DateUtils {


    public static long convertDateToMillis(Date date){
        if(date!=null){
            return date.getTime();
        }
        return 0;
    }

}
