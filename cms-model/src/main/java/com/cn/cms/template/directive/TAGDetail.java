package com.cn.cms.template.directive;

import com.cn.cms.biz.*;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.TAGDetailTypeEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.po.Fragment;
import com.cn.cms.po.News;
import com.cn.cms.utils.ContextUtil;
import lombok.Getter;
import lombok.Setter;
import org.apache.velocity.context.InternalContextAdapter;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.apache.velocity.runtime.directive.Directive;
import org.apache.velocity.runtime.parser.node.ASTBlock;
import org.apache.velocity.runtime.parser.node.Node;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.Writer;

/**
 * resultObjName:"返回的对象名"
 * type:参考TAGDETAIL
 * content:传递ID或者SQL
 * #TAGDETAIL(String resultObjName,Integer type, String content)
 * #end
 * Created by ADMIN on 16/12/21.
 */
@Getter
@Setter
public class TAGDetail extends Directive {

    private CommonLog log = CommonLogFactory.getLog(TAGDetail.class);

    private NewsBiz newsBiz = ContextUtil.getContextUtil().getBean(NewsBiz.class);

    private ChannelBiz channelBiz = ContextUtil.getContextUtil().getBean(ChannelBiz.class);

    private CategoryBiz categoryBiz = ContextUtil.getContextUtil().getBean(CategoryBiz.class);

    private TopicBiz topicBiz = ContextUtil.getContextUtil().getBean(TopicBiz.class);

    private FragmentBiz fragmentBiz = ContextUtil.getContextUtil().getBean(FragmentBiz.class);

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

    @Override
    public String getName() {
        return StaticContants.TAG_DETAIL;
    }

    @Override
    public int getType() {
        return BLOCK;
    }

    @Override
    public boolean render(InternalContextAdapter context, Writer writer, Node node)
            throws IOException, ResourceNotFoundException, ParseErrorException, MethodInvocationException {
        try {
            for (int i = 0; i < node.jjtGetNumChildren(); i++) {
                if (node.jjtGetChild(i) != null) {
                    if (!(node.jjtGetChild(i) instanceof ASTBlock)) {
                        if (i == 0) {
                            resultObjName = (String) node.jjtGetChild(0).value(context);
                        } else if (i == 1) {
                            type = (Integer) node.jjtGetChild(1).value(context);
                        } else if (i == 2) {
                            content = (String) node.jjtGetChild(2).value(context);
                        }
                    } else {
                        parse(context);
                        node.jjtGetChild(i).render(context, writer);
                        break;
                    }
                }
            }
            return true;
        }catch (Exception e){
            log.error("TAGDETAIL 标签提取数据错误. ", e);
        }
        return false;
    }

    public void parse(InternalContextAdapter context){
        Object object= null;
        TAGDetailTypeEnum detailType = TAGDetailTypeEnum.get(type);
        switch (detailType){
            case NEWSID:{
                object = newsBiz.findNewsAndDetail(Long.parseLong(content));
                break;
            }
            case NEWSCOLUMNID:{
                object = newsBiz.getNewsColumn(Long.parseLong(content));
                break;
            }
            case CHANNELID:{
                object = channelBiz.getChannel(Long.parseLong(content));
                break;
            }
            case CATEGORYID:{
                object = categoryBiz.getCategory(Long.parseLong(content));
                break;
            }
            case TOPICID:{
                object = topicBiz.getTopic(Long.parseLong(content));
                break;
            }
            case TOPICCLASSIFY:{
                object = topicBiz.getTopicClassify(Long.parseLong(content));
                break;
            }
            case TOPICCOLUMNID:{
                object = topicBiz.getTopicColumn(Long.parseLong(content));
                break;
            }
            case FRAGMENTID:{
                object = fragmentBiz.findFragment(Long.parseLong(content));
                break;
            }
            case SQL:{
                object = otherBiz.getMap(content);
                break;
            }
            default: {
                break;
            }
        }
        context.put(resultObjName, object);
    }
}
