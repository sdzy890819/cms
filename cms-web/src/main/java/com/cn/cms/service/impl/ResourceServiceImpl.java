package com.cn.cms.service.impl;

import com.cn.cms.dao.ImagesBaseDao;
import com.cn.cms.dao.ImagesDao;
import com.cn.cms.dao.VideoBaseDao;
import com.cn.cms.dao.VideoDao;
import com.cn.cms.po.ImagesBase;
import com.cn.cms.service.OperationService;
import com.cn.cms.service.ResourceService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/11/18.
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
}
