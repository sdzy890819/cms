package com.cn.cms.service;

import com.cn.cms.po.Channel;
import com.cn.cms.po.UserChannel;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
 */
public interface ChannelService {

    List<Channel> findChannelAll();

    List<Channel> findChannelByUserId(String userId ,Long categoryId);

    void saveChannel(Channel channel);

    Integer findChannelNameCount(String channelName);

    void updateChannel(Channel channel);

    void delChannel(String lastModifyUserId, Long id);

    Channel findChannel(Long id);

    Channel doFindChannel(Long id);

    List<Channel> getChannelList(List<Long> ids);

    List<Channel> findChannelList(Long categoryId);

    Integer queryCountForUserId(String userId);

    List<UserChannel> queryListForUserId(String userId, Page page);

    Integer queryCountForChannelId(Long channelId);

    List<UserChannel> queryListForChannelId(Long channelId, Page page);

    void saveUserChannel(List<UserChannel> list);

    void delUserChannel(String userId, Long channelId);

    List<Long> findUserChannelIdsByUserId(String userId);
}
