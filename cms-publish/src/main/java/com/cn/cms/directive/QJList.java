package com.cn.cms.directive;

import com.cn.cms.contants.StaticContants;
import lombok.Getter;
import lombok.Setter;
import org.apache.velocity.context.InternalContextAdapter;
import org.apache.velocity.exception.MethodInvocationException;
import org.apache.velocity.exception.ParseErrorException;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.apache.velocity.runtime.directive.Directive;
import org.apache.velocity.runtime.parser.node.ASTBlock;
import org.apache.velocity.runtime.parser.node.Node;

import java.io.IOException;
import java.io.Writer;

/**
 *
 * resultObjName:"返回的对象名"
 * type:1-新闻栏目、2-系列专题、3-专题分类名、4-碎片分类ID、5-SQL
 * content:如果新闻栏目就是栏目号，如果是系列专题就是系列专题号、如果是专题分类名就是专题分类名、依次类推
 * count:总数。需要的总数
 * size:20
 * #QJList(String resultObjName,Integer type, String content, Integer count, Integer size)
 * #end
 * Created by zhangyang on 16/12/21.
 */
@Getter
@Setter
public class QJList extends Directive {

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
        for(int i=0; i<node.jjtGetNumChildren(); i++) {
            if (node.jjtGetChild(i) != null ) {
                if(!(node.jjtGetChild(i) instanceof ASTBlock)) {
                    //reading and casting inline parameters
                    if( i == 0 ) {
                        resultObjName = (String) node.jjtGetChild(0).value(context);
                    }else if( i == 1 ){
                        type = (Integer) node.jjtGetChild(1).value(context);
                    }else if( i == 2 ){
                        content = (String) node.jjtGetChild(2).value(context);
                    }
                } else {
                    node.jjtGetChild(i).render(context, writer);
                    break;
                }
            }
        }
        return true;
    }
}
