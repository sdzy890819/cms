package com.cn.cms.dao;

import com.cn.cms.po.PositionPermission;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface PositionPermissionDao {

    List<Long> findPositionPermission(@Param(value = "positionId") Long positionId);

    void createPositionPermission(@Param(value = "positionId") Long positionId, @Param(value = "list") List<PositionPermission> positionPermission);

    void savePositionPermission(@Param(value = "p1") PositionPermission positionPermission);

    void delPositionPermission(@Param(value = "positionId") Long positionId, @Param(value = "permissionId") Long permissionId);

}
