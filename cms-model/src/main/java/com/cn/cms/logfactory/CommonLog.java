package com.cn.cms.logfactory;

import org.apache.commons.logging.Log;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/10.
 */
public class CommonLog {


    private Log log;


    public CommonLog(Log log){
        this.log = log;
    }
    /**
     * 打印信息
     * @param message
     */
    public void info(Object message){
        log.info(message);
    }

    /**
     * 打印信息
     * @param message
     * @param e
     */
    public void info(Object message ,Throwable e){
        log.info(message ,e);
    }

    /**
     * 打印报警信息
     * @param message
     */
    public void warn(Object message){
        log.warn(message);
    }

    /**
     * 打印报警信息
     * @param message
     * @param e
     */
    public void warn(Object message ,Throwable e){
        log.warn(message ,e);
    }

    /**
     * 打印错误信息
     * @param message
     */
    public void error(Object message){
        log.error(message);
    }

    /**
     * 打印错误信息
     * @param message
     * @param e
     */
    public void error(Object message ,Throwable e){
        log.error(message, e);
    }
}
