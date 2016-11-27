package com.cn.cms.dao;

import com.cn.cms.po.User;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface UserDao {

    User test();

    Integer queryUserCount();

    List<User> queryUserList(@Param(value="page") Page page);

    User findUser(@Param(value="userId")String userId);

    void createUser(@Param(value="user")User user);

    Integer queryUserName(@Param(value="userName")String userName);

    void delUser(@Param(value="lastModifyUserId") String lastModifyUserId, @Param(value="userId")String userId);

    void updateUser(@Param(value="user") User user);

    User findUserName(@Param(value="userName")String userName);

    User findUserForLogin(@Param(value="userName") String userName, @Param(value="pwd") String pwd);
}
