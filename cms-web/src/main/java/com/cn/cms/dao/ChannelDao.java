package com.cn.cms.dao;

import com.cn.cms.po.Channel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface ChannelDao {

    List<Channel> findChannelAll();

    void saveChannel(@Param(value = "p1") Channel channel);

    void updateChannel(@Param(value = "p1") Channel channel);

    void delChannel(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    Channel findChannel(@Param(value = "id") Long id);

    List<Channel> getChannelList(@Param(value = "list") List<Long> ids);

    List<Channel> findChannelList(@Param(value = "categoryId") Long categoryId);

}
