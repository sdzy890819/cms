package com.cn.cms.biz;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.job.IndexThread;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.middleware.MSSVideoClient;
import com.cn.cms.middleware.bean.VideoInfo;
import com.cn.cms.po.*;
import com.cn.cms.service.ResourceService;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Created by ADMIN on 16/11/30.
 */
@Component
public class ResourceBiz {

    @Resource
    private ResourceService resourceService;

    @Resource
    private JedisClient jedisClient;

    @Resource
    private MSSVideoClient mssVideoClient;

    @Resource(name = "threadTaskExecutor")
    private ThreadPoolTaskExecutor threadTaskExecutor;

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
            sendIndex(images, ESSearchTypeEnum.images);
        }else{
            resourceService.saveImages(images);
            sendIndex(images, ESSearchTypeEnum.images);
        }
    }

    /**
     * 删除图片,但是不删除图片实体。
     * @param lastModifyUserId
     * @param id
     */
    public void delImages(String lastModifyUserId, Long id){
        resourceService.delImages(lastModifyUserId, id);
        delIndex(id, ESSearchTypeEnum.images);
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
    public void saveVideo(Video video) throws BizException {

        if(video.getId()!=null && video.getId()>0){
            Video oldVideo = this.getVideo(video.getId());
            if(StringUtils.isNotBlank(video.getVideoUrl()) &&
                    (!video.getVideoUrl().equals(oldVideo.getVideoUrl())
                            || StringUtils.isBlank(oldVideo.getM3u8Url()))) {
                VideoInfo videoInfo = mssVideoClient.get(video.getVideoUrl());
                if (videoInfo != null) {
                    video.setM3u8Url(videoInfo.getAdaptive());
                }
            }
            resourceService.updateVideo(video);
            sendIndex(video, ESSearchTypeEnum.video);
        }else {
            if(StringUtils.isNotBlank(video.getVideoUrl())) {
                VideoInfo videoInfo = mssVideoClient.get(video.getVideoUrl());
                if (videoInfo != null) {
                    video.setM3u8Url(videoInfo.getAdaptive());
                }
            }
            resourceService.saveVideo(video);
            sendIndex(video, ESSearchTypeEnum.video);
        }
    }

    /**
     * 删除视频
     * @param lastModifyUserId
     * @param id
     */
    public void delVideo(String lastModifyUserId, Long id){
        resourceService.delVideo(lastModifyUserId, id);
        delIndex(id, ESSearchTypeEnum.video);
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

    private void sendIndex(Base base, ESSearchTypeEnum esSearchTypeEnum){
        IndexThread indexThread = new IndexThread();
        indexThread.setId(base.getId());
        indexThread.setIndexOperEnum(IndexOperEnum.update);
        indexThread.setEsSearchTypeEnum(esSearchTypeEnum);
        threadTaskExecutor.execute(indexThread);
    }


    private void delIndex(Long id, ESSearchTypeEnum esSearchTypeEnum){
        IndexThread indexThread = new IndexThread();
        indexThread.setId(id);
        indexThread.setIndexOperEnum(IndexOperEnum.delete);
        indexThread.setEsSearchTypeEnum(esSearchTypeEnum);
        threadTaskExecutor.execute(indexThread);
    }
}
