package com.cn.cms.job;

import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.PublishInfoBiz;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PublishJobTypeEnum;
import com.cn.cms.enums.PublishStatusEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Channel;
import com.cn.cms.po.PublishInfo;
import com.cn.cms.po.Topic;
import com.cn.cms.utils.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/26.
 */
@Getter
@Setter
public class TopicPublishJob extends BaseTask {


    private PublishInfo publishInfo;

    private static CommonLog log = CommonLogFactory.getLog(TopicPublishJob.class);

    private ChannelBiz channelBiz = ContextUtil.getContextUtil().getBean(ChannelBiz.class);

    private PublishInfoBiz publishInfoBiz = ContextUtil.getContextUtil().getBean(PublishInfoBiz.class);

    private JedisClient jedisClient = ContextUtil.getContextUtil().getBean(JedisClient.class);

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
        String publishPath = null;
        try {
            Map<String, Object> map = new HashMap<>();
            String content = topic.getTopicContent();
            map.put(StaticContants.TEMPLATE_KEY_DATA, topic);
            if(channel!=null) {
                map.put(StaticContants.TEMPLATE_KEY_CHANNELID, channel.getId());
            }
            map.put(StaticContants.TEMPLATE_KEY_PUBLISH_JOB_TYPE, MODEL);
            map.put(StaticContants.TEMPLATE_KEY_PAGE, page);
            String publishRelativePath = StringUtils.concatUrl(topic.getTopicPath(), FileUtil.getFileNameByPage(topic.getTopicFilename(),page));
            publishPath = StringUtils.concatUrl(channel.getChannelPath(), publishRelativePath);

            if (lock(publishPath)) {
                VelocityUtils.publish(map, content, publishPath);
                if (StaticContants.rsyncRoot == StaticContants.RSYNC_ON) {
                    RsyncUtils.rsync(channel.getRsyncModelName(),
                            StringUtils.delFirstPrefix(publishRelativePath, StaticContants.FILE_PATH_SP),
                            StaticContants.rsyncPublishFile, channel.getChannelPath());
                }

            }
            if(publishInfo!=null){
                publishInfo.setStatus(PublishStatusEnum.PUBLISH_SUCCESS.getType());
                publishInfo.setMessage(PublishStatusEnum.PUBLISH_SUCCESS.getMessage());
            }
        }catch (Exception e){
            log.error(e);
            if(publishInfo!=null){
                publishInfo.setStatus(PublishStatusEnum.ERROR.getType());
                publishInfo.setMessage(PublishStatusEnum.ERROR.getMessage());
                publishInfo.setErrorMessage(e.getLocalizedMessage());
            }
        }finally {
            unlock(publishPath);
            if(publishInfo!=null){
                publishInfoBiz.update(publishInfo);
            }
        }

    }

    protected boolean lock(String path){
        Long p = jedisClient.setnx(RedisKeyContants.getRedisLockKey(getKey(path)));
        log.info(this.getCurrentName().concat( "LOCK=" + p) );
        if( p!=null && p >0){
            return true;
        }
        return false;
    }

    protected void unlock(String path){
        if(StringUtils.isNotBlank(path)) {
            jedisClient.del(RedisKeyContants.getRedisLockKey(getKey(path)));
        }
    }

    protected String getKey(String path){
        return EncryptUtil.md5(path.replaceAll("//", "/"));
    }

    @Override
    protected String getJobName() {
        return "专题：".concat(topic.getTopicTitle()).concat(",页码：").concat(String.valueOf(page)).concat(" 生成");
    }
}
