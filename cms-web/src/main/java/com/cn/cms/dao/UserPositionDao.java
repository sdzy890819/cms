package com.cn.cms.dao;

import com.cn.cms.po.UserPosition;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface UserPositionDao {


    void insertUserPosition(@Param(value="p1") UserPosition userPosition);

    List<UserPosition> findUserPosition(@Param(value="userId") String userId, @Param(value="positionId") Long positionId);

}