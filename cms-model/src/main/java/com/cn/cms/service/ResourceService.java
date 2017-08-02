package com.cn.cms.service;

import com.cn.cms.po.*;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
 */
public interface ResourceService {

    ImagesBase findImagesBase();

    void saveImagesBase(ImagesBase imagesBase);

    void updateImagesBase(ImagesBase imagesBase);

    void saveImages(Images images);

    void updateImages(Images images);

    void delImages(String lastModifyUserId, Long id);

    Images findImages(Long id);

    Images findImagesManage(Long id);

    Images doFindImagesManage(Long id);

    Integer queryImagesCount();

    List<Images> queryImagesList(Page page);

    Integer queryImagesClassifyCount();

    List<ImagesClassify> queryImagesClassifyList(Page page);

    List<ImagesClassify> findAllImagesClassify();

    ImagesClassify getImagesClassify(Long id);

    VideoBase findVideoBase();

    void updateVideoBase(VideoBase videoBase);

    void saveVideoBase(VideoBase videoBase);

    void updateVideo(Video video);

    void saveVideo(Video video);

    void saveVideoClassify(VideoClassify classify);

    void updateVideoClassify(VideoClassify classify);

    void saveImagesClassify(ImagesClassify classify);

    void updateImagesClassify(ImagesClassify classify);

    void delImagesClassify(String lastModifyUserId, Long id);

    List<ImagesClassify> getImagesClassifyList(List<Long> ids);

    void delVideo(String lastModifyUserId, Long id);

    Video findVideo(Long id);

    Video findVideoManage(Long id);

    Video doFindVideoManage(Long id);

    Integer queryVideoCount();

    List<Video> queryVideoList(Page page);

    List<VideoClassify> queryVideoClassifyList(Page page);

    Integer queryVideoClassifyCount();

    VideoClassify getVideoClassify(Long id);

    List<VideoClassify> findAllVideoClassify();

    List<VideoClassify> getVideoClassifyList(List<Long> ids);

    void delVideoClassify(String lastModifyUserId, Long id);
}
