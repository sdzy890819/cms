package com.cn.cms.job;

import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.middleware.JedisClient;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/17.
 */
public abstract class JobTask extends BaseTask {

    @Resource
    private JedisClient jedisClient;

    @Override
    protected void execute() {}


    protected abstract String getKEY();

    /**
     * 锁
     * @return
     */
    protected boolean lock(){
        Long p = jedisClient.setnx(RedisKeyContants.getRedisLockKey(getKEY()));
        log.info(this.getCurrentName().concat( "LOCK=" + p) );
        if( p!=null && p >0){
            return true;
        }
        return false;
    }

    protected void unlock(){
        jedisClient.del(RedisKeyContants.getRedisLockKey(getKEY()));
    }

    @Override
    protected void start() {
        super.start();
    }

    @Override
    protected boolean exec() {
        boolean bool = lock();
        if(!bool) {
            log.info(this.getCurrentName().concat(" 未抢到执行权，执行失败。"));
        }else{
            log.info(this.getCurrentName().concat(" 抢到执行权，开始执行。"));
        }
        return bool;
    }

    @Override
    protected void end() {
        super.end();
        unlock();
    }

}
