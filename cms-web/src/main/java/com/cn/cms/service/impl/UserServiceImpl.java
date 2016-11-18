package com.cn.cms.service.impl;

import com.cn.cms.dao.PermissionDao;
import com.cn.cms.dao.PositionDao;
import com.cn.cms.dao.PositionPermissionDao;
import com.cn.cms.dao.UserDao;
import com.cn.cms.po.User;
import com.cn.cms.service.TopicService;
import com.cn.cms.service.UserService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    @Resource
    private PositionPermissionDao positionPermissionDao;

    @Resource
    private PositionDao positionDao;

    @Resource
    private PermissionDao permissionDao;

    public User test() {
        return userDao.test();
    }
}
