package com.cn.cms.biz;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.RelationTypeEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.job.TemplatePublishJob;
import com.cn.cms.job.TopicPublishJob;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.message.bean.Body;
import com.cn.cms.message.common.CommonMessage;
import com.cn.cms.po.*;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.StringUtils;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by zhangyang on 16/12/24.
 */
@Component
public class BuildBiz extends BaseBiz {

    @Resource
    private NewsBiz newsBiz;

    @Resource
    private TopicBiz topicBiz;

    @Resource
    private FragmentBiz fragmentBiz;


    @Resource
    private TemplateBiz templateBiz;

    @Resource
    private ChannelBiz channelBiz;

    @Resource(name = "threadTaskExecutor")
    private TaskExecutor threadTaskExecutor;

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    /**
     * 执行build动作.
     *
     * @param commonMessage
     */
    public void build(CommonMessage commonMessage) {
        CommonMessageSourceEnum sourceEnum = CommonMessageSourceEnum.get(commonMessage.getSource());
        Base base;
        List<Template> templates;
        switch (sourceEnum) {
            case NEWS: {
                Body body = (Body) commonMessage.getMessage();
                News news = newsBiz.findNewsAndDetail(body.getId());
                templates = templateBiz.findTemplateListByRelation(news.getColumnId(), RelationTypeEnum.column.getType());
                this.publishNews(news, body);
                base = news;
                break;
            }
            case TOPIC: {
                Body body = (Body) commonMessage.getMessage();
                Topic topic = topicBiz.getTopic(body.getId());
                templates = templateBiz.findTemplateListByRelation(topic.getTopicClassifyId(), RelationTypeEnum.topic.getType());
                this.publishTopic(topic, body);
                base = topic;
                break;
            }
            case FRAGMENT: {
                Body body = (Body) commonMessage.getMessage();
                Fragment fragment = fragmentBiz.findFragment(body.getId());
                templates = templateBiz.findTemplateListByRelation(fragment.getId(), RelationTypeEnum.fragment.getType());
                base = fragment;
                break;
            }
            default: {
                log.info("无相关对应类型，不作处理!");
                return;
            }
        }
        this.publishTemplate(templates, base);
    }


    /**
     * 执行模版生成
     * @param templates
     * @param base
     */
    void publishTemplate(List<Template> templates, Base base){
        this.publishTemplate(templates);
        if(StringUtils.isNotEmpty(templates)) {
            for (int i = 0; i < templates.size(); i++) {
                TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                if(templates.get(i).getTemplateClassify() == TemplateClassifyEnum.detail.getType()) {
                    templatePublishJob.setBase(base);
                }
                templatePublishJob.setTemplate(templates.get(i));
                threadTaskExecutor.execute(templatePublishJob);
            }
        }
    }

    void publishTemplate(List<Template> templates){
        List<Long> list = new ArrayList<>();
        if(StringUtils.isNotEmpty(templates)) {
            for (int i = 0; i < templates.size(); i++) {
                if(templates.get(i).getTemplateClassify() != TemplateClassifyEnum.detail.getType()){
                    list.add(templates.get(i).getId());
                }
            }
        }
        templateBiz.publishTemplate(list);
    }


    /**
     * 执行新闻操作
     * @param news
     * @param body
     */
    void publishNews(News news, Body body){
        Channel channel = channelBiz.getChannel(news.getChannelId());
        if(news.getPublish() == PublishEnum.NO.getType()) {
            news.setBuildTime(new Date());
            news.setBuildUserId(body.getUserId());
            news.setLastModifyUserId(body.getUserId());
            news.setPublish(PublishEnum.YES.getType());
            news.setRelativePath(StringUtils.concatUrl(FileUtil.getDatePath(), String.valueOf(news.getId()).concat(StaticContants.HTML_SUFFIX)));
            news.setUrl(StringUtils.concatUrl(channel.getChannelUrl(), news.getRelativePath()));
            newsBiz.publishNews(news);
        }
    }

    /**
     * 执行专题操作
     * @param topic
     * @param body
     */
    void publishTopic(Topic topic, Body body){
        Channel channel = channelBiz.getChannel(topic.getChannelId());
        topic.setTopicUrl(StringUtils.concatUrl(channel.getChannelUrl(),topic.getTopicPath(),topic.getTopicFilename()));
        topic.setBuildUserId(body.getUserId());
        topic.setLastModifyUserId(body.getUserId());
        topic.setPublish(PublishEnum.YES.getType());
        topic.setBuildTime(new Date());
        topicBiz.publishTopic(topic);
        TopicPublishJob topicPublishJob = new TopicPublishJob(topic,channel);
        threadTaskExecutor.execute(topicPublishJob);
    }
}
