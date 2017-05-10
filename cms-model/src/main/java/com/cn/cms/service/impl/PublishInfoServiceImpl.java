package com.cn.cms.service.impl;

import com.cn.cms.dao.PublishInfoDao;
import com.cn.cms.po.PublishInfo;
import com.cn.cms.service.PublishInfoService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 17/5/9.
 */
@Repository
public class PublishInfoServiceImpl implements PublishInfoService {

    @Resource
    private PublishInfoDao publishInfoDao;

    @Override
    public void savePublishInfo(PublishInfo publishInfo) {
        publishInfoDao.savePublishInfo(publishInfo);
    }

    @Override
    public void updatePublishInfo(PublishInfo publishInfo) {
        publishInfoDao.updatePublishInfo(publishInfo);
    }

    @Override
    public List<PublishInfo> findPublishInfoList(PublishInfo publishInfo, Page page) {
        return publishInfoDao.findPublishInfoList(publishInfo, page);
    }

    @Override
    public Integer findPublishInfoCount(PublishInfo publishInfo) {
        return publishInfoDao.findPublishInfoCount(publishInfo);
    }

    @Override
    public PublishInfo getPublishInfo(Long id) {
        return publishInfoDao.getPublishInfo(id);
    }
}
