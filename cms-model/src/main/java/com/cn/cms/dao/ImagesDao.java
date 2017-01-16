package com.cn.cms.dao;

import com.cn.cms.po.Images;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface ImagesDao {

    void saveImages(@Param(value = "p1") Images images);

    void updateImages(@Param(value = "p1") Images images);

    void delImages(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    Integer queryImagesCount();

    List<Images> queryImagesList(@Param(value = "page") Page page);
}