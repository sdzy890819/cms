package com.cn.cms.web.controller;

import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.po.Channel;
import com.cn.cms.po.UserChannel;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/11.
 */
@Controller
@RequestMapping(value="/userchannel/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class UserChannelController extends BaseController {

    @Resource
    private ChannelBiz channelBiz;

    @Resource
    private UserBiz userBiz;

    /**
     * 根据频道ID获取用户列表
     * @param request
     * @param page
     * @param pageSize
     * @param channelId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "userchannel:read" )
    @RequestMapping(value = "/list/channelId")
    public String userchannel(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                              @RequestParam(value="pageSize",required = false)Integer pageSize,
                              @RequestParam(value = "channelId") Long channelId){
        Page pageObj = new Page(page,pageSize);
        List<UserChannel> list = channelBiz.listUserChannel(channelId,pageObj);
        List<String> userIds = new ArrayList<String>();
        for(int i=0;i<list.size();i++){
            userIds.add(list.get(i).getUserId());
        }
        List<UserBean> userBeanList = userBiz.getUserBean(userIds);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("page",pageObj);
        result.put("list",userBeanList);
        return ApiResponse.returnSuccess(result);
    }

    /**
     * 根据用户ID获取频道列表
     * @param page
     * @param pageSize
     * @param userId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "userchannel:read" )
    @RequestMapping(value = "/list/userId")
    public String userchannel_2(@RequestParam(value = "page",required = false) Integer page,
                              @RequestParam(value="pageSize",required = false)Integer pageSize,
                              @RequestParam(value = "userId") String userId){
        Page pageObj = new Page(page, pageSize);
        List<UserChannel> list = channelBiz.listUserChannel(userId,pageObj);
        List<Long> ids = new ArrayList<Long>();
        for(int i=0;i<list.size();i++){
            ids.add(list.get(i).getChannelId());
        }
        List<Channel> channels = channelBiz.getChannelList(ids);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("page",pageObj);
        result.put("list",channels);
        return ApiResponse.returnSuccess(result);
    }

    /**
     * 创建用户权限
     * @param request
     * @param userId
     * @param channelId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "userchannel:write" )
    @RequestMapping(value = "/createUserChannel", method = RequestMethod.POST)
    public String createUserChannel(HttpServletRequest request,
                                    @RequestPart(value = "userId") String userId,
                                    @RequestPart(value = "channelId") Long channelId){
        UserChannel userChannel = new UserChannel();
        userChannel.setLastModifyUserId(getCurrentUserId(request));
        userChannel.setChannelId(channelId);
        userChannel.setUserId(userId);
        channelBiz.saveUserChannel(userChannel);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除用户权限
     * @param request
     * @param userId
     * @param channelId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "userchannel:delete" )
    @RequestMapping(value = "/delUserChannel", method = RequestMethod.POST)
    public String delUserChannel(HttpServletRequest request,
                                    @RequestPart(value = "userId") String userId,
                                    @RequestPart(value = "channelId") Long channelId){
        channelBiz.delUserChannel(userId, channelId);
        return ApiResponse.returnSuccess();
    }

}
