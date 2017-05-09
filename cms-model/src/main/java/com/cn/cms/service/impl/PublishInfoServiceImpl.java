package com.cn.cms.service.impl;

import com.cn.cms.dao.PublishInfoDao;
import com.cn.cms.po.PublishInfo;
import com.cn.cms.service.PublishInfoService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

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
}
