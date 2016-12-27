package com.cn.cms.message;

import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.MQQueueKeyEnum;
import com.cn.cms.message.common.CommonMessage;
import com.cn.cms.message.common.MessageSender;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/11/15.
 */
@Component
public class BuildSendMessage {

    @Resource(name = "threadTaskExecutor")
    private ThreadPoolTaskExecutor threadTaskExecutor;

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
