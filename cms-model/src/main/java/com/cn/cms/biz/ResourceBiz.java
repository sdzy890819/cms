package com.cn.cms.biz;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Images;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.po.Video;
import com.cn.cms.po.VideoBase;
import com.cn.cms.service.ResourceService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/30.
 */
@Component
public class ResourceBiz {

    @Resource
    private ResourceService resourceService;

    @Resource
    private JedisClient jedisClient;

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
        if(imagesBase.getId()!=null && imagesBase.getId()>0){
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
        if(images.getId()!=null && images.getId()>0){
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
        if(page.isQuery()){
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
        if(videoBase.getId()!=null && videoBase.getId()>0){
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
        if(video.getId()!=null && video.getId()>0){
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
        if(page.isQuery()){
            List<Video> videos = resourceService.queryVideoList(page);
            return videos;
        }
        return null;
    }

    public Images getImages(Long id){
        return resourceService.findImages(id);
    }

    public Images getImagesManage(Long id){
        return resourceService.findImagesManage(id);
    }

    public Images doGetImagesManage(Long id){
        return resourceService.doFindImagesManage(id);
    }

    public Video getVideo(Long id){
        return resourceService.findVideo(id);
    }

    public Video getVideoManage(Long id){
        return resourceService.findVideoManage(id);
    }

    public Video doGetVideoManage(Long id){
        return resourceService.doFindVideoManage(id);
    }


    /**
     * 获取附件列表
     * @param page
     * @return
     */
    public JSONArray findFileList(Page page){
        Long count = jedisClient.len(RedisKeyContants.REDIS_FILE_LIST);
        if( count > 0 ){
            page.setCount(count.intValue());
        }
        Set<String> set = jedisClient.zrevrange(RedisKeyContants.REDIS_FILE_LIST, page.getStart(), page.getEnd());
        if(set != null){
            Iterator<String> it = set.iterator();
            JSONArray jsonArray = new JSONArray();
            while (it.hasNext()){
                JSONObject jsonObject = JSONObject.parseObject(it.next());
                jsonArray.add(jsonObject);
            }
            return jsonArray;
        }
        return null;
    }

    public void setFileInfoToRedis(String url, String originFileName, String fileName){
        long time = System.currentTimeMillis()/1000;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("url", url);
        jsonObject.put("mtime", time);
        jsonObject.put("fileName", fileName);
        jsonObject.put("originFileName", originFileName);
        jedisClient.zadd(RedisKeyContants.REDIS_FILE_LIST, jsonObject.toJSONString(), time);
    }
}
