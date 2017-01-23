package com.cn.cms.biz;

import com.alibaba.fastjson.JSONObject;
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
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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

    @Resource
    private Template2Biz template2Biz;


    @Resource(name = "threadTaskExecutor")
    private ThreadPoolTaskExecutor threadTaskExecutor;

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
        Body body = JSONObject.parseObject(((JSONObject)commonMessage.getMessage()).toJSONString(),Body.class);
        switch (sourceEnum) {
            case NEWS: {
                News news = newsBiz.findNewsAndDetail(body.getId());
                templates = templateBiz.findTemplateListByRelation(news.getColumnId(), RelationTypeEnum.column.getType());
                this.publishNews(news, body);
                this.publishTemplate2(news);
                base = news;
                break;
            }
            case TOPIC: {
                Topic topic = topicBiz.getTopic(body.getId());
                templates = templateBiz.findTemplateListByRelation(topic.getTopicClassifyId(), RelationTypeEnum.topic.getType());
                this.publishTopic(topic, body);
                base = topic;
                break;
            }
            case FRAGMENT: {
                Fragment fragment = fragmentBiz.findFragment(body.getId());
                templates = templateBiz.findTemplateListByRelation(fragment.getId(), RelationTypeEnum.fragment.getType());
                base = fragment;
                break;
            }
            case RECOMMEND: {
                NewsRecommend newsRecommend = newsBiz.findNewsRecommend(body.getId());
                templates = templateBiz.findTemplateListByRelation(newsRecommend.getRecommendColumnId(), RelationTypeEnum.recommend.getType());
                base = newsRecommend;
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
     * 第二模版发布
     * @param news
     */
    public void publishTemplate2(News news){
        if(news.getColumnId()!=null && news.getColumnId()>0) {
            NewsColumn newsColumn = newsBiz.getNewsColumn(news.getColumnId());
            if(newsColumn.getListTemplate2Id()!=null && newsColumn.getListTemplate2Id() > 0){
                Template2 template2 = template2Biz.getTemplate2(newsColumn.getListTemplate2Id());
                TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                templatePublishJob.setChannelId(news.getChannelId());
                templatePublishJob.setNewsColumn(newsColumn);
                templatePublishJob.setTemplateBasics(template2);
                threadTaskExecutor.execute(templatePublishJob);
                Channel channel = channelBiz.getChannel(newsColumn.getChannelId());
                newsColumn.setListUrl(StringUtils.concatUrl(channel.getChannelUrl(), template2.getPath(),
                        newsColumn.getId().toString().concat(StaticContants.HTML_SUFFIX)));
                newsBiz.publishListTemplate2(newsColumn);

            }
            if(newsColumn.getDetailTemplate2Id() != null && newsColumn.getDetailTemplate2Id() > 0){
                Template2 template2 = template2Biz.getTemplate2(newsColumn.getDetailTemplate2Id());
                TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                templatePublishJob.setTemplateBasics(template2);
                templatePublishJob.setChannelId(news.getChannelId());
                templatePublishJob.setNewsColumn(newsColumn);
                templatePublishJob.setBase(news);
                threadTaskExecutor.execute(templatePublishJob);
            }

        }
    }

    /**
     * 自动定时生成.
     */
    public void buildAuto(){
        List<Template> templates = templateBiz.findTemplateListByAuto();
        this.publishTemplate(templates, null);
    }

    /**
     * 新闻定时生成
     */
    public void buildAutoPublish(){
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND,0);
        List<News> ids = newsBiz.findNewsByAutoPublish(calendar.getTime());
        if(ids!=null && ids.size()>0){
            for(int i=0; i<ids.size(); i++){
                CommonMessage commonMessage = new CommonMessage();
                Body body = new Body();
                body.setId(ids.get(i).getId());
                body.setUserId(ids.get(i).getBuildUserId());
                commonMessage.setMessage(body);
                commonMessage.setSource(CommonMessageSourceEnum.NEWS.getType());
                this.build(commonMessage);
            }
        }

    }


    /**
     * 执行模版生成
     * @param templates
     * @param base
     */
    void publishTemplate(List<Template> templates, Base base){
        if(StringUtils.isNotEmpty(templates)) {
            this.publishTemplate(templates);
            for (int i = 0; i < templates.size(); i++) {
                TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                if(templates.get(i).getTemplateClassify() == TemplateClassifyEnum.detail.getType()) {
                    templatePublishJob.setBase(base);
                }
                templatePublishJob.setTemplateBasics(templates.get(i));
                threadTaskExecutor.execute(templatePublishJob);
            }
        }
    }

    /**
     * 模版是否发布过标记
     * @param templates
     */
    void publishTemplate(List<Template> templates){
        List<Long> list = new ArrayList<>();
        if(StringUtils.isNotEmpty(templates)) {
            for (int i = 0; i < templates.size(); i++) {
                if(templates.get(i).getTemplateClassify() != TemplateClassifyEnum.detail.getType()
                        && templates.get(i).getPublish() == PublishEnum.NO.getType()){
                    list.add(templates.get(i).getId());
                }
            }
            if(StringUtils.isNotEmpty(list)) {
                templateBiz.publishTemplate(list);
            }
        }

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
