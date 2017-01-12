package com.cn.cms.message.common;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;

/**
 * Created by zhangyang on 16/12/24.
 */
public class DefaultCommonMessageHandler implements CommonMessageHandler {

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    @Override
    public void handleMessage(CommonMessage message) {
        if(message != null){
            log.info(message.toString());
        }else{
            return;
        }

    }
}
