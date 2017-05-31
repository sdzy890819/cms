package com.cn.cms.app.web;

import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.enums.PlatformEnum;
import com.cn.cms.po.Video;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAppAuth;
import com.cn.cms.web.ann.CheckAppToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 17/2/8.
 */
@RestController
@RequestMapping(value="/app/video/",produces = "application/json; charset=UTF-8")
public class AppVideoController extends AppBaseController {

    @Resource
    private ResourceBiz resourceBiz;

    /**
     * 创建Video
     * @param request
     * @param videoTitle
     * @param videoDesc
     * @param videoUrl
     * @param videoPath
     * @return
     */
    @CheckAppToken
    @CheckAppAuth( name = "appvideo:write" )
    @RequestMapping(value = "/createVideo", method = RequestMethod.POST)
    public String createVideo(HttpServletRequest request,
                              @RequestParam(value = "videoTitle") String videoTitle,
                              @RequestParam(value = "videoDesc") String videoDesc,
                              @RequestParam(value = "videoUrl") String videoUrl,
                              @RequestParam(value = "videoPath", required = false) String videoPath,
                              @RequestParam(value = "fileName",required = false) String fileName
    ){
        String userID = getCurrentUserId(request);
        Video video = new Video();
        video.setLastModifyUserId(userID);
        video.setCreateUserId(userID);
        video.setUploadTime(new Date());
        video.setUploadUserId(userID);
        video.setVideoDesc(videoDesc);
        video.setVideoPath(videoPath);
        video.setVideoTitle(videoTitle);
        video.setVideoUrl(videoUrl);
        video.setFileName(fileName);
        video.setPlatform(PlatformEnum.APP.getType());
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
    @CheckAppToken
    @CheckAppAuth( name = "appvideo:update" )
    @RequestMapping(value = "/updateVideo", method = RequestMethod.POST)
    public String updateVideo(HttpServletRequest request,
                              @RequestParam(value = "id") Long id,
                              @RequestParam(value = "videoTitle",required = false) String videoTitle,
                              @RequestParam(value = "videoDesc",required = false) String videoDesc,
                              @RequestParam(value = "videoUrl",required = false) String videoUrl,
                              @RequestParam(value = "videoPath",required = false) String videoPath,
                              @RequestParam(value = "fileName",required = false) String fileName
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
        video.setFileName(fileName);
        video.setPlatform(PlatformEnum.APP.getType());
        resourceBiz.saveVideo(video);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除视频
     * @param request
     * @param id
     * @return
     */
    @CheckAppToken
    @CheckAppAuth( name = "appvideo:delete" )
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
    @CheckAppToken
    @CheckAppAuth( name = "appvideo:read" )
    @RequestMapping(value = "/videolist")
    public String videolist(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                            @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<Video> videos = resourceBiz.listVideo(pageObj);
        Map<String, Object> result = new HashMap<>();
        result.put("page",pageObj);
        result.put("list",videos);
        return ApiResponse.returnSuccess(result);
    }

    @CheckAppToken
    @CheckAppAuth( name = "appvideo:read" )
    @RequestMapping(value = "/detail/{id}")
    public String videolist(@PathVariable("id") Long id){
        Video video = resourceBiz.getVideo(id);
        return ApiResponse.returnSuccess(video);
    }

}
