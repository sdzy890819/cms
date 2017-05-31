package com.cn.cms.main;

import com.cn.cms.middleware.JedisClient;
import com.cn.cms.utils.ContextUtil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import redis.clients.jedis.JedisSentinelPool;

/**
 * Created by ADMIN on 16/12/23.
 */
public class PublishApplication {

    public static void main(String[] args){
        ApplicationContext context = new ClassPathXmlApplicationContext("spring/spring-app.xml");

    }
}
