package com.cn.cms.biz;

import com.cn.cms.po.Channel;
import com.cn.cms.service.ChannelService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/12/7.
 */
@Component
public class ChannelBiz extends BaseBiz {

    @Resource
    private ChannelService channelService;

    /**
     * 获取所有频道
     * @return
     */
    public List<Channel> listChannel(){
        return channelService.findChannelAll();
    }

    public void saveChannel(Channel channel){
        channelService.saveChannel(channel);
    }

    public void updateChannel(Channel channel){
        channelService.updateChannel(channel);
    }

    public void delChannel(String lastModifyUserId, Long id){
        channelService.delChannel(lastModifyUserId, id);
    }

    public List<Channel> findChannelList(Long categoryId){
        return channelService.findChannelList(categoryId);
    }

}
