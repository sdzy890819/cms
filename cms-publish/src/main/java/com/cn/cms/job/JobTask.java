package com.cn.cms.job;

import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.middleware.JedisClient;

/**
 * Created by zhangyang on 17/1/17.
 */
public abstract class JobTask extends BaseTask {

    protected JedisClient jedisClient;

    protected String KEY = "KEY";


    /**
     * 锁
     * @return
     */
    protected boolean lock(){
        Long p = jedisClient.setnx(RedisKeyContants.getRedisLockKey(KEY));
        if( p!=null && p >0){
            return true;
        }
        return false;
    }

    protected void unlock(){
        jedisClient.del(RedisKeyContants.getRedisLockKey(KEY));
    }

    @Override
    protected void start() {
        super.start();
    }

    @Override
    protected boolean exec() {
        return lock();
    }

    @Override
    protected void end() {
        super.end();
        unlock();
    }

}
