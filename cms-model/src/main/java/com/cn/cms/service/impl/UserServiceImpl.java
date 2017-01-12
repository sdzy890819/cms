package com.cn.cms.service.impl;

import com.cn.cms.dao.*;
import com.cn.cms.po.*;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

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

    @Resource
    private UserPositionDao userPositionDao;

    public User test() {
        return userDao.test();
    }

    public Integer queryUserCount() {
        return userDao.queryUserCount();
    }

    public List<User> queryUserList(Page page) {
        return userDao.queryUserList(page);
    }

    public User findUser(String userId) {
        return userDao.findUser(userId);
    }

    public List<User> findUserList(List<String> userIds) {
        return userDao.findUserList(userIds);
    }

    public void createUser(User user) {
        userDao.createUser(user);
    }

    public Integer queryUserName(String userName) {
        return userDao.queryUserName(userName);
    }

    public void delUser(String lastModifyUserId, String userId) {
        userDao.delUser(lastModifyUserId, userId);
    }

    public void updateUser(User user) {
        userDao.updateUser(user);
    }

    public User findUserName(String userName) {
        return userDao.findUserName(userName);
    }

    public User findUserForLogin(String userName, String pwd) {
        return userDao.findUserForLogin(userName, pwd);
    }

    public Position findPosition(Long id) {
        return positionDao.findPosition(id);
    }

    public void insertUserPosition(UserPosition userPosition) {
        userPositionDao.insertUserPosition(userPosition);
    }

    public List<UserPosition> findUserPosition(String userId, Long positionId) {
        return userPositionDao.findUserPosition(userId, positionId);
    }

    @Override
    public List<UserPosition> findUserPositionByPostionId(Long positionId) {
        return null;
    }

    public Position findPositionName(String positionName) {
        return positionDao.findPositionName(positionName);
    }

    public void insertPosition(Position position) {
        positionDao.insertPosition(position);
    }

    public void deletePosition(String lastModifyUserId, Long id) {
        positionDao.deletePosition(lastModifyUserId, id);
    }

    public void updatePosition(Position position) {
        positionDao.updatePosition(position);
    }

    public Integer queryPositionCount() {
        return positionDao.queryPositionCount();
    }

    public List<Position> findPositionList(Page page) {
        return positionDao.findPositionList(page);
    }

    public List<Permission> findPermissionList() {
        return permissionDao.findPermissionList();
    }

    public List<Long> findPositionPermission(Long positionId) {
        return positionPermissionDao.findPositionPermission(positionId);
    }

    public void createPermission(Permission permission) {
        permissionDao.createPermission(permission);
    }

    public void updatePermission(Permission permission){
        permissionDao.updatePermission(permission);
    }

    public Permission findPermission(Long id) {
        return permissionDao.findPermission(id);
    }

    public void delPermission(Long id, String lastModifyUserId){
        permissionDao.delPermission(id, lastModifyUserId);
    }

    public void createPositionPermission(Long positionId, List<PositionPermission> positionPermissionList) {
        positionPermissionDao.createPositionPermission(positionId, positionPermissionList);
    }

    public List<Permission> findPermissionForPositionIds(String userId) {
        return permissionDao.findPermissionForPositionIds(userId);
    }

    public void savePositionPermission(PositionPermission positionPermission) {
        positionPermissionDao.savePositionPermission(positionPermission);
    }

    public void delPositionPermission(Long positionId, Long permissionId) {
        positionPermissionDao.delPositionPermission(positionId, permissionId);
    }
}
