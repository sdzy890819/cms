package com.cn.cms.dao;

import com.cn.cms.po.UserPosition;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface UserPositionDao {


    void insertUserPosition(@Param(value = "p1") UserPosition userPosition);

    void delUserPosition(@Param(value = "p1") UserPosition userPosition);

    List<UserPosition> findUserPosition(@Param(value = "userId") String userId, @Param(value = "positionId") Long positionId);

    List<UserPosition> findUserPositionByUserId(@Param(value = "userId") String userId);

    List<UserPosition> findUserPositionByPostionId(@Param(value = "positionId") Long positionId);

}
