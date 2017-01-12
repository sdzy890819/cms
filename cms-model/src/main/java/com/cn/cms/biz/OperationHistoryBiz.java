package com.cn.cms.biz;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.OperationHistory;
import com.cn.cms.service.OperationService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by zhangyang on 16/12/1.
 */
@Component
public class OperationHistoryBiz extends BaseBiz {

    @Resource
    private OperationService operationService;

    @Resource
    private JedisClient jedisClient;

    /**
     * 纪录
     * @param operationHistory
     */
    public void recordRedis(OperationHistory operationHistory){
        jedisClient.zadd(RedisKeyContants.REDIS_RECORD_KEY, JSONObject.toJSONString(operationHistory),operationHistory.getCurrTime().getTime());
    }

    /**
     * 写入 每10分钟写入一次即可。
     */
    public void recordInsertDB(){
        long current = new Date().getTime()-1;
        Set<String> set = jedisClient.zrevrangeByScore(RedisKeyContants.REDIS_RECORD_KEY,current,0);
        List<OperationHistory> list = new ArrayList<>();
        Iterator<String> it = set.iterator();
        int a = 0;
        while(it.hasNext()){
            a ++ ;
            list.add(JSONObject.parseObject(it.next(),OperationHistory.class));
            if(list.size() % StaticContants.CMS_NUM == 0){
                operationService.save(list);
                list.clear();
            }
        }
        if(list.size()>0){
            operationService.save(list);
        }
        jedisClient.zremrangeByScore(RedisKeyContants.REDIS_RECORD_KEY,current,0);
    }

}
