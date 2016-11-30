package com.cn.cms.web.controller;

import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.enums.CompressEnum;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by zhangyang on 16/11/30.
 */
@Controller
@RequestMapping(value="/upload/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class UploadController extends BaseController {

    @Resource
    private ResourceBiz resourceBiz;

    /**
     *
     * @param baseCode Base64
     * @param suffix 文件后缀png|jpg
     * @param watermark 是否水印
     * @param width 长度
     * @param height 高度
     * @return
     */
    @CheckToken
    @RequestMapping(value="/uploadImage",method = RequestMethod.POST)
    public String upload(HttpServletRequest request,
                         @RequestPart(value = "baseCode") String baseCode,
                         @RequestPart(value = "suffix") String suffix,
                         @RequestPart(value = "watermark") Integer watermark,
                         @RequestPart(value = "width") Integer width,
                         @RequestPart(value = "height") Integer height){

        byte[] bytes = FileUtil.base64Upload(baseCode);
        ImagesBase imagesBase = resourceBiz.findImagesBase();
        String relativePath = FileUtil.getRelativePath(imagesBase.getBasePath(), suffix);
        String absPath = StringUtils.concatUrl(imagesBase.getBasePath(), relativePath);
        String urlPath = StringUtils.concatUrl(imagesBase.getBaseUrl(), relativePath);
        Map<String, Object> map = FileUtil.compressAndWatermark(bytes, width, height, absPath, watermark);
        map.put("imageUrl", urlPath);
        map.put("imagePath", relativePath);
        map.put("uploadUserId", getCurrentUserId(request));
        map.put("watermark", watermark);
        map.put("compress", (width>0 || height>0)? CompressEnum.compress.getType() : CompressEnum.nocompress.getType());
        return ApiResponse.returnSuccess(map);
    }




}
