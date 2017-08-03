package com.cn.cms.dao;

import com.cn.cms.po.ImagesClassify;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao
 * Created by zhangyang on 2017/8/1.
 */
public interface ImagesClassifyDao {

    void saveImagesClassify(@Param(value = "p1") ImagesClassify classify);

    void updateImagesClassify(@Param(value = "p1") ImagesClassify classify);

    List<ImagesClassify> queryImagesClassifyList(@Param(value = "page") Page page);

    Integer queryImagesClassifyCount();

    ImagesClassify getImagesClassify(@Param(value = "id") Long id);

    List<ImagesClassify> findAllImagesClassify();

    List<ImagesClassify> getImagesClassifyList(@Param(value = "list") List<Long> ids);

    void delImagesClassify(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);
}
