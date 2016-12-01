package com.cn.cms.dao;

import com.cn.cms.po.ImagesBase;
import org.apache.ibatis.annotations.Param;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface ImagesBaseDao {

    ImagesBase findImagesBase();

    void saveImagesBase(@Param(value = "p1") ImagesBase imagesBase);

    void updateImagesBase(@Param(value = "p1") ImagesBase imagesBase);

}
