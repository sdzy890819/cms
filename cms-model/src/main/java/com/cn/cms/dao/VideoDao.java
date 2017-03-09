package com.cn.cms.dao;

import com.cn.cms.po.Video;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface VideoDao {

    void updateVideo(@Param(value = "p1") Video video);

    void saveVideo(@Param(value = "p1") Video video);

    void delVideo(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    Integer queryVideoCount();

    List<Video> queryVideoList(@Param(value = "page") Page page);

    Video findVideo(@Param(value = "id") Long id);

    Video findVideoManage(@Param(value = "id") Long id);

}
