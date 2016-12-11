package com.cn.cms.service;

import com.cn.cms.po.Channel;

import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface ChannelService {

    List<Channel> findChannelAll();

    void saveChannel(Channel channel);

    void updateChannel(Channel channel);

    void delChannel(String lastModifyUserId, Long id);

    Channel findChannel(Long id);

    List<Channel> findChannelList(Long categoryId);
}
