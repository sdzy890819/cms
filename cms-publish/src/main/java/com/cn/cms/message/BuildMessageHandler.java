package com.cn.cms.message;

import com.cn.cms.message.common.CommonMessage;
import com.cn.cms.message.common.DefaultCommonMessageHandler;
import org.springframework.stereotype.Component;

/**
 * Created by zhangyang on 16/12/24.
 */
@Component
public class BuildMessageHandler extends DefaultCommonMessageHandler {

    @Override
    public void handleMessage(CommonMessage message) {
        super.handleMessage(message);

    }
}
