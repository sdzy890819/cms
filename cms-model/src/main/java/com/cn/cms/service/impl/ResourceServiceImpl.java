package com.cn.cms.service.impl;

import com.cn.cms.dao.ImagesBaseDao;
import com.cn.cms.dao.ImagesDao;
import com.cn.cms.dao.VideoBaseDao;
import com.cn.cms.dao.VideoDao;
import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.job.IndexThread;
import com.cn.cms.po.*;
import com.cn.cms.service.ResourceService;
import com.cn.cms.utils.Page;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
 */
@Repository
public class ResourceServiceImpl implements ResourceService {

    @Resource
    private ImagesDao imagesDao;

    @Resource
    private ImagesBaseDao imagesBaseDao;

    @Resource
    private VideoDao videoDao;

    @Resource
    private VideoBaseDao videoBaseDao;


    public ImagesBase findImagesBase() {
        return imagesBaseDao.findImagesBase();
    }

    public void saveImagesBase(ImagesBase imagesBase) {
        imagesBaseDao.saveImagesBase(imagesBase);
    }

    public void updateImagesBase(ImagesBase imagesBase) {
        imagesBaseDao.updateImagesBase(imagesBase);
    }

    public void saveImages(Images images) {
        imagesDao.saveImages(images);
        //sendIndex(images, ESSearchTypeEnum.images);
    }

    public void updateImages(Images images) {
        imagesDao.updateImages(images);
        //sendIndex(images, ESSearchTypeEnum.images);
    }

    public void delImages(String lastModifyUserId, Long id) {
        imagesDao.delImages(lastModifyUserId, id);
//        delIndex(id, ESSearchTypeEnum.images);
    }

    @Override
    public Images findImages(Long id) {
        return imagesDao.findImages(id);
    }

    @Override
    public Images findImagesManage(Long id) {
        return imagesDao.findImagesManage(id);
    }

    @Override
    public Images doFindImagesManage(Long id) {
        return imagesDao.findImagesManage(id);
    }

    public Integer queryImagesCount() {
        return imagesDao.queryImagesCount();
    }

    public List<Images> queryImagesList(Page page) {
        return imagesDao.queryImagesList(page);
    }

    public VideoBase findVideoBase() {
        return videoBaseDao.findVideoBase();
    }

    public void updateVideoBase(VideoBase videoBase) {
        videoBaseDao.updateVideoBase(videoBase);
    }

    public void saveVideoBase(VideoBase videoBase) {
        videoBaseDao.saveVideoBase(videoBase);
    }

    public void updateVideo(Video video) {
        videoDao.updateVideo(video);
//        sendIndex(video, ESSearchTypeEnum.video);
    }

    public void saveVideo(Video video) {
        videoDao.saveVideo(video);
//        sendIndex(video, ESSearchTypeEnum.video);
    }

    public void delVideo(String lastModifyUserId, Long id) {
        videoDao.delVideo(lastModifyUserId, id);
//        delIndex(id, ESSearchTypeEnum.video);
    }

    @Override
    public Video findVideo(Long id) {
        return videoDao.findVideo(id);
    }

    @Override
    public Video findVideoManage(Long id) {
        return videoDao.findVideoManage(id);
    }

    @Override
    public Video doFindVideoManage(Long id) {
        return videoDao.findVideoManage(id);
    }

    public Integer queryVideoCount() {
        return videoDao.queryVideoCount();
    }

    public List<Video> queryVideoList(Page page) {
        return videoDao.queryVideoList(page);
    }


}
