package com.cn.cms.job;

import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/27.
 */
@Getter
@Setter
public abstract class BaseTask implements Runnable, Serializable {


    protected CommonLog log = CommonLogFactory.getLog(this.getClass());


    protected String jobName;

    /**
     * 任务开始
     */
    protected void start(){
        log.info(getCurrentName().concat("任务开始!!"));
    }

    /**
     * 获取当前名称
     * @return
     */
    protected String getCurrentName(){
        return Thread.currentThread().getName().concat(":").concat(getJobName());
    }

    /**
     * 执行过程
     */
    protected abstract void execute();

    @Override
    public void run() {
        try{
            start();
            if(exec()) {
                this.execute();
            }
        }catch (Exception e){
            exceptionEnd();
            log.error("任务出现错误,当前线程：".concat(getCurrentName()), e);
        }finally {
            end();
        }
    }


    protected boolean exec(){
        return true;
    }


    /**
     * 执行结束
     */
    protected void end(){
        log.info(getCurrentName().concat("任务正常结束!!"));
    }

    /**
     * 执行异常
     */
    protected void exceptionEnd(){
        log.info(getCurrentName().concat("任务异常结束!!"));
    }

    protected abstract String getJobName();
}
