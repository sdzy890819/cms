package com.cn.cms.dao;

import com.cn.cms.po.Permission;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface PermissionDao {


    List<Permission> findPermissionList();

    void createPermission(@Param(value = "p1") Permission permission);

    void updatePermission(@Param(value = "p1") Permission permission);

    Permission findPermission(@Param(value = "id") Long id);

    void delPermission(@Param(value = "id") Long id, @Param(value = "lastModifyUserId") String lastModifyUserId);

    List<Permission> findPermissionForPositionIds(@Param(value = "userId") String userId);
}
