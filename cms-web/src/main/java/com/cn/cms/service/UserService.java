package com.cn.cms.service;

import com.cn.cms.po.Position;
import com.cn.cms.po.User;
import com.cn.cms.po.UserPosition;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface UserService {

    /**
     * 测试
     * @return
     */
    User test();

    /**
     * 查询用户的总数
     * @return
     */
    Integer queryUserCount();

    /**
     * 分页查询用户列表
     * @param page
     * @return
     */
    List<User> queryUserList(Page page);

    /**
     * 通过USERID查找用户
     * @param userId
     * @return
     */
    User findUser(String userId);

    /**
     * 创建新用户。
     * @param user
     */
    void createUser(User user);

    /**
     * 获取是否存在次用户名
     * @param userName
     * @return
     */
    Integer queryUserName(String userName);

    /**
     * 删除用户
     * @param userId
     */
    void delUser(String lastModifyUserId, String userId);

    /**
     * 修改用户
     * @param user
     */
    void updateUser(User user);

    /**
     *根据用户名查询用户
     * @param userName
     * @return
     */
    User findUserName(String userName);

    /**
     * 根据用户名密码匹配用户信息
     * @param userName
     * @param pwd
     * @return
     */
    User findUserForLogin(String userName, String pwd);

    /**
     * 根据ID获取用户组
     * @param id
     * @return
     */
    Position findPosition(Long id);

    /**
     * 用户组新增用户
     * @param userPosition
     */
    void insertUserPosition(UserPosition userPosition);

    /**
     * 根据用户ID＋用户组ID 获取
     * @param userId
     * @param positionId
     * @return
     */
    List<UserPosition> findUserPosition(String userId, Long positionId);

    /**
     * 根据用户组名 查询用户组信息
     * @param positionName
     * @return
     */
    Position findPositionName(String positionName);

    /**
     * 保存用户组信息
     * @param position
     */
    void insertPosition(Position position);

    /**
     * 删除用户组
     * @param lastModifyUserId
     * @param id
     */
    void deletePosition(String lastModifyUserId, Long id);

    /**
     * 修改用户组信息
     * @param position
     */
    void updatePosition(Position position);

    /**
     * 查询Position的总量
     * @return
     */
    Integer queryPositionCount();

    /**
     * 分页查询Position列表
     * @param page
     * @return
     */
    List<Position> findPositionList(Page page);
}
