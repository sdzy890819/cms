package com.cn.cms.biz;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Channel;
import com.cn.cms.po.UserChannel;
import com.cn.cms.service.ChannelService;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhangyang on 16/12/7.
 */
@Component
public class ChannelBiz extends BaseBiz {

    @Resource
    private ChannelService channelService;

    @Resource
    private JedisClient jedisClient;

    /**
     * 获取所有频道
     * @return
     */
    public List<Channel> listChannel(){
        return channelService.findChannelAll();
    }

    /**
     * 获取当前用户的所有频道权限
     * @param userId
     * @return
     */
    public List<Channel> listChannelByUserId(String userId ,Long categoryId){
        return channelService.findChannelByUserId(userId, categoryId);
    }

    /**
     * 保存频道
     * @param channel
     */
    public void saveChannel(Channel channel){
        channelService.saveChannel(channel);
        setRedis(channel.getId());
    }

    /**
     * 清除Redis
     * @param id
     */
    private void cleanRedis(Long id){
        jedisClient.del(RedisKeyContants.getRedisChannelDetailKey(id));
    }

    /**
     *  设置Redis
     * @param id
     */
    private void setRedis(Long id){
        Channel channel = channelService.doFindChannel(id);
        jedisClient.set(RedisKeyContants.getRedisChannelDetailKey(id), JSONObject.toJSONString(channel));
    }

    /**
     * 修改频道
     * @param channel
     */
    public void updateChannel(Channel channel){
        channelService.updateChannel(channel);
        setRedis(channel.getId());
    }

    /**
     * 删除频道
     * @param lastModifyUserId
     * @param id
     */
    public void delChannel(String lastModifyUserId, Long id){
        channelService.delChannel(lastModifyUserId, id);
        cleanRedis(id);
    }

    /**
     * 根据分类获取频道列表
     * @param categoryId
     * @return
     */
    public List<Channel> findChannelList(Long categoryId){
        return channelService.findChannelList(categoryId);
    }

    /**
     * 根据ID获取频道
     * @param id
     * @return
     */
    public Channel getChannel(Long id){
        String result = jedisClient.get(RedisKeyContants.getRedisChannelDetailKey(id));
        if(StringUtils.isNotBlank(result)) {
            return JSONObject.parseObject(result, Channel.class);
        }
        return null;
    }

    /**
     * 根据ID列表获取频道列表
     * @param ids
     * @return
     */
    public List<Channel> getChannelList(List<Long> ids){
        return channelService.getChannelList(ids);
    }

    /**
     * 分页获取用户频道权限
     * @param channelId
     * @param page
     * @return
     */
    public List<UserChannel> listUserChannel(Long channelId, Page page){
        Integer count = this.channelService.queryCountForChannelId(channelId);
        page.setCount(count);
        if(page.isQuery()){
            return channelService.queryListForChannelId(channelId, page);
        }
        return null;
    }

    /**
     * 分页获取用户频道权限
     * @param userId
     * @param page
     * @return
     */
    public List<UserChannel> listUserChannel(String userId, Page page){
        Integer count = this.channelService.queryCountForUserId(userId);
        page.setCount(count);
        if(page.isQuery()){
            return channelService.queryListForUserId(userId, page);
        }
        return null;
    }

    public void saveUserChannel(UserChannel userChannel){
        List<UserChannel> list = new ArrayList<UserChannel>();
        list.add(userChannel);
        channelService.saveUserChannel(list);
    }

    public void delUserChannel(String userId, Long channelId){
        channelService.delUserChannel(userId, channelId);
    }

}