package com.cn.cms.message;

import com.cn.cms.biz.BuildBiz;
import com.cn.cms.message.common.CommonMessage;
import com.cn.cms.message.common.DefaultCommonMessageHandler;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/24.
 */
@Component
public class BuildMessageHandler extends DefaultCommonMessageHandler {

    @Resource
    private BuildBiz buildBiz;

    @Override
    public void handleMessage(CommonMessage message) {
        super.handleMessage(message);
        buildBiz.build(message);
    }
}
