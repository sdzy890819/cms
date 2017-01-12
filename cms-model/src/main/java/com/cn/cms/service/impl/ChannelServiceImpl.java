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

    @Override
    public List<Channel> findChannelByUserId(String userId ,Long categoryId) {
        return channelDao.findChannelByUserId(userId ,categoryId);
    }

    @Override
    public void saveChannel(Channel channel) {
        channelDao.saveChannel(channel);
    }

    @Override
    public void updateChannel(Channel channel) {
        channelDao.updateChannel(channel);
    }

    @Override
    public void delChannel(String lastModifyUserId, Long id) {
        channelDao.delChannel(lastModifyUserId, id);
    }

    @Override
    public Channel findChannel(Long id) {
        return channelDao.findChannel(id);
    }

    @Override
    public Channel doFindChannel(Long id) {
        return channelDao.findChannel(id);
    }

    @Override
    public List<Channel> getChannelList(List<Long> ids) {
        return channelDao.getChannelList(ids);
    }

    @Override
    public List<Channel> findChannelList(Long categoryId) {
        return channelDao.findChannelList(categoryId);
    }

    @Override
    public Integer queryCountForUserId(String userId) {
        return userChannelDao.queryCountForUserId(userId);
    }

    @Override
    public List<UserChannel> queryListForUserId(String userId, Page page) {
        return userChannelDao.queryListForUserId(userId, page);
    }

    @Override
    public Integer queryCountForChannelId(Long channelId) {
        return userChannelDao.queryCountForChannelId(channelId);
    }

    @Override
    public List<UserChannel> queryListForChannelId(Long channelId, Page page) {
        return userChannelDao.queryListForChannelId(channelId, page);
    }

    @Override
    public void saveUserChannel(List<UserChannel> list) {
        userChannelDao.saveUserChannel(list);
    }

    @Override
    public void delUserChannel(String userId, Long channelId) {
        userChannelDao.delUserChannel(userId, channelId);
    }
}
