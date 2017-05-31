package com.cn.cms.dao;

import com.cn.cms.po.VideoBase;
import org.apache.ibatis.annotations.Param;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface VideoBaseDao {

    VideoBase findVideoBase();

    void updateVideoBase(@Param(value = "p1") VideoBase videoBase);

    void saveVideoBase(@Param(value = "p1") VideoBase videoBase);
}
