package com.cn.cms.message.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.amqp.core.AmqpTemplate;

import javax.annotation.Resource;

/**
 * 发送消息基础类。封装amqpTemplate
 * Created by zhangyang on 16/11/15.
 */
public class MessageSender  {

    @Getter
    @Setter
    private String routingKey;

    @Getter
    @Setter
    @Resource(name="amqpTemplate4Message")
    private AmqpTemplate amqpTemplate;

    public void sendDataToQueue(Object obj) {
        amqpTemplate.convertAndSend(this.routingKey, obj);
    }
}
