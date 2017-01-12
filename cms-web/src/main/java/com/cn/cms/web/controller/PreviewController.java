package com.cn.cms.web.controller;

import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.TemplateBiz;
import com.cn.cms.biz.TopicBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.JobEnum;
import com.cn.cms.enums.RelationTypeEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.po.Channel;
import com.cn.cms.po.News;
import com.cn.cms.po.Template;
import com.cn.cms.po.Topic;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.VelocityUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/30.
 */

@Controller
@RequestMapping(value = "/webapi/")
public class PreviewController extends BaseController {

    @Resource
    private NewsBiz newsBiz;

    @Resource
    private ChannelBiz channelBiz;

    @Resource
    private TemplateBiz templateBiz;

    @Resource
    private TopicBiz topicBiz;


    /**
     * 根据nginx跳转映射来做预览操作。 传递newsId
     * 如果需要预览的话 必须要满足、在新闻当前频道下、并且栏目对应的模版。才可以预览。否则预览失败
     * @param response
     * @param id
     * @return
     * @throws IOException
     */
    @CheckToken
    @CheckAuth( name = "news:preview" )
    @RequestMapping(value = "/news/preview", method = RequestMethod.GET ,produces = "text/html; charset=UTF-8")
    public String preview(HttpServletResponse response,
                          @RequestParam(value = "id") Long id) throws IOException, BizException {
        News news = newsBiz.findNews(id);
        if(news == null ){
            throw new BizException(StaticContants.ERROR_NEWS_NOT_FOUND);
        }
        Channel channel = channelBiz.getChannel(news.getChannelId());
        if(channel == null ){
            throw new BizException(StaticContants.ERROR_CHANNEL_NOT_FOUND);
        }
        Template template = templateBiz.findTemplateByChannel(channel.getId(), TemplateClassifyEnum.detail.getType(),
                news.getColumnId(), RelationTypeEnum.column.getType(), JobEnum.trigger.getType());
        if(template == null){
            throw new BizException(StaticContants.ERROR_TEMPLATE_NOT_FOUND);
        }
        String templateFile = StringUtils.concatUrl(channel.getTemplatePath(),template.getPath(),template.getFilename());
        Map<String, Object> map = new HashMap<>();
        map.put(StaticContants.TEMPLATE_KEY_TEMPLATE, template);
        map.put(StaticContants.TEMPLATE_KEY_DATA, news);
        String content = VelocityUtils.parseTemplate(map, templateFile, template.getEncoded());
        response.getWriter().write(content);
        response.getWriter().flush();
        response.getWriter().close();
        return null;
    }


    /**
     * 根据nginx跳转映射来做预览操作。 传递topicId
     * @param response
     * @param id
     * @return
     * @throws IOException
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "topic:preview" )
    @RequestMapping(value = "/topic/preview", method = RequestMethod.GET ,produces = "text/html; charset=UTF-8")
    public String preview2(HttpServletResponse response,
                          @RequestParam(value = "id") Long id) throws IOException, BizException {
        Topic topic = topicBiz.getTopic(id);
        if(topic == null ){
            throw new BizException(StaticContants.ERROR_TOPIC_NOT_FOUND);
        }

        Map<String, Object> map = new HashMap<>();
        map.put(StaticContants.TEMPLATE_KEY_DATA, topic);
        String content = VelocityUtils.parse(map, topic.getTopicContent());
        response.getWriter().write(content);
        response.getWriter().flush();
        response.getWriter().close();
        return null;
    }

}
