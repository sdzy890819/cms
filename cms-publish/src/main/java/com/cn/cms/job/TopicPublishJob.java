package com.cn.cms.job;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.po.Channel;
import com.cn.cms.po.Topic;
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

    private Topic topic;

    private Channel channel;

    public TopicPublishJob(){}

    public TopicPublishJob(Topic topic, Channel channel){
        this.topic = topic;
        this.channel = channel;
    }

    @Override
    protected void execute(){
        Map<String, Object> map = new HashMap<>();
        String content = topic.getTopicContent();
        map.put(StaticContants.TEMPLATE_KEY_DATA, topic);
        topic.setTopicContent(null);
        VelocityUtils.publish(map, content, StringUtils.concatUrl(channel.getChannelPath(), topic.getTopicPath(), topic.getTopicFilename()));
    }

    @Override
    protected String getJobName() {
        return topic.getTopicTitle()+" 生成";
    }
}
