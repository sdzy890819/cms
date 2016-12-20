package com.cn.cms.dao;

import com.cn.cms.po.Position;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface PositionDao {


    Position findPosition(@Param(value = "id") Long id);

    Position findPositionName(@Param(value = "positionName") String positionName);

    void insertPosition(@Param(value = "p1") Position position);

    void deletePosition(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void updatePosition(@Param(value = "p1") Position position);

    Integer queryPositionCount();

    List<Position> findPositionList(@Param(value = "page") Page page);
}
