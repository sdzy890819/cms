package com.cn.cms.app.biz;

import com.cn.cms.app.message.BuildSendMessage;
import com.cn.cms.biz.BaseBiz;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.MQQueueKeyEnum;
import com.cn.cms.message.bean.Body;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by ADMIN on 16/12/24.
 */
@Component
public class AppPublishBiz extends BaseBiz {

    @Resource
    private BuildSendMessage buildSendMessage;

    /**
     * 发送指令给后端处理
     * @param id
     * @param commonMessageSourceEnum
     */
    public void publish(Long id, String userId , CommonMessageSourceEnum commonMessageSourceEnum){
        Body body = new Body();
        body.setId(id);
        body.setUserId(userId);
        buildSendMessage.sendBuild(body, commonMessageSourceEnum, MQQueueKeyEnum.BUILD);
    }


}
