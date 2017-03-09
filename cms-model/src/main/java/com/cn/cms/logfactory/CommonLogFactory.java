package com.cn.cms.logfactory;

import org.apache.commons.logging.LogFactory;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/10.
 */
public class CommonLogFactory{

    public static CommonLog getLog(Class clazz){
        CommonLog commonLog = new CommonLog(LogFactory.getLog(clazz));
        return commonLog;
    }


}
