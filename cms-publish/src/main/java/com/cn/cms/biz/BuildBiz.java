package com.cn.cms.biz;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.bo.ColumnPublishInfo;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.*;
import com.cn.cms.job.TemplatePublishJob;
import com.cn.cms.job.TopicPublishJob;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.message.bean.Body;
import com.cn.cms.message.common.CommonMessage;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.*;
import com.cn.cms.utils.*;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.File;
import java.util.*;

/**
 * Created by ADMIN on 16/12/24.
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

    @Resource
    private PublishInfoBiz publishInfoBiz;

    @Resource
    private JedisClient jedisClient;


    @Resource(name = "threadTaskExecutor")
    private ThreadPoolTaskExecutor threadTaskExecutor;

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    /**
     * 新闻栏目批量发布
     * @param commonMessage
     */
    public void batchPublish(CommonMessage commonMessage){
        CommonMessageSourceEnum sourceEnum = CommonMessageSourceEnum.get(commonMessage.getSource());
        Body body = JSONObject.parseObject(((JSONObject) commonMessage.getMessage()).toJSONString(), Body.class);
        String str = jedisClient.get(RedisKeyContants.getRedisColumnPublishInfo(body.getId()));
        int pageSize = 999;
        if(StringUtils.isBlank(str)) {
            ColumnPublishInfo columnPublishInfo = new ColumnPublishInfo();
            columnPublishInfo.setColumnId(body.getId());
            columnPublishInfo.setMessage(ColumnPublishInfo.State.EXEC.getMessage());
            columnPublishInfo.setState(ColumnPublishInfo.State.EXEC.getType());
            columnPublishInfo.setUserId(body.getUserId());
            jedisClient.set(RedisKeyContants.getRedisColumnPublishInfo(body.getId()), JSONObject.toJSONString(columnPublishInfo));
            try {
                switch (sourceEnum) {
                    case OTHER: {
                        List<Long> list = null;
                        Long lastId = null;
                        do {
                            list = newsBiz.findNewsIdWithColumnIds(body.getId(), pageSize, lastId);
                            if(StringUtils.isNotEmpty(list)){
                                for(int i=0;i<list.size();i++){
                                    try {
                                        CommonMessage newCommonMessage = new CommonMessage();
                                        Body newBody = new Body();
                                        newBody.setId(list.get(i));
                                        newBody.setUserId(body.getUserId());
                                        newCommonMessage.setMessage(JSONObject.toJSON(newBody));
                                        newCommonMessage.setSource(CommonMessageSourceEnum.NEWS.getType());
                                        this.build(newCommonMessage);
                                    }catch (Exception error){}
                                    lastId = list.get(i);
                                }
                            }else {
                                break;
                            }
                        }while (StringUtils.isNotEmpty(list));
                        break;
                    }
                    case OTHER_ONLY_COLUMN:{
                        List<Template> templates = templateBiz.findTemplateListByRelationNotDetail(body.getId(), RelationTypeEnum.column.getType());
                        Base base = new Base();
                        base.setId(body.getId());
                        base.setLastModifyUserId(body.getUserId());
                        this.publishTemplate(templates, base, sourceEnum);
                        this.publishListTemplate2(body, sourceEnum);

                        break;
                    }
                    default:
                        break;
                }
            } catch (Exception e) {
                log.error("栏目批量发布任务执行失败!", e);
            } finally {
                jedisClient.del(RedisKeyContants.getRedisColumnPublishInfo(body.getId()));
            }
        }else{
            log.info("已有栏目批量发布任务在执行");
        }
    }


    /**
     * 撤销动作
     * @param commonMessage
     */
    public void rescind(CommonMessage commonMessage){

        CommonMessageSourceEnum sourceEnum = CommonMessageSourceEnum.get(commonMessage.getSource());
        Body body = JSONObject.parseObject(((JSONObject)commonMessage.getMessage()).toJSONString(),Body.class);
        Base base = null;
        List<Template> templates = null;
        switch (sourceEnum) {
            case NEWS: {
                try {
                    News news = newsBiz.findNewsManage(body.getId());
                    Channel channel = channelBiz.getChannel(news.getChannelId());
                    news.setLastModifyUserId(body.getUserId());
                    news.setPublish(PublishEnum.rescind.getType());
                    newsBiz.rescind(news);
                    String filePath = StringUtils.concatUrl(channel.getChannelPath(), news.getRelativePath());
                    File file = new File(filePath);
                    if (file.exists()) {
                        file.delete();
                    }
                    if (StaticContants.rsyncRoot == StaticContants.RSYNC_ON) {
                        RsyncUtils.rsync(channel.getRsyncModelName(), StringUtils.delFirstPrefix(news.getRelativePath(), StaticContants.FILE_PATH_SP), StaticContants.rsyncRescindFile, channel.getChannelPath());
                    }
                    //---获取涉及的所有模版[不包含详情页]
                    templates = findTemplateForNewsNotDetail(news);
                    this.publishTemplate2(news, false);
                    base = news;
                    //--------
                    PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.RE_SUCCESS, body.getId(),
                            TriggerTypeEnum.NEWS, TemplateTypeEnum.NONE, null, null);
                    //--------
                }catch (Exception e){
                    log.error(e);
                    //--------
                    PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.RE_ERROR, body.getId(),
                            TriggerTypeEnum.NEWS, TemplateTypeEnum.NONE, null, e.getLocalizedMessage());
                    //--------
                }
                break;
            }
            case TOPIC: {
                break;
            }
            case FRAGMENT: {
                break;
            }
            case RECOMMEND: {
                break;
            }
            default: {
                log.info("无相关对应类型，不作处理!");
                return;
            }
        }
        this.publishTemplate(templates, base, sourceEnum);
    }

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
                if(news == null){
                    publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, body.getId(),
                            TriggerTypeEnum.NEWS, TemplateTypeEnum.NONE, null, "ID为"+ body.getId() +" 的新闻已不存在");
                    return;
                }
                templates = findTemplateForNews(news);
                this.publishNews(news, body);
                this.publishTemplate2(news, true);
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
                NewsRecommend newsRecommend = newsBiz.findNewsRecommendManage(body.getId());
                templates = templateBiz.findTemplateListByRelation(newsRecommend.getRecommendColumnId(), RelationTypeEnum.recommend.getType());
                base = newsRecommend;
                break;
            }
            default: {
                log.info("无相关对应类型，不作处理!");
                return;
            }
        }
        this.publishTemplate(templates, base, sourceEnum);
    }


    public List<Template> findTemplateForNews(News news){
        List<Template> templates = templateBiz.findTemplateListByRelation(news.getColumnId(), RelationTypeEnum.column.getType());
        templates = findPushTemplate(news, templates);
        return templates;
    }

    public List<Template> findPushTemplate(News news, List<Template> templates){
        if(news.getPushTag()!=null && news.getPushTag() == PushTagEnum.YES.getType()) {
            List<Template> templates1 = templateBiz.findTemplateListByNewsPushColumnAndNotDetail(news.getId());
            if(templates!=null && templates1!=null){
                templates.addAll(templates1);
            }else if(templates==null && templates1!=null){
                templates = templates1;
            }
        }
        return templates;
    }

    public List<Template> findTemplateForNewsNotDetail(News news){
        List<Template> templates = templateBiz.findTemplateListByRelationNotDetail(news.getColumnId(), RelationTypeEnum.column.getType());
        templates = findPushTemplate(news, templates);
        return templates;
    }



    public void publishListTemplate2(Body body, CommonMessageSourceEnum sourceEnum){
        NewsColumn newsColumn = newsBiz.getNewsColumn(body.getId());
        if(newsColumn != null && newsColumn.getListTemplate2Id()!=null && newsColumn.getListTemplate2Id() > 0){
            Template2 template2 = template2Biz.getTemplate2(newsColumn.getListTemplate2Id());
            if(template2 == null){
                publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, body.getId(),
                        sourceEnum.getTriggerTypeEnum(), TemplateTypeEnum.TEMPLATE2, null, "ID为"+ newsColumn.getListTemplate2Id() +" 的列表页第二模版已不存在");
                return ;
            }
            Channel channel = channelBiz.getChannel(newsColumn.getChannelId());
            if(channel == null){
                publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, body.getId(),
                        sourceEnum.getTriggerTypeEnum(), TemplateTypeEnum.TEMPLATE2, template2.getId(), "ID为"+ newsColumn.getListTemplate2Id() +" 的列表页第二模版的所属频道ID为 " +newsColumn.getChannelId()+" 的频道已不存在");
                return ;
            }
            String listUrl = "";
            String listRelativePath = "";
            if(StringUtils.isNotBlank(newsColumn.getPath()) && StringUtils.isNotBlank(newsColumn.getFileName())){
                if(StringUtils.isNotBlank(StaticContants.indexMap.get(newsColumn.getFileName()))){
                    listRelativePath = FileUtil.addSuffix(FileUtil.delPrefix(newsColumn.getPath()));
                }else{
                    listRelativePath = FileUtil.delPrefix(StringUtils.concatUrl(newsColumn.getPath(), newsColumn.getFileName()));
                }
                listUrl = StringUtils.concatUrl(channel.getChannelUrl(), listRelativePath);
            }else{
                listRelativePath = FileUtil.delPrefix(StringUtils.concatUrl(template2.getPath(),
                        newsColumn.getId().toString().concat(StaticContants.HTML_SUFFIX)));
                listUrl = StringUtils.concatUrl(channel.getChannelUrl(), listRelativePath);
            }
            newsColumn.setListUrl(listUrl);
            newsColumn.setListRelativePath(listRelativePath);
            newsBiz.publishListTemplate2(newsColumn);

            TemplatePublishJob templatePublishJob = new TemplatePublishJob();
            templatePublishJob.setChannelId(newsColumn.getChannelId());
            templatePublishJob.setNewsColumn(newsColumn);
            templatePublishJob.setTemplateBasics(template2);
            //--------
            PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.EXECING, body.getId(),
                    sourceEnum.getTriggerTypeEnum(), TemplateTypeEnum.TEMPLATE2, template2.getId(), null);
            templatePublishJob.setPublishInfo(publishInfo);
            //--------
            threadTaskExecutor.execute(templatePublishJob);
        }
    }


    /**
     * 第二模版发布
     * @param news
     */
    public void publishTemplate2(News news, boolean isContainDetail){
        if(news.getColumnId()!=null && news.getColumnId()>0) {
            NewsColumn newsColumn = newsBiz.getNewsColumn(news.getColumnId());
            if(newsColumn != null && newsColumn.getListTemplate2Id()!=null && newsColumn.getListTemplate2Id() > 0){
                Template2 template2 = template2Biz.getTemplate2(newsColumn.getListTemplate2Id());
                if(template2 == null){
                    publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, news.getId(),
                            TriggerTypeEnum.NEWS, TemplateTypeEnum.TEMPLATE2, null, "ID为"+ newsColumn.getListTemplate2Id() +" 的列表页第二模版已不存在");
                    return ;
                }
                Channel channel = channelBiz.getChannel(newsColumn.getChannelId());
                if(channel == null){
                    publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, news.getId(),
                            TriggerTypeEnum.NEWS, TemplateTypeEnum.TEMPLATE2, template2.getId(), "ID为"+ newsColumn.getListTemplate2Id() +" 的列表页第二模版的所属频道ID为 " +newsColumn.getChannelId()+" 的频道已不存在");
                    return ;
                }
                String listUrl = "";
                String listRelativePath = "";
                if(StringUtils.isNotBlank(newsColumn.getPath()) && StringUtils.isNotBlank(newsColumn.getFileName())){
                    if(StringUtils.isNotBlank(StaticContants.indexMap.get(newsColumn.getFileName()))){
                        listRelativePath = FileUtil.addSuffix(FileUtil.delPrefix(newsColumn.getPath()));
                    }else{
                        listRelativePath = FileUtil.delPrefix(StringUtils.concatUrl(newsColumn.getPath(), newsColumn.getFileName()));
                    }
                    listUrl = StringUtils.concatUrl(channel.getChannelUrl(), listRelativePath);
                }else{
                    listRelativePath = FileUtil.delPrefix(StringUtils.concatUrl(template2.getPath(),
                            newsColumn.getId().toString().concat(StaticContants.HTML_SUFFIX)));
                    listUrl = StringUtils.concatUrl(channel.getChannelUrl(), listRelativePath);
                }
                newsColumn.setListUrl(listUrl);
                newsColumn.setListRelativePath(listRelativePath);
                newsBiz.publishListTemplate2(newsColumn);

                TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                templatePublishJob.setChannelId(news.getChannelId());
                templatePublishJob.setNewsColumn(newsColumn);
                templatePublishJob.setTemplateBasics(template2);
                //--------
                PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.EXECING, news.getId(),
                        TriggerTypeEnum.NEWS, TemplateTypeEnum.TEMPLATE2, template2.getId(), null);
                templatePublishJob.setPublishInfo(publishInfo);
                //--------
                threadTaskExecutor.execute(templatePublishJob);
            }

            if( isContainDetail && newsColumn != null && newsColumn.getDetailTemplate2Id() != null && newsColumn.getDetailTemplate2Id() > 0){
                Template2 template2 = template2Biz.getTemplate2(newsColumn.getDetailTemplate2Id());
                if(template2 == null){
                    publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, news.getId(),
                            TriggerTypeEnum.NEWS, TemplateTypeEnum.TEMPLATE2, null, "ID为"+ newsColumn.getDetailTemplate2Id() +" 的详情页第二模版已不存在");
                    return ;
                }
                String[] contents = HtmlUtils.splitNewsContent(news.getNewsDetail().getContent());
                //---------------
                PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.EXECING, news.getId(),
                        TriggerTypeEnum.NEWS, TemplateTypeEnum.TEMPLATE2, template2.getId(), null);
                //---------------
                for(int i = 0; i< contents.length; i++) {
                    Page pageDetail = new Page(i+1, 1, contents.length);
                    News publishNews = new News(news);
                    publishNews.getNewsDetail().setContent(contents[i]);
                    TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                    templatePublishJob.setTemplateBasics(template2);
                    templatePublishJob.setChannelId(news.getChannelId());
                    templatePublishJob.setNewsColumn(newsColumn);
                    templatePublishJob.setPage(i + 1);
                    templatePublishJob.setPageDetail(pageDetail);
                    templatePublishJob.setBase(publishNews);
                    //--------
                    templatePublishJob.setPublishInfo(publishInfo);
                    //--------
                    threadTaskExecutor.execute(templatePublishJob);
                }
            }

        }

        if(news.getPushTag() == PushTagEnum.YES.getType()) {
            List<NewsPushColumn> list = newsBiz.findNewsPushColumnsByNewsId(news.getId());
            if(StringUtils.isNotEmpty(list)){
                List<Long> columnIds = new ArrayList<>();
                List<Long> channelIds = new ArrayList<>();
                for(int i=0;i<list.size();i++){
                    columnIds.add(list.get(i).getColumnId());
                    channelIds.add(list.get(i).getChannelId());
                }
                List<NewsColumn> newsColumns = newsBiz.getNewsColumns(columnIds);
                Map<Long, Channel> channelMap = channelBiz.getChannelsMap(channelIds);
                if(StringUtils.isNotEmpty(newsColumns)) {
                    for (int i = 0; i < newsColumns.size(); i++) {
                        NewsColumn newsColumn = newsColumns.get(i);
                        if(newsColumn.getListTemplate2Id()!=null && newsColumn.getListTemplate2Id() > 0){
                            Template2 template2 = template2Biz.getTemplate2(newsColumn.getListTemplate2Id());
                            if(template2 == null){
                                publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, news.getId(),
                                        TriggerTypeEnum.NEWS, TemplateTypeEnum.NONE, null, "ID为"+ newsColumn.getListTemplate2Id() +" 的列表页第二模版已不存在");
                                continue;
                            }
                            Channel channel = channelMap.get(newsColumn.getChannelId());
                            if(channel == null){
                                publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, news.getId(),
                                        TriggerTypeEnum.NEWS, TemplateTypeEnum.TEMPLATE2, template2.getId(), "ID为"+ newsColumn.getListTemplate2Id() +" 的列表页第二模版的所属频道ID为 " +newsColumn.getChannelId()+" 的频道已不存在");
                                continue;
                            }
                            String listUrl = "";
                            String listRelativePath = "";
                            if(StringUtils.isNotBlank(newsColumn.getPath()) && StringUtils.isNotBlank(newsColumn.getFileName())){
                                if(StringUtils.isNotBlank(StaticContants.indexMap.get(newsColumn.getFileName()))){
                                    listRelativePath = FileUtil.addSuffix(FileUtil.delPrefix(newsColumn.getPath()));
                                }else{
                                    listRelativePath = FileUtil.delPrefix(StringUtils.concatUrl(newsColumn.getPath(), newsColumn.getFileName()));
                                }
                                listUrl = StringUtils.concatUrl(channel.getChannelUrl(), listRelativePath);
                            }else{
                                listRelativePath = FileUtil.delPrefix(StringUtils.concatUrl(template2.getPath(),
                                        newsColumn.getId().toString().concat(StaticContants.HTML_SUFFIX)));
                                listUrl = StringUtils.concatUrl(channel.getChannelUrl(), listRelativePath);
                            }
                            newsColumn.setListUrl(listUrl);
                            newsColumn.setListRelativePath(listRelativePath);

                            newsBiz.publishListTemplate2(newsColumn);

                            TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                            templatePublishJob.setChannelId(news.getChannelId());
                            templatePublishJob.setNewsColumn(newsColumn);
                            templatePublishJob.setTemplateBasics(template2);
                            //--------
                            PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.EXECING, news.getId(),
                                    TriggerTypeEnum.NEWS, TemplateTypeEnum.TEMPLATE2, template2.getId(), null);
                            templatePublishJob.setPublishInfo(publishInfo);
                            //--------
                            threadTaskExecutor.execute(templatePublishJob);

                        }
                    }
                }
            }
        }
    }

    /**
     * 自动定时生成.
     */
    public void buildAuto(){
        List<Template> templates = templateBiz.findTemplateListByAuto();
        this.publishTemplate(templates, null, CommonMessageSourceEnum.OTHER);
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
                commonMessage.setMessage(JSONObject.toJSON(body));
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
    void publishTemplate(List<Template> templates, Base base, CommonMessageSourceEnum sourceEnum){
        if(StringUtils.isNotEmpty(templates)) {
            //this.publishTemplate(templates);
            List<Template> tmplist = new ArrayList<>();
            for (int i = 0; i < templates.size(); i++) {

                //--------
                PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.EXECING, base!=null?base.getId():null,
                        sourceEnum.getTriggerTypeEnum(), TemplateTypeEnum.TEMPLATE, templates.get(i).getId(), null);

                //--------
                if(templates.get(i).getTemplateClassify() == TemplateClassifyEnum.detail.getType()) {
                    if(base instanceof News) {
                        News news = (News) base;
                        String[] contents = HtmlUtils.splitNewsContent(news.getNewsDetail().getContent());
                        for (int j = 0; j < contents.length; j++) {
                            Page pageDetail = new Page(j+1, 1, contents.length);
                            News publishNews = new News(news);
                            publishNews.getNewsDetail().setContent(contents[j]);
                            TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                            templatePublishJob.setPublishInfo(publishInfo);
                            templatePublishJob.setBase(publishNews);
                            templatePublishJob.setPage( j + 1 );
                            templatePublishJob.setPageDetail(pageDetail);
                            templatePublishJob.setTemplateBasics(templates.get(i));
                            threadTaskExecutor.execute(templatePublishJob);
                        }
                    } else {
                        TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                        templatePublishJob.setPublishInfo(publishInfo);
                        templatePublishJob.setBase(base);
                        templatePublishJob.setTemplateBasics(templates.get(i));
                        threadTaskExecutor.execute(templatePublishJob);
                    }
                }else {
                    Channel channel = channelBiz.getChannel(templates.get(i).getChannelId());
                    if(channel == null){
                        publishInfoBiz.recordInfo(PublishStatusEnum.ERROR, base!=null?base.getId():null,
                                sourceEnum.getTriggerTypeEnum(), TemplateTypeEnum.TEMPLATE, templates.get(i).getId(),
                                "ID为"+ templates.get(i).getId() +" 的模版的所属频道ID为 " +templates.get(i).getChannelId()+" 的频道已不存在");
                        continue;
                    }
                    String publishRelativePath = "";
                    if(StringUtils.isNotBlank(StaticContants.indexMap.get(templates.get(i).getFilename()))){
                        publishRelativePath = FileUtil.addSuffix(templates.get(i).getPath());
                    } else {
                        publishRelativePath = StringUtils.concatUrl(templates.get(i).getPath(), templates.get(i).getFilename());
                    }

                    String publishPath = StringUtils.concatUrl(channel.getChannelUrl(), publishRelativePath);

                    templates.get(i).setPublish(PublishEnum.YES.getType());
                    templates.get(i).setPublishRelativePath(FileUtil.delPrefix(publishRelativePath));
                    templates.get(i).setPublishUrl(publishPath);
                    tmplist.add(templates.get(i));
                    TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                    templatePublishJob.setPublishInfo(publishInfo);
                    templatePublishJob.setTemplateBasics(templates.get(i));
                    threadTaskExecutor.execute(templatePublishJob);
                }
            }
            if(StringUtils.isNotEmpty(tmplist)){
                templateBiz.publishTemplates(tmplist);
            }
        }
    }

    /**
     * 模版是否发布过标记
     * @param templates
     */
    @Deprecated
    void publishTemplate(List<Template> templates){
        List<Long> list = new ArrayList<>();
        if(StringUtils.isNotEmpty(templates)) {
            for (int i = 0; i < templates.size(); i++) {
                if(templates.get(i).getTemplateClassify() != TemplateClassifyEnum.detail.getType()){
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
        Date date = new Date();
        if(news.getBuildTime() == null) {
            news.setBuildTime(date);
        }
        if(StringUtils.isBlank(news.getBuildUserId())) {
            news.setBuildUserId(body.getUserId());
        }
        news.setLastModifyUserId(body.getUserId());
        news.setPublish(PublishEnum.YES.getType());
        if(news.getEditPublishTime() == null){
            news.setEditPublishTime(date);
        }
        NewsColumn newsColumn = newsBiz.getNewsColumn(news.getColumnId());
        if(newsColumn!=null && StringUtils.isNotBlank(newsColumn.getPath())){
            news.setRelativePath(StringUtils.concatUrl(FileUtil.delPrefix(newsColumn.getPath()), FileUtil.getDatePath(news.getCreateTime()), String.valueOf(news.getId()).concat(StaticContants.HTML_SUFFIX)));
        } else {
            news.setRelativePath(StringUtils.concatUrl(FileUtil.getDatePath(news.getCreateTime()), String.valueOf(news.getId()).concat(StaticContants.HTML_SUFFIX)));
        }
        news.setUrl(StringUtils.concatUrl(channel.getChannelUrl(), news.getRelativePath()));
        newsBiz.publishNews(news);
    }

    /**
     * 执行专题操作
     * @param topic
     * @param body
     */
    void publishTopic(Topic topic, Body body){
        Channel channel = channelBiz.getChannel(topic.getChannelId());
        if(StringUtils.isNotBlank(StaticContants.indexMap.get(topic.getTopicFilename()))){
            topic.setTopicUrl(StringUtils.concatUrl(channel.getChannelUrl(),topic.getTopicPath()));
        }else {
            topic.setTopicUrl(StringUtils.concatUrl(channel.getChannelUrl(),topic.getTopicPath(),topic.getTopicFilename()));
        }
        topic.setBuildUserId(body.getUserId());
        topic.setLastModifyUserId(body.getUserId());
        topic.setPublish(PublishEnum.YES.getType());
        topic.setBuildTime(new Date());
        topicBiz.publishTopic(topic);
        TopicPublishJob topicPublishJob = new TopicPublishJob(topic,channel);
        //--------
        PublishInfo publishInfo = publishInfoBiz.recordInfo(PublishStatusEnum.EXECING, topic.getId(),
                TriggerTypeEnum.TOPIC, TemplateTypeEnum.NONE, null, null);
        topicPublishJob.setPublishInfo(publishInfo);
        //--------
        threadTaskExecutor.execute(topicPublishJob);
    }




}
