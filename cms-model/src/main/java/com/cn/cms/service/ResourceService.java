package com.cn.cms.service;

import com.cn.cms.po.Images;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.po.Video;
import com.cn.cms.po.VideoBase;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface ResourceService {

    ImagesBase findImagesBase();

    void saveImagesBase(ImagesBase imagesBase);

    void updateImagesBase(ImagesBase imagesBase);

    void saveImages(Images images);

    void updateImages(Images images);

    void delImages(String lastModifyUserId, Long id);

    Images findImages(Long id);

    Integer queryImagesCount();

    List<Images> queryImagesList(Page page);

    VideoBase findVideoBase();

    void updateVideoBase(VideoBase videoBase);

    void saveVideoBase(VideoBase videoBase);

    void updateVideo(Video video);

    void saveVideo(Video video);

    void delVideo(String lastModifyUserId, Long id);

    Video findVideo(Long id);

    Integer queryVideoCount();

    List<Video> queryVideoList(Page page);
}
