package com.cn.cms.app.web;

import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.po.Channel;
import com.cn.cms.web.ann.CheckAppAuth;
import com.cn.cms.web.ann.CheckAppToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/2/19.
 */
@Controller
@RequestMapping(value="/app/channel/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class AppChannelController extends AppBaseController {

    @Resource
    private ChannelBiz channelBiz;

    /**
     * 获取频道分类列表
     * @return
     */
    @CheckAppToken
    @RequestMapping(value = "/listChannel", method = RequestMethod.GET)
    public String listChannel(){
        List<Channel> list = channelBiz.listChannel();
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 获取当前用户的频道分类列表
     * @return
     */
    @CheckAppToken
    @RequestMapping(value = "/currentChannelList", method = RequestMethod.GET)
    public String currentChannelList(HttpServletRequest request, @RequestParam(value = "categoryId", required = false) Long categoryId){
        String userID = getCurrentUserId(request);
        List<Channel> list = channelBiz.listChannelByUserId(userID, categoryId);
        return ApiResponse.returnSuccess(list);
    }
}
