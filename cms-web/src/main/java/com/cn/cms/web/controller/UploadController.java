package com.cn.cms.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.CompressEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.middleware.MSSVideoClient;
import com.cn.cms.middleware.WeedfsClient;
import com.cn.cms.middleware.bean.VideoResponse;
import com.cn.cms.middleware.bean.WeedfsResponse;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.ann.NotSaveBody;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Map;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/30.
 */
@Controller
@RequestMapping(value="/webapi/upload/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class UploadController extends BaseController {

    @Resource
    private ResourceBiz resourceBiz;

    @Resource
    private WeedfsClient weedfsClient;

    private int size = 6*1024*1024;

    @Resource
    private MSSVideoClient mssVideoClient;

    /**
     *
     * @param baseCode Base64
     * @param suffix 文件后缀png|jpg
     * @param watermark 是否水印
     * @param width 长度
     * @param height 高度
     * @return
     */
    @NotSaveBody
    @CheckToken
    @CheckAuth( name = "images:upload" )
    @RequestMapping(value="/uploadImage",method = RequestMethod.POST)
    public String upload(HttpServletRequest request,
                         @RequestParam(value = "baseCode") String baseCode,
                         @RequestParam(value = "suffix") String suffix,
                         @RequestParam(value = "watermark", defaultValue = "0") Integer watermark,
                         @RequestParam(value = "width", defaultValue = "0") Integer width,
                         @RequestParam(value = "height", defaultValue = "0") Integer height) throws Exception{


        String[] baseCodes = baseCode.split(",");
        if(baseCodes.length>1){
            baseCode = baseCodes[1];
        }
        byte[] bytes = FileUtil.base64Upload(baseCode);
        ImagesBase imagesBase = resourceBiz.findImagesBase();
        String relativePath = FileUtil.getRelativePath(imagesBase.getBasePath(), suffix);
        String absPath = StringUtils.concatUrl(imagesBase.getBasePath(), relativePath);
        String urlPath = StringUtils.concatUrl(imagesBase.getBaseUrl(), relativePath);
        Map<String, Object> map = FileUtil.compress(bytes, width, height, absPath, watermark);
        if(StaticContants.IMAGESON != 1 ) {
            File file = new File(absPath);
            WeedfsResponse weedfsResponse = weedfsClient.upload(file);
            map.put("imageUrl", weedfsResponse.getFileUrl());
            map.put("imagePath", weedfsResponse.getFid());
            map.put("fid", weedfsResponse.getFid());
            map.put("size", weedfsResponse.getSize());
            file.delete();
        } else {
            map.put("imageUrl", urlPath);
            map.put("imagePath", relativePath);
            map.put("fid", "19,1011212");
            map.put("size", "100");
        }
        map.put("uploadUserId", getCurrentUserId(request));
        map.put("watermark", watermark);
        map.put("compress", (width>0 || height>0)? CompressEnum.compress.getType() : CompressEnum.nocompress.getType());
        return ApiResponse.returnSuccess(map);
    }


    @NotSaveBody
    @CheckToken
    @CheckAuth( name = "video:upload" )
    @RequestMapping(value="/uploadVideo",method = RequestMethod.POST)
    public String upload(HttpServletRequest request,
                         @RequestParam(value = "baseCode") String baseCode,
                         @RequestParam(value = "fileName") String fileName) throws BizException, IOException {
        String[] baseCodes = baseCode.split(",");
        if(baseCodes.length>1){
            baseCode = baseCodes[1];
        }
        byte[] bytes = FileUtil.base64Upload(baseCode);
        ByteArrayInputStream in = new ByteArrayInputStream(bytes);
        return uploadVideo(in, fileName.replaceAll(" ","_"));
    }

    @NotSaveBody
    @CheckToken
    @CheckAuth( name = "video:upload" )
    @RequestMapping(value="/uploadVideo2",method = RequestMethod.POST)
    public String uploadVideo2(@RequestParam(value = "file", required = false) MultipartFile file) throws IOException, BizException {
        String fileName = file.getOriginalFilename().replaceAll(" ","_");
        InputStream in = file.getInputStream();
        return uploadVideo(in , fileName);
    }


    public String uploadVideo(InputStream in ,String fileName) throws IOException, BizException {
        int length = (in.available()-1)/size + 1;
        byte[] bytes = null ;
        int finish = 0;
        VideoResponse videoResponse = null;
        if(in.available() > 0 ) {
            for (int i = 1; i <= length; i++) {
                if (length > i) {
                    bytes = new byte[size];
                } else {
                    bytes = new byte[in.available()];
                    finish = 1;
                }
                in.read(bytes, 0, bytes.length);

                videoResponse = mssVideoClient.upload(EncryptUtil.base64(bytes).replaceAll("\\r|\\n", ""), fileName, i, finish);
                if (videoResponse == null) {
                    return ApiResponse.returnFail(StaticContants.ERROR_VIDEO);
                }
                if (videoResponse.getFlag() != 100) {
                    return ApiResponse.returnFail(videoResponse.getFlagString(), videoResponse);
                }
            }
        }else{
            return ApiResponse.returnFail(StaticContants.ERROR_VIDEO_SIZE_0);
        }
        return ApiResponse.returnSuccess(videoResponse);
    }




    /**
     * 取消视频上传
     * @param fileName
     * @return
     * @throws IOException
     * @throws BizException
     */
    @NotSaveBody
    @CheckToken
    @CheckAuth( name = "video:upload" )
    @RequestMapping(value="/cancelVideo",method = RequestMethod.POST)
    public String cancel(@RequestParam(value = "fileName", required = false) String fileName) throws IOException, BizException {
        mssVideoClient.interrupt(fileName);
        return ApiResponse.returnSuccess();
    }


    public static void main(String[] args) throws IOException, BizException {
        MSSVideoClient m = new MSSVideoClient();
        File file = new File("/Users/zhangyang/Downloads/平凡之路 钢琴独奏 成人自学_标清.mp4");
        FileInputStream inputStream = new FileInputStream(file);
        UploadController uploadController = new UploadController();
        uploadController.mssVideoClient = m;
        System.out.println("平凡之路 钢琴独奏 成人自学_标清.mp4".replaceAll(" ","_"));
        System.out.println(uploadController.uploadVideo(inputStream, "平凡之路_钢琴独奏_成人自学_标清.mp4"));


    }

}
