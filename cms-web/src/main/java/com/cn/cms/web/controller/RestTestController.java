package com.cn.cms.web.controller;

import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.MQQueueKeyEnum;
import com.cn.cms.message.BuildSendMessage;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/24.
 */
@Controller
@RequestMapping(value="/test/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class RestTestController extends BaseController{

    @Resource
    private BuildSendMessage buildSendMessage;


    /**
     * 测试发送MQ
     * @return
     */
    @RequestMapping(value = "/sendMQ", method = RequestMethod.GET)
    public String sendMQ(){
        String sendText = "Hello, World!!";
        buildSendMessage.sendTest(sendText, CommonMessageSourceEnum.OTHER, MQQueueKeyEnum.BUILD);
        return ApiResponse.returnSuccess();
    }

    @RequestMapping(value = "/a", method = RequestMethod.POST)
    public String a(@RequestParam("c") String c){
        return ApiResponse.returnSuccess(c);
    }

}
