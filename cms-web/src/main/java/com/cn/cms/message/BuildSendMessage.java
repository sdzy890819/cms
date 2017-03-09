package com.cn.cms.message;

import com.cn.cms.enums.CommonMessageOperationEnum;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.MQQueueKeyEnum;
import com.cn.cms.message.bean.Body;
import com.cn.cms.message.common.CommonMessage;
import com.cn.cms.message.common.MessageSender;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/15.
 */
@Component
public class BuildSendMessage {

    @Resource(name = "threadTaskExecutor")
    private TaskExecutor threadTaskExecutor;

    public void sendTest(Object object , CommonMessageSourceEnum commonMessageSourceEnum
            , MQQueueKeyEnum mqQueueKeyEnum){
        CommonMessage commonMessage = new CommonMessage(object, commonMessageSourceEnum.getType());
        send(commonMessage, mqQueueKeyEnum);
    }

    /**
     * 发送生成信息
     * @param object
     * @param commonMessageSourceEnum
     * @param mqQueueKeyEnum
     */
    public void sendBuild(Object object , CommonMessageSourceEnum commonMessageSourceEnum
            , MQQueueKeyEnum mqQueueKeyEnum){
        CommonMessage commonMessage = new CommonMessage(object, commonMessageSourceEnum.getType());
        send(commonMessage, mqQueueKeyEnum);
    }

    /**
     * 发送撤销消息
     * @param object
     * @param commonMessageSourceEnum
     * @param mqQueueKeyEnum
     */
    public void sendRescind(Object object , CommonMessageSourceEnum commonMessageSourceEnum
            , MQQueueKeyEnum mqQueueKeyEnum){
        CommonMessage commonMessage = new CommonMessage(object, commonMessageSourceEnum.getType(), CommonMessageOperationEnum.RESCIND.getType());
        send(commonMessage, mqQueueKeyEnum);
    }

    /**
     * 任务执行MQ发送
     * @param commonMessage
     * @param mqQueueKeyEnum
     */
    private void send(CommonMessage commonMessage, MQQueueKeyEnum mqQueueKeyEnum){
        MessageSender messageSender = new MessageSender();
        messageSender.setObject(commonMessage);
        messageSender.setRoutingKey(mqQueueKeyEnum.getName());
        threadTaskExecutor.execute(messageSender);
    }

}
