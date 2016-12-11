package com.cn.cms.service.impl;

import com.cn.cms.dao.ChannelDao;
import com.cn.cms.po.Channel;
import com.cn.cms.service.ChannelService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class ChannelServiceImpl implements ChannelService {

    @Resource
    private ChannelDao channelDao;

    public List<Channel> findChannelAll() {
        return channelDao.findChannelAll();
    }

    public void saveChannel(Channel channel) {
        channelDao.saveChannel(channel);
    }

    public void updateChannel(Channel channel) {
        channelDao.updateChannel(channel);
    }

    public void delChannel(String lastModifyUserId, Long id) {
        channelDao.delChannel(lastModifyUserId, id);
    }

    public Channel findChannel(Long id) {
        return channelDao.findChannel(id);
    }

    public List<Channel> findChannelList(Long categoryId) {
        return channelDao.findChannelList(categoryId);
    }
}
