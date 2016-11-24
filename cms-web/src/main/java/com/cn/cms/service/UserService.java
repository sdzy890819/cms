package com.cn.cms.service;

import com.cn.cms.po.User;
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
}
