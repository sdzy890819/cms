package com.cn.cms.app.message.common;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.job.BaseTask;
import com.cn.cms.utils.ContextUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.amqp.core.AmqpTemplate;

/**
 * 发送消息
 * Created by ADMIN on 16/11/15.
 */

@Getter
@Setter
public class MessageSender extends BaseTask {

    private AmqpTemplate amqpTemplate = ContextUtil.getContextUtil().getBean("amqpTemplate4Message", AmqpTemplate.class);

    private Object object;

    private String routingKey;

    public MessageSender(){}

    public MessageSender(Object object, String routingKey){
        this.object = object;
        this.routingKey = routingKey;
    }

    @Override
    protected void execute() {
        amqpTemplate.convertAndSend(routingKey, object);
    }

    @Override
    protected String getJobName() {
        return "App端 生成消息发送"+ JSONObject.toJSONString(getObject());
    }
}
