package com.cn.cms.template.directive;

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
 * #TAGDetail(String resultObjName, Integer type, String content)
 * Created by zhangyang on 16/12/23.
 */
@Getter
@Setter
public class TAGDetail extends Directive {

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
        return LINE;
    }

    @Override
    public boolean render(InternalContextAdapter context, Writer writer, Node node)
            throws IOException, ResourceNotFoundException, ParseErrorException, MethodInvocationException {

        for(int i=0; i<node.jjtGetNumChildren(); i++) {
            if (node.jjtGetChild(i) != null ) {
                if(!(node.jjtGetChild(i) instanceof ASTBlock)) {
                    String a = (String)node.jjtGetChild(i).value(context);
                } else {
                    node.jjtGetChild(i).render(context, writer);
                    break;
                }
            }
        }
        return true;
    }
}
