package com.cn.cms.dao;

import com.cn.cms.middleware.bo.UserSearch;
import com.cn.cms.po.User;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface UserDao {

    User test();

    Integer queryUserCount();

    List<User> queryUserList(@Param(value = "page") Page page);

    User findUser(@Param(value = "userId") String userId);

    List<User> findUserList(@Param(value = "list") List<String> userIds);

    void createUser(@Param(value = "user") User user);

    Integer queryUserName(@Param(value = "userName") String userName);

    void delUser(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "userId") String userId);

    void updateUser(@Param(value = "user") User user);

    User findUserName(@Param(value = "userName") String userName);

    User findUserForLogin(@Param(value = "userName") String userName, @Param(value = "pwd") String pwd);

    Integer searchUsersCount(@Param(value = "p1") UserSearch userSearch);

    List<User> searchUsers(@Param(value = "p1") UserSearch userSearch, @Param(value = "page") Page page);

    List<User> getUserForRealName(@Param(value = "list") List<String> realNames);
}
