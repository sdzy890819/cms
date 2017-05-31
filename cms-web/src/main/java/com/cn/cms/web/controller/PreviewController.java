package com.cn.cms.web.controller;

import com.cn.cms.biz.*;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.JobEnum;
import com.cn.cms.enums.PublishJobTypeEnum;
import com.cn.cms.enums.RelationTypeEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.po.*;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.VelocityUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
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
 * Created by ADMIN on 16/12/30.
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

    @Resource
    private Template2Biz template2Biz;


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
        try {
            News news = newsBiz.findNewsAndDetail(id);
            if(news == null ){
                throw new BizException(StaticContants.ERROR_NEWS_NOT_FOUND);
            }
            Channel channel = channelBiz.getChannel(news.getChannelId());
            if(channel == null ){
                throw new BizException(StaticContants.ERROR_CHANNEL_NOT_FOUND);
            }
            NewsColumn newsColumn = newsBiz.getNewsColumn(news.getColumnId());
            if(newsColumn == null){
                throw new BizException(StaticContants.ERROR_NEWSCOLUMN_NOT_FOUND);
            }
            TemplateBasics templateBasics = null ;
            String templateFile = null;
            Map<String, Object> map = new HashMap<>();
            if(newsColumn.getDetailTemplate2Id()!=null && newsColumn.getDetailTemplate2Id() > 0){
                templateBasics = template2Biz.getTemplate2(newsColumn.getDetailTemplate2Id());
                Template2Base template2Base = template2Biz.getTemplate2Base();
                templateFile = StringUtils.concatUrl(template2Base.getBasePath(),templateBasics.getPath(),templateBasics.getFilename());
                map.put(StaticContants.TEMPLATE_KEY_COLUMN, newsColumn);
            }else {

                templateBasics = templateBiz.findTemplateByChannel(channel.getId(), TemplateClassifyEnum.detail.getType(),
                        news.getColumnId(), RelationTypeEnum.column.getType(), JobEnum.trigger.getType());
                if (templateBasics == null) {
                    throw new BizException(StaticContants.ERROR_TEMPLATE_NOT_FOUND);
                }
                templateFile = StringUtils.concatUrl(channel.getTemplatePath(),templateBasics.getPath(),templateBasics.getFilename());
            }


            map.put(StaticContants.TEMPLATE_KEY_TEMPLATE, templateBasics);
            map.put(StaticContants.TEMPLATE_KEY_DATA, news);
            map.put(StaticContants.TEMPLATE_TEST_TAG, 1);
            map.put(StaticContants.TEMPLATE_KEY_PAGE, 1);
            map.put(StaticContants.TEMPLATE_KEY_CHANNELID, channel.getId());
            map.put(StaticContants.TEMPLATE_KEY_PUBLISH_JOB_TYPE, PublishJobTypeEnum.template.getType());


            String content = VelocityUtils.parseTemplate(map, templateFile, templateBasics.getEncoded());
            response.getWriter().write(content);
            response.getWriter().flush();
            response.getWriter().close();
        }catch (BizException e){
            log.error("模版解析错误 ",e);
            response.getWriter().write("模版解析错误：" + e.getMessage());
            response.getWriter().flush();
            response.getWriter().close();
        }catch(Exception e){
            log.error("模版解析错误 ",e);
            response.getWriter().write("模版解析错误：" + e.getMessage());
            e.printStackTrace(response.getWriter());
            response.getWriter().flush();
            response.getWriter().close();
        }

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
        try{
            Topic topic = topicBiz.getTopic(id);
            Channel channel = channelBiz.getChannel(topic.getChannelId());
            if(channel == null){
                throw new BizException(StaticContants.ERROR_CHANNEL_NOT_FOUND);
            }
            if(topic == null ){
                throw new BizException(StaticContants.ERROR_TOPIC_NOT_FOUND);
            }

            Map<String, Object> map = new HashMap<>();
            map.put(StaticContants.TEMPLATE_KEY_DATA, topic);
            if(channel!=null) {
                map.put(StaticContants.TEMPLATE_KEY_CHANNELID, channel.getId());
            }
            map.put(StaticContants.TEMPLATE_KEY_PUBLISH_JOB_TYPE, PublishJobTypeEnum.topic.getType());
            map.put(StaticContants.TEMPLATE_KEY_PAGE, 1);
            map.put(StaticContants.TEMPLATE_TEST_TAG, 1);
            map.put(StaticContants.TEMPLATE_KEY_DATA, topic);
            String content = VelocityUtils.parse(map, topic.getTopicContent());
            response.getWriter().write(content);
            response.getWriter().flush();
            response.getWriter().close();
        }catch (BizException e){
            log.error("模版解析错误 ",e);
            response.getWriter().write("模版解析错误：" + e.getMessage());
            response.getWriter().flush();
            response.getWriter().close();
        }catch(Exception e){
            log.error("模版解析错误 ",e);
            response.getWriter().write("模版解析错误：" + e.getMessage());
            e.printStackTrace(response.getWriter());
            response.getWriter().flush();
            response.getWriter().close();
        }
        return null;
    }

}
