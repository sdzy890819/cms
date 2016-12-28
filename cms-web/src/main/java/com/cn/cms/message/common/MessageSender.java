package com.cn.cms.message.common;

import com.cn.cms.utils.ContextUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 发送消息
 * Created by zhangyang on 16/11/15.
 */

@Getter
@Setter
public class MessageSender implements Runnable{

    private AmqpTemplate amqpTemplate = ContextUtil.getContextUtil().getBean("amqpTemplate4Message", AmqpTemplate.class);

    private Object object;

    private String routingKey;

    public MessageSender(){}

    public MessageSender(Object object, String routingKey){
        this.object = object;
        this.routingKey = routingKey;
    }

    public void sendDataToQueue() {
        amqpTemplate.convertAndSend(routingKey, object);
    }

    @Override
    public void run() {
        sendDataToQueue();
    }
}
