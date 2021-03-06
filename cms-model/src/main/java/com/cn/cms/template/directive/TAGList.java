package com.cn.cms.template.directive;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.OtherBiz;
import com.cn.cms.biz.TopicBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PublishJobTypeEnum;
import com.cn.cms.enums.TAGListTypeEnum;
import com.cn.cms.job.TemplatePublishJob;
import com.cn.cms.job.TopicPublishJob;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.po.Base;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.po.TemplateBasics;
import com.cn.cms.po.Topic;
import com.cn.cms.utils.ContextUtil;
import com.cn.cms.utils.Page;
import lombok.Getter;
import lombok.Setter;
import org.apache.velocity.context.InternalContextAdapter;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.apache.velocity.runtime.directive.Directive;
import org.apache.velocity.runtime.parser.node.ASTBlock;
import org.apache.velocity.runtime.parser.node.Node;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.io.IOException;
import java.io.Writer;
import java.util.List;

/**
 *
 * resultObjName:"返回的对象名"
 * type:1-新闻栏目、2-系列专题、3-专题分类、4、新闻推荐栏目. 5-SQL
 * content:如果新闻栏目就是栏目号，如果是系列专题就是系列专题号、如果是专题分类名就是专题分类名、依次类推
 * count:总数。需要的总数
 * size:20
 * #TAGList(String resultObjName,Integer type, String content, Integer count, Integer size, Integer offset)
 * #end
 * Created by ADMIN on 16/12/21.
 */
@Getter
@Setter
public class TAGList extends Directive {

    private CommonLog log = CommonLogFactory.getLog(TAGList.class);

    private ThreadPoolTaskExecutor threadTaskExecutor = ContextUtil.getContextUtil().getBean("threadTaskExecutor",ThreadPoolTaskExecutor.class);

    private NewsBiz newsBiz = ContextUtil.getContextUtil().getBean(NewsBiz.class);

    private TopicBiz topicBiz = ContextUtil.getContextUtil().getBean(TopicBiz.class);

    private OtherBiz otherBiz = ContextUtil.getContextUtil().getBean(OtherBiz.class);

    /**
     * 返回的对象名
     */
    private String resultObjName;

    /**
     * 类型
     */
    private Integer type;

    /**
     * 内容.根据类型不同输入不同的内容
     */
    private String content;

    /**
     * 总数
     */
    private Integer count;

    /**
     * 每页大小
     */
    private Integer size;

    /**
     * 测试标记
     */
    private Integer testTag;

    /**
     * 偏移量
     */
    private Integer offset = 0;

    //------------------------------------------
    private NewsColumn newsColumn;

    private Base data;

    private TemplateBasics template ;

    private Integer page;

    private Long channelId;

    private Integer model;
    //------------------------------------------


    @Override
    public String getName() {
        return StaticContants.TAG_LIST;
    }

    @Override
    public int getType() {
        return BLOCK;
    }

    @Override
    public boolean render(InternalContextAdapter context, Writer writer, Node node)
            throws IOException, ResourceNotFoundException, ParseErrorException, MethodInvocationException {
        try {
            page = (Integer) context.get(StaticContants.TEMPLATE_KEY_PAGE);
            data = (Base) context.get(StaticContants.TEMPLATE_KEY_DATA);
            template = (TemplateBasics) context.get(StaticContants.TEMPLATE_KEY_TEMPLATE);
            channelId = (Long) context.get(StaticContants.TEMPLATE_KEY_CHANNELID);
            model = (Integer) context.get(StaticContants.TEMPLATE_KEY_PUBLISH_JOB_TYPE);
            newsColumn = (NewsColumn) context.get(StaticContants.TEMPLATE_KEY_COLUMN);
            testTag = (Integer) context.get(StaticContants.TEMPLATE_TEST_TAG);
            for (int i = 0; i < node.jjtGetNumChildren(); i++) {
                if (node.jjtGetChild(i) != null) {
                    if (!(node.jjtGetChild(i) instanceof ASTBlock)) {
                        if (i == 0) {
                            resultObjName = (String) node.jjtGetChild(0).value(context);
                        } else if (i == 1) {
                            type = (Integer) node.jjtGetChild(1).value(context);
                        } else if (i == 2) {
                            content = (String) node.jjtGetChild(2).value(context);
                        } else if (i == 3) {
                            count = (Integer) node.jjtGetChild(3).value(context);
                        } else if (i == 4) {
                            size = (Integer) node.jjtGetChild(4).value(context);
                        } else if (i == 5) {
                            Object offsetObj = node.jjtGetChild(5).value(context);
                            if(offsetObj!=null) {
                                offset = (Integer) offsetObj;
                            }
                        }
                    } else {
                        parse(context);
                        node.jjtGetChild(i).render(context, writer);
                        break;
                    }
                }
            }
            return true;
        }catch(Exception e){
            log.error("TAGLIST 标签数据提取错误。" ,e);
        }
        return false;
    }

    public void parse(InternalContextAdapter context){
        if(page == null){
            page = 1;
        }
        if(count == null || count == 0) {
            count = StaticContants.TEMPLATE_COUNT;
        }
        if(size == null || size == 0){
            size = StaticContants.TEMPLATE_SIZE;
        }
        Page pageObj = new Page(page, size);
        if(offset !=null && offset > 0){
            pageObj.setOffset(offset);
        }
        TAGListTypeEnum tagListTypeEnum = TAGListTypeEnum.get(type);
        List<?> list = null;
        switch (tagListTypeEnum){
            case NEWCOLUMN:{
                list = newsBiz.findNewsByColumnId(Long.parseLong(content), pageObj);
                break;
            }
            case TOPICCOLUMN:{
                list = topicBiz.findTopicByColumn(Long.parseLong(content), pageObj);
                break;
            }
            case TOPICCLASSIFY:{
                list = topicBiz.findTopicByClassify(Long.parseLong(content), pageObj);
                break;
            }
            case RECOMMENDCOLUMN:{
                list = newsBiz.findNewsListByRecommedColumnId(Long.parseLong(content), pageObj);
                break;
            }
            case SQL:{
                list = otherBiz.getList(content, pageObj);
                break;
            }
            default:{
                break;
            }
        }
        if(pageObj.getCount()!=null && pageObj.getCount()>count){
            pageObj.setCount(count);
        }
        context.put(resultObjName, list);
        context.put(StaticContants.TEMPLATE_KEY_PAGE_LIST , pageObj);
        if(pageObj.hasNextPage() && list!=null && list.size() >= pageObj.getPageSize() && (testTag == null || testTag < 1)){
            if(model!=null && model == PublishJobTypeEnum.template.getType()) {
                TemplatePublishJob templatePublishJob = new TemplatePublishJob();
                templatePublishJob.setBase(data);
                templatePublishJob.setTemplateBasics(template);
                templatePublishJob.setChannelId(channelId);
                templatePublishJob.setNewsColumn(newsColumn);
                templatePublishJob.setPage(pageObj.getNextPage());
                threadTaskExecutor.execute(templatePublishJob);
            }else if(model!=null && model == PublishJobTypeEnum.topic.getType()){
                if(data instanceof Topic) {
                    Topic tmp = (Topic) data;
                    TopicPublishJob topicPublishJob = new TopicPublishJob(tmp, channelId, pageObj.getNextPage());
                    threadTaskExecutor.execute(topicPublishJob);
                }
            }
        }
    }

}
