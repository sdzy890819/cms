package com.cn.cms.logfactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Created by zhangyang on 16/11/10.
 */
public class CommonLogFactory{

    public static CommonLog getLog(Class clazz){
        CommonLog commonLog = new CommonLog(LogFactory.getLog(clazz));
        return commonLog;
    }

}