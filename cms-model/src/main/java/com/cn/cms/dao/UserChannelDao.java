package com.cn.cms.dao;


import com.cn.cms.po.UserChannel;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface UserChannelDao {

    Integer queryCountForUserId(@Param(value = "userId") String userId);

    List<UserChannel> queryListForUserId(@Param(value = "userId") String userId, @Param(value = "page") Page page);

    Integer queryCountForChannelId(@Param(value = "channelId") Long channelId);

    List<UserChannel> queryListForChannelId(@Param(value = "channelId") Long channelId, @Param(value = "page") Page page);

    void saveUserChannel(@Param(value = "list") List<UserChannel> list);

    void delUserChannel(@Param(value = "userId") String userId, @Param(value = "channelId") Long channelId);

    List<Long> findUserChannelIdsByUserId(@Param(value = "userId") String userId);

}
