package com.cn.cms.service;

import com.cn.cms.po.PublishInfo;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by zhangyang on 17/5/9.
 */
public interface PublishInfoService {

    void savePublishInfo(PublishInfo publishInfo);

    void updatePublishInfo(PublishInfo publishInfo);

    List<PublishInfo> findPublishInfoList(PublishInfo publishInfo, Page page);

    Integer findPublishInfoCount(PublishInfo publishInfo);

    PublishInfo getPublishInfo(Long id);
}
