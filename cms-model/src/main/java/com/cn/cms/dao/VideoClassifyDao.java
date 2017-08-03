package com.cn.cms.dao;

import com.cn.cms.po.VideoClassify;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao
 * Created by zhangyang on 2017/8/1.
 */
public interface VideoClassifyDao {

    void saveVideoClassify(@Param(value = "p1") VideoClassify classify);

    void updateVideoClassify(@Param(value = "p1") VideoClassify classify);

    List<VideoClassify> queryVideoClassifyList(@Param(value = "page") Page page);

    Integer queryVideoClassifyCount();

    VideoClassify getVideoClassify(@Param(value = "id") Long id);

    List<VideoClassify> findAllVideoClassify();

    List<VideoClassify> getVideoClassifyList(@Param(value = "list") List<Long> ids);

    void delVideoClassify(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);
}
