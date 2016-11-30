package com.cn.cms.web.controller;

import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhangyang on 16/11/30.
 */
@Controller
@RequestMapping(value="/images/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class ImagesController extends BaseController{

    @Resource
    private ResourceBiz resourceBiz;

    /**
     * 图片基础信息查询
     * @return
     */
    @CheckToken
    @CheckAuth( name = "imagesbase:read" )
    @RequestMapping(value = "/imagesBase")
    public String imagesBase(){
        ImagesBase imagesBase = resourceBiz.findImagesBase();
        return ApiResponse.returnSuccess(imagesBase);
    }

    @CheckToken
    @CheckAuth( name = "imagesbase:update" )
    @RequestMapping(value = "/updateImagesBase", method = RequestMethod.POST)
    public String updateImagesBase(HttpServletRequest request
                                   ){
        ImagesBase imagesBase = resourceBiz.findImagesBase();
        return ApiResponse.returnSuccess(imagesBase);
    }


}
