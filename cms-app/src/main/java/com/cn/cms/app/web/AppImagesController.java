package com.cn.cms.app.web;

import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.enums.PlatformEnum;
import com.cn.cms.po.Images;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAppToken;
import com.cn.cms.web.ann.CheckAppAuth;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/2/8.
 */
@RestController
@RequestMapping(value="/app/images/",produces = "application/json; charset=UTF-8")
public class AppImagesController extends AppBaseController {

    @Resource
    private ResourceBiz resourceBiz;

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
    @CheckAppToken
    @CheckAppAuth( name = "appimages:write" )
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
                               @RequestParam("size") Integer size){
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
        images.setPlatform(PlatformEnum.APP.getType());
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
    @CheckAppToken
    @CheckAppAuth( name = "appimages:update" )
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
                               @RequestParam(value = "size",required = false) Integer size){
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
        images.setPlatform(PlatformEnum.APP.getType());
        resourceBiz.saveImages(images);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除图片
     * @param request
     * @param id
     * @return
     */
    @CheckAppToken
    @CheckAppAuth( name = "appimages:delete" )
    @RequestMapping(value = "/delImages", method = RequestMethod.GET)
    public String delImages(HttpServletRequest request,
                            @RequestParam("id") Long id) throws Exception{
        Images images = resourceBiz.getImages(id);
        if(images!=null) {
            resourceBiz.delImages(getCurrentUserId(request), id);
            //weedfsClient.delete(images.getFid());
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
    @CheckAppToken
    @CheckAppAuth( name = "appimages:read" )
    @RequestMapping(value = "/imageslist")
    public String imageslist(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                             @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<Images> images = resourceBiz.listImages(pageObj);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("page",pageObj);
        result.put("list",images);
        return ApiResponse.returnSuccess(result);
    }

    @CheckAppToken
    @CheckAppAuth( name = "appimages:read" )
    @RequestMapping(value = "/detail/{id}")
    public String imageslist(@PathVariable("id") Long id){
        Images images = resourceBiz.getImages(id);
        return ApiResponse.returnSuccess(images);
    }

}
