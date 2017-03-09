package com.cn.cms.dao;

import com.cn.cms.po.VideoBase;
import org.apache.ibatis.annotations.Param;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface VideoBaseDao {

    VideoBase findVideoBase();

    void updateVideoBase(@Param(value = "p1") VideoBase videoBase);

    void saveVideoBase(@Param(value = "p1") VideoBase videoBase);
}
