package com.cn.cms.web.controller;

import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.exception.BizException;
import com.cn.cms.middleware.WeedfsClient;
import com.cn.cms.po.Images;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.po.ImagesClassify;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 16/11/30.
 */
@Controller
@RequestMapping(value="/webapi/images/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class ImagesController extends BaseController{

    @Resource
    private ResourceBiz resourceBiz;

    @Resource
    private WeedfsClient weedfsClient;

    @Resource
    private UserBiz userBiz;

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

    /**
     * 修改图片基础信息
     * @param request
     * @param id
     * @param baseUrl
     * @param basePath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "imagesbase:update" )
    @RequestMapping(value = "/updateImagesBase", method = RequestMethod.POST)
    public String updateImagesBase(HttpServletRequest request,
                                   @RequestParam("id") Long id,
                                   @RequestParam(value = "baseUrl",required = false) String baseUrl,
                                   @RequestParam(value = "basePath",required = false) String basePath){
        ImagesBase imagesBase = new ImagesBase();
        imagesBase.setLastModifyUserId(getCurrentUserId(request));
        imagesBase.setBasePath(FileUtil.addSuffix(basePath));
        imagesBase.setBaseUrl(FileUtil.addSuffix(baseUrl));
        imagesBase.setId(id);
        resourceBiz.saveImagesBase(imagesBase);
        return ApiResponse.returnSuccess();
    }

    /**
     * 创建图片基础信息
     * @param request
     * @param baseUrl
     * @param basePath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "imagesbase:write" )
    @RequestMapping(value = "/createImagesBase", method = RequestMethod.POST)
    public String createImagesBase(HttpServletRequest request,
                                   @RequestParam("baseUrl") String baseUrl,
                                   @RequestParam("basePath") String basePath){
        ImagesBase imagesBase = new ImagesBase();
        imagesBase.setLastModifyUserId(getCurrentUserId(request));
        imagesBase.setCreateUserId(getCurrentUserId(request));
        imagesBase.setBasePath(basePath);
        imagesBase.setBaseUrl(baseUrl);
        resourceBiz.saveImagesBase(imagesBase);
        return ApiResponse.returnSuccess();
    }

    /**
     * 上传图片保存。
     * @param request
     * @param imageUrl
     * @param imageWidthPixel
     * @param imageHeightPixel
     * @param orgWidthPixel
     * @param orgHeightPixel
     * @param imageTitle
     * @param imagePath
     * @param watermark
     * @param compress
     * @return
     */
    @CheckToken
    @CheckAuth( name = "images:write" )
    @RequestMapping(value = "/createImages", method = RequestMethod.POST)
    public String createImages(HttpServletRequest request,
                               @RequestParam("imageUrl") String imageUrl,
                               @RequestParam("imageWidthPixel") Integer imageWidthPixel,
                               @RequestParam("imageHeightPixel") Integer imageHeightPixel,
                               @RequestParam("orgWidthPixel") Integer orgWidthPixel,
                               @RequestParam("orgHeightPixel") Integer orgHeightPixel,
                               @RequestParam("imageTitle") String imageTitle,
                               @RequestParam("imagePath") String imagePath,
                               @RequestParam("watermark") Integer watermark,
                               @RequestParam("compress") Integer compress,
                               @RequestParam("fid") String fid,
                               @RequestParam("size") Integer size,
                               @RequestParam(value = "keyword", required = false) String keyword,
                               @RequestParam("imagesClassifyId") Long imagesClassifyId){
        if(StringUtils.isNotBlank(keyword)){
            keyword = keyword.replaceAll("[\\s，,]+", ",");
        }
        Images images = new Images();
        images.setLastModifyUserId(getCurrentUserId(request));
        images.setCompress(compress);
        images.setImageHeightPixel(imageHeightPixel);
        images.setImagePath(imagePath);
        images.setImageTitle(imageTitle);
        images.setImageUrl(imageUrl);
        images.setImageWidthPixel(imageWidthPixel);
        images.setUploadUserId(getCurrentUserId(request));
        images.setCreateUserId(getCurrentUserId(request));
        images.setOrgHeightPixel(orgHeightPixel);
        images.setOrgWidthPixel(orgWidthPixel);
        images.setWatermark(watermark);
        images.setUploadTime(new Date());
        images.setSize(size);
        images.setFid(fid);
        images.setImagesClassifyId(imagesClassifyId);
        images.setKeyword(keyword);
        resourceBiz.saveImages(images);
        return ApiResponse.returnSuccess();
    }

    /**
     * 上传图片修改。
     * @param request
     * @param imageUrl
     * @param imageWidthPixel
     * @param imageHeightPixel
     * @param orgWidthPixel
     * @param orgHeightPixel
     * @param imageTitle
     * @param imagePath
     * @param watermark
     * @param compress
     * @return
     */
    @CheckToken
    @CheckAuth( name = "images:update" )
    @RequestMapping(value = "/updateImages", method = RequestMethod.POST)
    public String updateImages(HttpServletRequest request,
                               @RequestParam("id") Long id,
                               @RequestParam(value = "imageUrl",required = false) String imageUrl,
                               @RequestParam(value = "imageWidthPixel",required = false) Integer imageWidthPixel,
                               @RequestParam(value = "imageHeightPixel",required = false) Integer imageHeightPixel,
                               @RequestParam(value = "orgWidthPixel",required = false) Integer orgWidthPixel,
                               @RequestParam(value = "orgHeightPixel",required = false) Integer orgHeightPixel,
                               @RequestParam(value = "imageTitle",required = false) String imageTitle,
                               @RequestParam(value = "imagePath",required = false) String imagePath,
                               @RequestParam(value = "watermark",required = false) Integer watermark,
                               @RequestParam(value = "compress",required = false) Integer compress,
                               @RequestParam(value = "fid",required = false) String fid,
                               @RequestParam(value = "size",required = false) Integer size,
                               @RequestParam(value = "keyword", required = false) String keyword,
                               @RequestParam(value = "imagesClassifyId", required = false) Long imagesClassifyId){
        if(StringUtils.isNotBlank(keyword)){
            keyword = keyword.replaceAll("[\\s，,]+", ",");
        }
        Images images = new Images();
        images.setLastModifyUserId(getCurrentUserId(request));
        images.setCompress(compress);
        images.setImageHeightPixel(imageHeightPixel);
        images.setImagePath(imagePath);
        images.setImageTitle(imageTitle);
        images.setImageUrl(imageUrl);
        images.setImageWidthPixel(imageWidthPixel);
        images.setUploadUserId(getCurrentUserId(request));
        images.setOrgHeightPixel(orgHeightPixel);
        images.setOrgWidthPixel(orgWidthPixel);
        images.setWatermark(watermark);
        images.setUploadTime(new Date());
        images.setSize(size);
        images.setFid(fid);
        images.setId(id);
        images.setImagesClassifyId(imagesClassifyId);
        images.setKeyword(keyword);
        resourceBiz.saveImages(images);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除图片
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "images:delete" )
    @RequestMapping(value = "/delImages", method = RequestMethod.GET)
    public String delImages(HttpServletRequest request,
                            @RequestParam("id") Long id,
                            @RequestParam(value = "force", required = false, defaultValue = "0") Integer force) throws Exception{
        Images images = resourceBiz.getImages(id);
        if(images != null) {
            if(force == 1) {
                if(StaticContants.IMAGESON != 1){

                    weedfsClient.delete(images.getFid());

                } else {
                    ImagesBase imagesBase = resourceBiz.findImagesBase();
                    String filePath = StringUtils.concatUrl(imagesBase.getBasePath(), images.getImagePath());
                    File file = new File(filePath);
                    if (file.exists()) {
                        file.delete();
                    }
                }

            }
            resourceBiz.delImages(getCurrentUserId(request), id);
        }
        return ApiResponse.returnSuccess();
    }

    /**
     * 获取图片列表
     * @param request
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "images:read" )
    @RequestMapping(value = "/imageslist")
    public String imageslist(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                           @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<Images> images = resourceBiz.listImages(pageObj);
        userBiz.dataInitBase(images);
        Map<String, Object> result = new HashMap<>();
        result.put("page",pageObj);
        result.put("list",images);
        return ApiResponse.returnSuccess(result);
    }


    /**
     * 图片分类列表
     * @param request
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "imagesclassify:read" )
    @RequestMapping(value = "/imagesclassifylist")
    public String imagesclassifylist(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                             @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<ImagesClassify> imagesClassifyList = resourceBiz.listImagesClassify(pageObj);
        userBiz.dataInitBase(imagesClassifyList);
        Map<String, Object> result = new HashMap<>();
        result.put("page",pageObj);
        result.put("list",imagesClassifyList);
        return ApiResponse.returnSuccess(result);
    }

    /**
     * 获取图片分类。所有
     * @return
     */
    @CheckToken
    @CheckAuth( name = "images:read" )
    @RequestMapping(value = "/imagesclassifyalllist")
    public String imagesclassifyalllist(){
        List<ImagesClassify> imagesClassifyList = resourceBiz.findAllImagesClassify();
        return ApiResponse.returnSuccess(imagesClassifyList);
    }


    /**
     * 图片分类详情
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "imagesclassify:read" )
    @RequestMapping(value = "/imagesclassify")
    public String imagesclassify(@RequestParam(value = "id") Long id){
        ImagesClassify classify = resourceBiz.getImagesClassify(id);
        return ApiResponse.returnSuccess(classify);
    }


    /**
     * 创建图片分类
     * @param request
     * @param classifyName
     * @return
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "imagesclassify:write" )
    @RequestMapping(value = "/createImagesClassify", method = RequestMethod.POST)
    public String createImagesClassify(HttpServletRequest request,
                                      @RequestParam(value = "classifyName") String classifyName) throws BizException {

        String userID = getCurrentUserId(request);
        ImagesClassify classify = new ImagesClassify();
        classify.setLastModifyUserId(userID);
        classify.setClassifyName(classifyName);
        classify.setCreateUserId(userID);
        resourceBiz.saveImagesClassify(classify);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改图片分类
     * @param request
     * @param classifyName
     * @param id
     * @return
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "imagesclassify:update" )
    @RequestMapping(value = "/updateImagesClassify", method = RequestMethod.POST)
    public String updateImagesClassify(HttpServletRequest request,
                                       @RequestParam(value = "classifyName") String classifyName,
                                       @RequestParam(value = "id") Long id) throws BizException {

        String userID = getCurrentUserId(request);
        ImagesClassify classify = new ImagesClassify();
        classify.setLastModifyUserId(userID);
        classify.setClassifyName(classifyName);
        classify.setId(id);
        resourceBiz.saveImagesClassify(classify);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除
     * @param request
     * @param id
     * @return
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "imagesclassify:delete" )
    @RequestMapping(value = "/delImagesClassify")
    public String delImagesClassify(HttpServletRequest request,
                                   @RequestParam(value = "id") Long id) throws BizException{
        resourceBiz.delImagesClassify(getCurrentUserId(request),id);
        return ApiResponse.returnSuccess();
    }



}
