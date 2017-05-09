package com.cn.cms.dao;

import com.cn.cms.po.PublishInfo;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangyang on 17/5/9.
 */
public interface PublishInfoDao {

    void savePublishInfo(@Param(value = "p1")PublishInfo publishInfo);

    void savePublishInfos(List<PublishInfo> list);

    void updatePublishInfo(@Param(value = "p1")PublishInfo publishInfo);

    List<PublishInfo> findPublishInfoList(@Param(value = "p1")PublishInfo publishInfo, @Param(value = "page")Page page);

    Integer findPublishInfoCount(@Param(value = "p1")PublishInfo publishInfo);

}
