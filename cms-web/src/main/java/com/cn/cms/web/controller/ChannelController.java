package com.cn.cms.web.controller;

import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.po.Channel;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zhangyang on 16/12/7.
 */
@Controller
@RequestMapping(value="/channel/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class ChannelController extends BaseController {


    @Resource
    private ChannelBiz channelBiz;

    /**
     * 获取频道分类列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "channel:read")
    @RequestMapping(value = "/listChannel", method = RequestMethod.GET)
    public String listChannel(){
        List<Channel> list = channelBiz.listChannel();
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 新增频道分类
     * @param request
     * @param channelName
     * @param channelUrl
     * @param channelPath
     * @param channelDesc
     * @param categoryId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "channel:write" )
    @RequestMapping(value = "/createChannel", method = RequestMethod.POST)
    public String createChannel(HttpServletRequest request,
                                @RequestPart(value = "channelName") String channelName,
                                @RequestPart(value = "channelUrl") String channelUrl,
                                @RequestPart(value = "channelPath") String channelPath,
                                @RequestPart(value = "templatePath") String templatePath,
                                @RequestPart(value = "channelDesc") String channelDesc,
                                @RequestPart(value = "categoryId") Long categoryId){
        Channel channel = new Channel();
        channel.setLastModifyUserId(getCurrentUserId(request));
        channel.setChannelDesc(channelDesc);
        channel.setChannelName(channelName);
        channel.setCategoryId(categoryId);
        channel.setChannelPath(channelPath);
        channel.setTemplatePath(templatePath);
        channel.setChannelUrl(channelUrl);
        channelBiz.saveChannel(channel);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改频道分类
     * @param request
     * @param id
     * @param channelName
     * @param channelUrl
     * @param channelPath
     * @param channelDesc
     * @param categoryId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "channel:update" )
    @RequestMapping(value = "/updateChannel", method = RequestMethod.POST)
    public String updateChannel(HttpServletRequest request,
                                @RequestPart(value = "id") Long id,
                                @RequestPart(value = "channelName") String channelName,
                                @RequestPart(value = "channelUrl") String channelUrl,
                                @RequestPart(value = "channelPath") String channelPath,
                                @RequestPart(value = "templatePath") String templatePath,
                                @RequestPart(value = "channelDesc") String channelDesc,
                                @RequestPart(value = "categoryId") Long categoryId){
        Channel channel = new Channel();
        channel.setLastModifyUserId(getCurrentUserId(request));
        channel.setChannelDesc(channelDesc);
        channel.setChannelName(channelName);
        channel.setCategoryId(categoryId);
        channel.setChannelPath(channelPath);
        channel.setTemplatePath(templatePath);
        channel.setChannelUrl(channelUrl);
        channel.setId(id);
        channelBiz.updateChannel(channel);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除频道分类
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "channel:delete" )
    @RequestMapping(value = "/delChannel", method = RequestMethod.GET)
    public String delChannel(HttpServletRequest request, @RequestParam(value = "id") Long id){
        channelBiz.delChannel(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }



    /**
     * 根据Category查询频道列表
     * @param categoryId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "channel:read")
    @RequestMapping(value = "/channelListForCategory", method = RequestMethod.GET)
    public String channelListForCategory(@RequestParam(value = "categoryId") Long categoryId){
        List<Channel> list = channelBiz.findChannelList(categoryId);
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 获取频道信息
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "channel:read" )
    @RequestMapping(value = "/channelInfo", method = RequestMethod.GET)
    public String channelInfo(HttpServletRequest request, @RequestParam(value = "id") Long id){
        Channel channel = channelBiz.getChannel(id);
        return ApiResponse.returnSuccess(channel);
    }


}
