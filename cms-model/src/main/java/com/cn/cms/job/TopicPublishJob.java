package com.cn.cms.job;

import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PublishJobTypeEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.po.Channel;
import com.cn.cms.po.Topic;
import com.cn.cms.utils.ContextUtil;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.VelocityUtils;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/26.
 */
@Getter
@Setter
public class TopicPublishJob extends BaseTask {

    private static CommonLog log = CommonLogFactory.getLog(TopicPublishJob.class);

    private ChannelBiz channelBiz = ContextUtil.getContextUtil().getBean(ChannelBiz.class);

    private Topic topic;

    private Channel channel;

    private Integer page = StaticContants.PAGE;

    private static int MODEL = PublishJobTypeEnum.topic.getType();

    public TopicPublishJob(){}

    public TopicPublishJob(Topic topic, Channel channel){
        this.topic = topic;
        this.channel = channel;
    }

    public TopicPublishJob(Topic topic, Long channelId){
        this.topic = topic;
        this.channel = channelBiz.getChannel(channelId);
    }

    public TopicPublishJob(Topic topic, Long channelId, Integer page){
        this.topic = topic;
        this.channel = channelBiz.getChannel(channelId);
        if(page != null && page >0){
            this.page = page;
        }
    }

    @Override
    protected void execute(){
        Map<String, Object> map = new HashMap<>();
        String content = topic.getTopicContent();
        map.put(StaticContants.TEMPLATE_KEY_DATA, topic);
        if(channel!=null) {
            map.put(StaticContants.TEMPLATE_KEY_CHANNELID, channel.getId());
        }
        map.put(StaticContants.TEMPLATE_KEY_PUBLISH_JOB_TYPE, MODEL);
        topic.setTopicContent(null);
        VelocityUtils.publish(map, content, StringUtils.concatUrl(channel.getChannelPath(), topic.getTopicPath(), FileUtil.getFileNameByPage(topic.getTopicFilename(),page)));
    }

    @Override
    protected String getJobName() {
        return "专题：".concat(topic.getTopicTitle()).concat(",页码：").concat(String.valueOf(page)).concat(" 生成");
    }
}
