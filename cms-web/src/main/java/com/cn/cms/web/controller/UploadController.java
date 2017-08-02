package com.cn.cms.web.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.CompressEnum;
import com.cn.cms.enums.WatermarkEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.middleware.MSSVideoClient;
import com.cn.cms.middleware.WeedfsClient;
import com.cn.cms.middleware.bean.VideoFinishResponse;
import com.cn.cms.middleware.bean.VideoResponse;
import com.cn.cms.middleware.bean.WeedfsResponse;
import com.cn.cms.po.Images;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.po.Video;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.ann.NotSaveBody;
import com.cn.cms.web.result.ApiResponse;
import org.apache.commons.fileupload.FileUploadException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 16/11/30.
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






    @NotSaveBody
    //@CheckToken
    @RequestMapping(value="/controller", method = {RequestMethod.POST, RequestMethod.GET})
    public String controller(HttpServletRequest request,
                             @RequestParam(value = "action", required = false) String action,
                             @RequestParam(value = "upfile", required = false) MultipartFile upfile) throws Exception {
        if(StringUtils.isNotBlank(action) && StaticContants.mapping.containsKey(action)){
            int actionCode = StaticContants.mapping.get(action).intValue();
            switch (actionCode){
                case StaticContants.CONFIG:{
                    return config().toJSONString();
                }
                case StaticContants.UPLOAD_IMAGE:{
                    return JSONObject.toJSONString(uploadBaiduImage(request, upfile));
                }
                case StaticContants.LIST_IMAGE:{
                    String startStr = request.getParameter("start");
                    int start = 0;
                    if(StringUtils.isNotBlank(startStr)){
                        start = Integer.parseInt(startStr);
                    }
                    String sizeStr = request.getParameter("size");
                    int size = 0;
                    if(StringUtils.isNotBlank(sizeStr)){
                        size = Integer.parseInt(sizeStr);
                    }
                    int page = start / size + 1;
                    Page pageObj = new Page(page,size);
                    List<Images> images = resourceBiz.listImages(pageObj);
                    JSONObject jsonObject = new JSONObject();
                    if(StringUtils.isNotEmpty(images)){
                        JSONArray jsonArray = new JSONArray();
                        for(int i=0;i<images.size();i++){
                            Images tmp = images.get(i);
                            JSONObject jsonObject1 = new JSONObject();
                            jsonObject1.put("url", tmp.getImageUrl());
                            jsonObject1.put("state", "SUCCESS");
                            jsonArray.add(jsonObject1);
                        }
                        jsonObject.put("list", jsonArray);
                    }
                    jsonObject.put("start", start);
                    jsonObject.put("state", "SUCCESS");
                    jsonObject.put("total", pageObj.getCount());
                    return jsonObject.toJSONString();
                }
                case StaticContants.UPLOAD_VIDEO:{
                    return JSONObject.toJSONString(uploadBaiduVideo(request, upfile));
                }
                case StaticContants.UPLOAD_SCRAWL:{
                    String upfileCode = request.getParameter("upfileCode");
                    return JSONObject.toJSONString(uploadBaiduScrawl(upfileCode));
                }
                case StaticContants.UPLOAD_FILE:{
                    return JSONObject.toJSONString(uploadBaiduFile(request, upfile));
                }
                case StaticContants.LIST_FILE:{
                    String startStr = request.getParameter("start");
                    int start = 0;
                    if(StringUtils.isNotBlank(startStr)){
                        start = Integer.parseInt(startStr);
                    }
                    String sizeStr = request.getParameter("size");
                    int size = 0;
                    if(StringUtils.isNotBlank(sizeStr)){
                        size = Integer.parseInt(sizeStr);
                    }
                    int page = start / size + 1;
                    Page pageObj = new Page(page,size);
                    JSONArray jsonArray = resourceBiz.findFileList(pageObj);
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("list", jsonArray);
                    jsonObject.put("start", start);
                    jsonObject.put("state", "SUCCESS");
                    jsonObject.put("total", pageObj.getCount());
                    return jsonObject.toJSONString();
                }
                default:{
                    return ApiResponse.returnFail(StaticContants.ERROR_URL_ERROR);
                }
            }
        }else{
            return ApiResponse.returnFail();
        }

    }

    private JSONObject config(){
        return StaticContants.configObject;
    }

    /**
     * 上传并保存图片。
     * @param request
     * @return
     * @throws Exception
     */
    private Map<String ,Object> uploadBaiduImage(HttpServletRequest request, MultipartFile upfile) throws Exception{
            try {
                    ImagesBase imagesBase = resourceBiz.findImagesBase();
                    String originFileName = upfile.getOriginalFilename();

                    InputStream in = upfile.getInputStream();
                    byte[] bytes = new byte[in.available()];
                    in.read(bytes);
                    String suffix = originFileName.substring(originFileName.lastIndexOf(".") + 1).toLowerCase();
                    String relativePath = FileUtil.getRelativePath(imagesBase.getBasePath(), suffix);
                    String absPath = StringUtils.concatUrl(imagesBase.getBasePath(), relativePath);
                    String urlPath = StringUtils.concatUrl(imagesBase.getBaseUrl(), relativePath);
                    Map<String, Object> map = FileUtil.compress(bytes, 0, 0, absPath, WatermarkEnum.notwatermark.getType());

                    Images images = new Images();
                    images.setLastModifyUserId(getCurrentUserId(request));
                    images.setCompress(CompressEnum.nocompress.getType());
                    images.setImageHeightPixel(Integer.parseInt(map.get("imageHeightPixel").toString()));

                    images.setImageTitle(originFileName.substring(0, originFileName.length() - (suffix.length() + 1) ));

                    images.setImageWidthPixel(Integer.parseInt(map.get("imageHeightPixel").toString()));
                    images.setUploadUserId(getCurrentUserId(request));
                    images.setCreateUserId(getCurrentUserId(request));
                    images.setOrgHeightPixel(Integer.parseInt(map.get("imageHeightPixel").toString()));
                    images.setOrgWidthPixel(Integer.parseInt(map.get("imageHeightPixel").toString()));
                    images.setWatermark(WatermarkEnum.notwatermark.getType());
                    images.setImagesClassifyId(10000L);
                    images.setUploadTime(new Date());

                    if(StaticContants.IMAGESON != 1 ) {
                        File file = new File(absPath);
                        WeedfsResponse weedfsResponse = weedfsClient.upload(file);
                        map.put("url", weedfsResponse.getFileUrl());
                        map.put("type", "." + suffix);
                        map.put("original", originFileName);
                        map.put("size", weedfsResponse.getSize());
                        file.delete();
                        images.setSize(weedfsResponse.getSize());
                        images.setFid(weedfsResponse.getFid());
                        images.setImagePath(weedfsResponse.getFid());
                        images.setImageUrl(weedfsResponse.getFileUrl());
                    } else {
                        map.put("url", urlPath);
                        map.put("type", "." + suffix);
                        map.put("original", originFileName);
                        map.put("size", bytes.length);
                        images.setSize(bytes.length);
                        images.setFid("19");
                        images.setImagePath(relativePath);
                        images.setImageUrl(urlPath);
                    }
                    resourceBiz.saveImages(images);
                    map.put("uploadUserId", getCurrentUserId(request));
                    map.put("title", relativePath.substring(relativePath.lastIndexOf("/")));
                    map.put("state", "SUCCESS");
                    return map;

            } catch (FileUploadException var14) {
                throw new BizException("解析上传表单错误");
            } catch (IOException var15) {
                throw new BizException("IO错误");
            }

    }

    /**
     * 百度上传附件。
     * @param request
     * @return
     * @throws Exception
     */
    private Map<String ,Object> uploadBaiduFile(HttpServletRequest request, MultipartFile upfile) throws Exception{

            try {
                    ImagesBase imagesBase = resourceBiz.findImagesBase();
                    String originFileName = upfile.getOriginalFilename();
                    InputStream in = upfile.getInputStream();
                    byte[] bytes = new byte[in.available()];
                    in.read(bytes);
                    String suffix = originFileName.substring(originFileName.lastIndexOf(".") + 1).toLowerCase();
                    String relativePath = FileUtil.getRelativePath(imagesBase.getBasePath(), suffix);
                    String absPath = StringUtils.concatUrl(imagesBase.getBasePath(), relativePath);
                    String urlPath = StringUtils.concatUrl(imagesBase.getBaseUrl(), relativePath);
                    Map<String, Object> map = new HashMap<>();
                    FileUtil.fileUpload(bytes, absPath);
                    if(StaticContants.IMAGESON != 1 ) {
                        File file = new File(absPath);
                        WeedfsResponse weedfsResponse = weedfsClient.upload(file);
                        map.put("url", weedfsResponse.getFileUrl());
                        map.put("type", "." + suffix);
                        map.put("original", originFileName);
                        map.put("size", weedfsResponse.getSize());
                        resourceBiz.setFileInfoToRedis(weedfsResponse.getFileUrl(), originFileName, relativePath.substring(relativePath.lastIndexOf("/")));
                        file.delete();
                    } else {
                        map.put("url", urlPath);
                        map.put("type", "." + suffix);
                        map.put("original", originFileName);
                        map.put("size", bytes.length);
                        resourceBiz.setFileInfoToRedis(urlPath, originFileName, relativePath.substring(relativePath.lastIndexOf("/")));
                    }
                    map.put("uploadUserId", getCurrentUserId(request));
                    map.put("title", relativePath.substring(relativePath.lastIndexOf("/")));
                    map.put("state", "SUCCESS");
                    return map;

            } catch (FileUploadException var14) {
                throw new BizException("解析上传表单错误");
            } catch (IOException var15) {
                throw new BizException("IO错误");
            }

    }


    /**
     * 百度上传视频并保存视频.
     * @param request
     * @return
     * @throws Exception
     */
    private Map<String ,Object> uploadBaiduVideo(HttpServletRequest request, MultipartFile upfile) throws Exception{
            try {

                    Map<String, Object> map = new HashMap<>();
                    String originFileName = upfile.getOriginalFilename();

                    String fileName = originFileName.replaceAll(" ","_");
                    String suffix = originFileName.substring(originFileName.lastIndexOf(".") + 1).toLowerCase();
                    InputStream in = upfile.getInputStream();
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
                            log.info("APP 视频上传到第三方" + i + " - " + finish);
                            videoResponse = mssVideoClient.upload(EncryptUtil.base64(bytes).replaceAll("\\r|\\n", ""), fileName, i, finish);
                            if (videoResponse == null) {
                                throw new BizException("视频上传失败.");
                            }
                            if (videoResponse.getFlag() != 100) {
                                throw new BizException(videoResponse.getFlagString());
                            }
                        }
                    }else{
                        throw new BizException("视频的size:0B.");
                    }
                    Video video = new Video();
                    video.setLastModifyUserId(getCurrentUserId(request));
                    video.setCreateUserId(getCurrentUserId(request));
                    video.setUploadTime(new Date());
                    video.setUploadUserId(getCurrentUserId(request));
                    video.setVideoDesc("");
                    video.setVideoPath(((VideoFinishResponse)videoResponse).getLocation());
                    video.setVideoTitle(fileName.substring(0, fileName.length() - (suffix.length() + 1) ));
                    video.setVideoUrl(((VideoFinishResponse)videoResponse).getLocation());
                    video.setFileName(fileName);
                    video.setVideoClassifyId(StaticContants.VIDEO_DEFAULT_CLASSIFY_ID);
                    resourceBiz.saveVideo(video);

                    map.put("url", ((VideoFinishResponse)videoResponse).getLocation());
                    map.put("type", "." + suffix);
                    map.put("original", originFileName);
                    map.put("size", bytes.length);
                    map.put("title", fileName);
                    map.put("state", "SUCCESS");
                    return map;

            }  catch (IOException var15) {
                throw new BizException("IO错误");
            }
    }



    private Map<String, Object> uploadBaiduScrawl(String baseCode) throws Exception {
        String suffix = "jpg";
        String[] baseCodes = baseCode.split(",");
        if(baseCodes.length>1){
            baseCode = baseCodes[1];
        }
        byte[] bytes = FileUtil.base64Upload(baseCode);
        ImagesBase imagesBase = resourceBiz.findImagesBase();
        String relativePath = FileUtil.getRelativePath(imagesBase.getBasePath(), suffix);
        String absPath = StringUtils.concatUrl(imagesBase.getBasePath(), relativePath);
        String urlPath = StringUtils.concatUrl(imagesBase.getBaseUrl(), relativePath);
        Map<String, Object> map = FileUtil.compress(bytes, 0, 0, absPath, WatermarkEnum.notwatermark.getType());
        if(StaticContants.IMAGESON != 1 ) {
            File file = new File(absPath);
            WeedfsResponse weedfsResponse = weedfsClient.upload(file);
            map.put("url", weedfsResponse.getFileUrl());
            map.put("type", "." + suffix);
            map.put("original", "");
            map.put("size", weedfsResponse.getSize());
            file.delete();
        } else {
            map.put("url", urlPath);
            map.put("type", "." + suffix);
            map.put("original", "");
            map.put("size", bytes.length);
        }
        map.put("title", relativePath.substring(relativePath.lastIndexOf("/")));
        map.put("state", "SUCCESS");
        return map;
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
