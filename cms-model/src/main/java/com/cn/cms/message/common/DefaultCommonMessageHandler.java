package com.cn.cms.message.common;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/24.
 */
public class DefaultCommonMessageHandler implements CommonMessageHandler {

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    @Override
    public void handleMessage(CommonMessage message) {
        if(message != null){
            log.info("消息队列接收到消息：" + message.toString());
        }else{
            log.info("消息队列接收到消息：空!");
            return;
        }

    }
}
