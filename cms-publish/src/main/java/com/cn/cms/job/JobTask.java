package com.cn.cms.job;

import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
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
        boolean bool = lock();
        if(!bool) {
            log.info(this.getCurrentName().concat(" 未抢到执行权，执行失败。"));
        }else{
            log.info(this.getCurrentName().concat(" 抢到执行权，开始执行。"));
        }
        return lock();
    }

    @Override
    protected void end() {
        super.end();
        unlock();
    }

}
