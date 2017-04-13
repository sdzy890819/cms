package com.cn.cms.job;

import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.Template2Biz;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PublishJobTypeEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.*;
import com.cn.cms.utils.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/24.
 */
@Getter
@Setter
public class TemplatePublishJob extends BaseTask {

    private static CommonLog log = CommonLogFactory.getLog(TemplatePublishJob.class);

    /**
     * 详情页使用
     */
    private Base base;

    /**
     * 新闻栏目
     */
    private NewsColumn newsColumn;

    /**
     * 模版信息.
     */
    private TemplateBasics templateBasics;

    /**
     * 列表页使用
     */
    private Integer page = StaticContants.PAGE;

    private Long channelId;

    private ChannelBiz channelBiz = ContextUtil.getContextUtil().getBean(ChannelBiz.class);

    private JedisClient jedisClient = ContextUtil.getContextUtil().getBean(JedisClient.class);

    private NewsBiz newsBiz = ContextUtil.getContextUtil().getBean(NewsBiz.class);

    private Template2Biz template2Biz = ContextUtil.getContextUtil().getBean(Template2Biz.class);

    private static int MODEL = PublishJobTypeEnum.template.getType();

    public TemplatePublishJob(){}

    public TemplatePublishJob(Base base, TemplateBasics templateBasics, Integer page){
        this.base = base;
        this.templateBasics = templateBasics;
        this.page = page;
    }

    @Override
    protected void execute(){
        Map<String, Object> map = new HashMap<>();
        map.put(StaticContants.TEMPLATE_KEY_TEMPLATE, templateBasics);
        map.put(StaticContants.TEMPLATE_KEY_DATA, base);
        map.put(StaticContants.TEMPLATE_KEY_PAGE, page);
        map.put(StaticContants.TEMPLATE_KEY_CHANNELID, channelId);
        map.put(StaticContants.TEMPLATE_KEY_PUBLISH_JOB_TYPE, MODEL);
        map.put(StaticContants.TEMPLATE_KEY_COLUMN, newsColumn);
        Channel channel ;
        String templatePath;
        if(templateBasics instanceof Template2){
            channel = channelBiz.getChannel(channelId);
            Template2Base template2Base = template2Biz.getTemplate2Base();
            templatePath = template2Base.getBasePath();

        }else{
            Template template = (Template) templateBasics;
            channel = channelBiz.getChannel(template.getChannelId());
            templatePath = channel.getTemplatePath();

        }
        String publishPath;
        String fromPath;
        String publishRelativePath;
        if(templateBasics.getTemplateClassify() == TemplateClassifyEnum.detail.getType()) {
            News news = (News)base;
            publishRelativePath = FileUtil.getFileNameByPage(news.getRelativePath(), getPage());
            publishPath = StringUtils.concatUrl(channel.getChannelPath(),publishRelativePath);
            fromPath = StringUtils.concatUrl(templatePath, templateBasics.getPath(), templateBasics.getFilename());
        }else{
            if(templateBasics instanceof Template2 && templateBasics.getTemplateClassify() == TemplateClassifyEnum.list.getType() && newsColumn != null){
                publishRelativePath = StringUtils.concatUrl(templateBasics.getPath(), FileUtil.getFileNameByPage(newsColumn.getId().toString().concat(StaticContants.HTML_SUFFIX), getPage()));
                publishPath = StringUtils.concatUrl(channel.getChannelPath(), publishRelativePath);

            }else{
                publishRelativePath = StringUtils.concatUrl(templateBasics.getPath(), FileUtil.getFileNameByPage(templateBasics.getFilename(),getPage()));
                publishPath = StringUtils.concatUrl(channel.getChannelPath(), publishRelativePath);
            }

            fromPath = StringUtils.concatUrl(templatePath, templateBasics.getPath(), templateBasics.getFilename());
        }
        try {
            if (lock(publishPath)) {
                VelocityUtils.publish(map, fromPath,
                        publishPath, templateBasics.getEncoded());

                if (StaticContants.rsyncRoot == StaticContants.RSYNC_ON) {
                    RsyncUtils.rsync(channel.getRsyncModelName(), StringUtils.delFirstPrefix(publishRelativePath, StaticContants.FILE_PATH_SP), StaticContants.rsyncPublishFile, channel.getChannelPath());
                }
            }
        }finally {
            unlock(publishPath);
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
        jedisClient.del(RedisKeyContants.getRedisLockKey(path));
    }

    protected String getKey(String path){
        return EncryptUtil.md5(path.replaceAll("//", "/"));
    }

    @Override
    protected String getJobName() {
        return "模版名：".concat(getTemplateBasics().getTemplateName()).concat("页码：").concat(String.valueOf(page)).concat(" 生成");
    }
}
