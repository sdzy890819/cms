package com.cn.cms.message;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.biz.BuildBiz;
import com.cn.cms.enums.CommonMessageOperationEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.message.common.CommonMessage;
import com.cn.cms.message.common.DefaultCommonMessageHandler;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by ADMIN on 16/12/24.
 */
@Component
public class BuildMessageHandler extends DefaultCommonMessageHandler {

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    @Resource
    private BuildBiz buildBiz;

    @Override
    public void handleMessage(CommonMessage message) {
        try {
            super.handleMessage(message);
            CommonMessageOperationEnum commonMessageOperationEnum = CommonMessageOperationEnum.get(message.getOperation());
            switch (commonMessageOperationEnum){
                case PUBLISH:{
                    buildBiz.build(message);
                    break;
                }
                case RESCIND:{
                    buildBiz.rescind(message);
                    break;
                }
                case COLUMNREPUBLISH:{
                    buildBiz.batchPublish(message);
                    break;
                }
                default : break;
            }
        }catch(Exception e){
            log.error("消息异常，抛出错误，消息体：".concat(JSONObject.toJSONString(message)), e);
        }
    }
}
