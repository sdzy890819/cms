package com.cn.cms.service.impl;

import com.cn.cms.dao.ChannelDao;
import com.cn.cms.dao.UserChannelDao;
import com.cn.cms.po.Channel;
import com.cn.cms.po.UserChannel;
import com.cn.cms.service.ChannelService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class ChannelServiceImpl implements ChannelService {

    @Resource
    private ChannelDao channelDao;

    @Resource
    private UserChannelDao userChannelDao;

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

    public List<Channel> getChannelList(List<Long> ids) {
        return channelDao.getChannelList(ids);
    }

    public List<Channel> findChannelList(Long categoryId) {
        return channelDao.findChannelList(categoryId);
    }

    public Integer queryCountForUserId(String userId) {
        return userChannelDao.queryCountForUserId(userId);
    }

    public List<UserChannel> queryListForUserId(String userId, Page page) {
        return userChannelDao.queryListForUserId(userId, page);
    }

    public Integer queryCountForChannelId(Long channelId) {
        return userChannelDao.queryCountForChannelId(channelId);
    }

    public List<UserChannel> queryListForChannelId(Long channelId, Page page) {
        return userChannelDao.queryListForChannelId(channelId, page);
    }

    public void saveUserChannel(List<UserChannel> list) {
        userChannelDao.saveUserChannel(list);
    }

    public void delUserChannel(String userId, Long channelId) {
        userChannelDao.delUserChannel(userId, channelId);
    }
}
