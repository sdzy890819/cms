package com.cn.cms.biz;

import com.cn.cms.po.Images;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.po.Video;
import com.cn.cms.po.VideoBase;
import com.cn.cms.service.ResourceService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/30.
 */
@Component
public class ResourceBiz {

    @Resource
    private ResourceService resourceService;


    /**
     * 获取ImagesBase信息。
     * @return
     */
    public ImagesBase findImagesBase(){
        return resourceService.findImagesBase();
    }

    /**
     * 保存ImagesBase
     * @param imagesBase
     */
    public void saveImagesBase(ImagesBase imagesBase){
        if(imagesBase.getId()>0){
            resourceService.updateImagesBase(imagesBase);
        }else{
            resourceService.saveImagesBase(imagesBase);
        }
    }

    /**
     * 保存Images
     * @param images
     */
    public void saveImages(Images images){
        if(images.getId()>0){
            resourceService.updateImages(images);
        }else{
            resourceService.saveImages(images);
        }
    }

    /**
     * 删除图片,但是不删除图片实体。
     * @param lastModifyUserId
     * @param id
     */
    public void delImages(String lastModifyUserId, Long id){
        resourceService.delImages(lastModifyUserId, id);
    }


    /**
     * 根据page获取
     * @param page
     * @return
     */
    public List<Images> listImages(Page page){
        Integer count = resourceService.queryImagesCount();
        page.setCount(count);
        if(count > 0 && page.getPage() <= page.getPageCount()){
            List<Images> images = resourceService.queryImagesList(page);
            return images;
        }
        return null;
    }

    /**
     * 查询视频基础信息
     * @return
     */
    public VideoBase findVideoBase(){
        return resourceService.findVideoBase();
    }

    /**
     * 保存视频基础信息
     * @param videoBase
     */
    public void saveVideoBase(VideoBase videoBase){
        if(videoBase.getId()>0){
            resourceService.updateVideoBase(videoBase);
        }else{
            resourceService.saveVideoBase(videoBase);
        }
    }

    /**
     * 保存视频
     * @param video
     */
    public void saveVideo(Video video){
        if(video.getId()>0){
            resourceService.updateVideo(video);
        }else {
            resourceService.saveVideo(video);
        }
    }

    /**
     * 删除视频
     * @param lastModifyUserId
     * @param id
     */
    public void delVideo(String lastModifyUserId, Long id){
        resourceService.delVideo(lastModifyUserId, id);
    }

    /**
     * 查询视频列表
     * @param page
     * @return
     */
    public List<Video> listVideo(Page page){
        Integer count = resourceService.queryVideoCount();
        page.setCount(count);
        if(count > 0 && page.getPage() <= page.getPageCount()){
            List<Video> videos = resourceService.queryVideoList(page);
            return videos;
        }
        return null;
    }
}
