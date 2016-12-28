package com.cn.cms.job;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.TemplateBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.po.Base;
import com.cn.cms.po.Channel;
import com.cn.cms.po.News;
import com.cn.cms.po.Template;
import com.cn.cms.utils.ContextUtil;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.VelocityUtils;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/24.
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
     * 模版信息.
     */
    private Template template;

    /**
     * 列表页使用
     */
    private Integer page = StaticContants.PAGE;

    private ChannelBiz channelBiz = ContextUtil.getContextUtil().getBean(ChannelBiz.class);

    private NewsBiz newsBiz = ContextUtil.getContextUtil().getBean(NewsBiz.class);


    public TemplatePublishJob(){}

    public TemplatePublishJob(Base base, Template template, Integer page){
        this.base = base;
        this.template = template;
        this.page = page;
    }

    @Override
    protected void execute(){
        Channel channel = channelBiz.getChannel(template.getChannelId());
        Map<String, Object> map = new HashMap<>();
        map.put(StaticContants.TEMPLATE_KEY_TEMPLATE, template);
        map.put(StaticContants.TEMPLATE_KEY_DATA, base);
        map.put(StaticContants.TEMPLATE_KEY_PAGE, page);
        if(template.getTemplateClassify() == TemplateClassifyEnum.detail.getType()) {
            News news = (News)base;
            String publishPath = StringUtils.concatUrl(channel.getChannelPath(),news.getRelativePath());
            VelocityUtils.publish(map, StringUtils.concatUrl(channel.getTemplatePath(), template.getPath(), template.getFilename()),
                    publishPath, template.getEncoded());
        }else{
            String publishPath = StringUtils.concatUrl(channel.getChannelPath(), template.getPath(), FileUtil.getFileNameByPage(template.getFilename(),getPage()));
            VelocityUtils.publish(map, StringUtils.concatUrl(channel.getTemplatePath(), template.getPath(), template.getFilename()),
                    publishPath, template.getEncoded());
        }

    }

    @Override
    protected String getJobName() {
        return getTemplate().getTemplateName().concat(" 生成");
    }
}
