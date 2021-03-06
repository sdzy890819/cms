package com.cn.cms.biz;

import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.MQQueueKeyEnum;
import com.cn.cms.message.BuildSendMessage;
import com.cn.cms.message.bean.Body;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;

/**
 * Created by ADMIN on 16/12/24.
 */
@Component
public class PublishBiz extends BaseBiz {

    @Resource
    private BuildSendMessage buildSendMessage;

    /**
     * 发送指令给后端处理［发布］
     * @param id
     * @param commonMessageSourceEnum
     */
    public void publish(Long id, String userId , CommonMessageSourceEnum commonMessageSourceEnum){
        Body body = new Body();
        body.setId(id);
        body.setUserId(userId);
        buildSendMessage.sendBuild(body, commonMessageSourceEnum, MQQueueKeyEnum.BUILD);
    }

    /**
     * 发送指令给后端处理。［撤销］
     * @param id
     * @param userId
     * @param commonMessageSourceEnum
     */
    public void rescind(Long id, String userId, CommonMessageSourceEnum commonMessageSourceEnum){
        Body body = new Body();
        body.setId(id);
        body.setUserId(userId);
        buildSendMessage.sendRescind(body, commonMessageSourceEnum, MQQueueKeyEnum.BUILD);
    }

    /**
     * 发送指令给后端处理。[发布栏目]
     * @param id
     * @param userId
     * @param commonMessageSourceEnum
     */
    public void publishColumn(Long id, String userId, CommonMessageSourceEnum commonMessageSourceEnum){
        Body body = new Body();
        body.setId(id);
        body.setUserId(userId);
        buildSendMessage.sendColumnPublish(body, commonMessageSourceEnum, MQQueueKeyEnum.BUILD);
    }



}
