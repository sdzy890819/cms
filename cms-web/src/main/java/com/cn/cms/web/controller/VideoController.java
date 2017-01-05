package com.cn.cms.web.controller;

import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.po.Video;
import com.cn.cms.po.VideoBase;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 16/11/30.
 */
@Controller
@RequestMapping(value="/video/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class VideoController extends BaseController{

    @Resource
    private ResourceBiz resourceBiz;

    /**
     * 获取视频基础库。
     * @return
     */
    @CheckToken
    @CheckAuth( name = "videobase:read" )
    @RequestMapping(value = "/videoBase", method = RequestMethod.GET)
    public String videoBase(){
        VideoBase videoBase = resourceBiz.findVideoBase();
        return ApiResponse.returnSuccess(videoBase);
    }


    /**
     * 修改图片基础信息
     * @param request
     * @param id
     * @param baseUrl
     * @param basePath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "videobase:update" )
    @RequestMapping(value = "/updateVideoBase", method = RequestMethod.POST)
    public String updateVideoBase(HttpServletRequest request,
                            @RequestParam("id") Long id,
                            @RequestParam(value = "baseUrl",required = false) String baseUrl,
                            @RequestParam(value = "basePath",required = false) String basePath){
        VideoBase videoBase = new VideoBase();
        videoBase.setId(id);
        videoBase.setBasePath(basePath);
        videoBase.setBaseUrl(baseUrl);
        videoBase.setLastModifyUserId(getCurrentUserId(request));
        resourceBiz.saveVideoBase(videoBase);
        return ApiResponse.returnSuccess();
    }

    /**
     * 创建视频基础信息
     * @param request
     * @param baseUrl
     * @param basePath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "videobase:write" )
    @RequestMapping(value = "/createVideoBase", method = RequestMethod.POST)
    public String createVideoBase(HttpServletRequest request,
                                  @RequestParam("baseUrl") String baseUrl,
                                  @RequestParam("basePath") String basePath){
        VideoBase videoBase = new VideoBase();
        videoBase.setBasePath(basePath);
        videoBase.setBaseUrl(baseUrl);
        videoBase.setLastModifyUserId(getCurrentUserId(request));
        resourceBiz.saveVideoBase(videoBase);
        return ApiResponse.returnSuccess();
    }

    //-------------------------wwwwwwwwww-----------------------------
    /**
     * 创建Video
     * @param request
     * @param videoTitle
     * @param videoDesc
     * @param videoUrl
     * @param videoPath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "video:write" )
    @RequestMapping(value = "/createVideo", method = RequestMethod.POST)
    public String createVideo(HttpServletRequest request,
                              @RequestParam(value = "videoTitle") String videoTitle,
                              @RequestParam(value = "videoDesc") String videoDesc,
                              @RequestParam(value = "videoUrl") String videoUrl,
                              @RequestParam(value = "videoPath", required = false) String videoPath
                              ){
        String userID = getCurrentUserId(request);
        Video video = new Video();
        video.setLastModifyUserId(userID);
        video.setUploadTime(new Date());
        video.setUploadUserId(userID);
        video.setVideoDesc(videoDesc);
        video.setVideoPath(videoPath);
        video.setVideoTitle(videoTitle);
        video.setVideoUrl(videoUrl);
        resourceBiz.saveVideo(video);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改Video
     * @param request
     * @param videoTitle
     * @param videoDesc
     * @param videoUrl
     * @param videoPath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "video:update" )
    @RequestMapping(value = "/updateVideo", method = RequestMethod.POST)
    public String updateVideo(HttpServletRequest request,
                              @RequestParam(value = "id") Long id,
                              @RequestParam(value = "videoTitle",required = false) String videoTitle,
                              @RequestParam(value = "videoDesc",required = false) String videoDesc,
                              @RequestParam(value = "videoUrl",required = false) String videoUrl,
                              @RequestParam(value = "videoPath",required = false) String videoPath
    ){
        String userID = getCurrentUserId(request);
        Video video = new Video();
        video.setId(id);
        video.setLastModifyUserId(userID);
        video.setUploadTime(new Date());
        video.setUploadUserId(userID);
        video.setVideoDesc(videoDesc);
        video.setVideoPath(videoPath);
        video.setVideoTitle(videoTitle);
        video.setVideoUrl(videoUrl);
        resourceBiz.saveVideo(video);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除视频
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "video:delete" )
    @RequestMapping(value = "/delVideo", method = RequestMethod.GET)
    public String delVideo(HttpServletRequest request,
                            @RequestParam("id") Long id){
        resourceBiz.delVideo(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }

    /**
     * 获取视频列表
     * @param request
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "video:read" )
    @RequestMapping(value = "/videolist")
    public String videolist(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                             @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<Video> videos = resourceBiz.listVideo(pageObj);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("page",pageObj);
        result.put("list",videos);
        return ApiResponse.returnSuccess(result);
    }



}
