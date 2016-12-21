package com.cn.cms.message.common;

import com.alibaba.fastjson.JSONObject;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.support.converter.AbstractMessageConverter;
import org.springframework.amqp.support.converter.MessageConversionException;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

/**
 * Created by zhangyang on 16/11/10.
 */
@Component
public class JsonMessageConverter extends AbstractMessageConverter {

    public static final String DEFAULT_CHARSET = "UTF-8";

    private volatile String defaultCharset = DEFAULT_CHARSET;

    public JsonMessageConverter(){
        super();
    }

    public void setDefaultCharset(String defaultCharset) {
        this.defaultCharset = (defaultCharset != null) ? defaultCharset
                : DEFAULT_CHARSET;
    }



    protected Message createMessage(Object object, MessageProperties messageProperties) {
        byte[] bytes = null;
        try {
            String jsonString = JSONObject.toJSONString(object);
            bytes = jsonString.getBytes(this.defaultCharset);
        } catch (UnsupportedEncodingException e) {
            throw new MessageConversionException(
                    "Failed to convert Message content", e);
        }
        messageProperties.setContentType(MessageProperties.CONTENT_TYPE_JSON);
        messageProperties.setContentEncoding(this.defaultCharset);
        if (bytes != null) {
            messageProperties.setContentLength(bytes.length);
        }
        return new Message(bytes, messageProperties);

    }

    public Object fromMessage(Message message) throws MessageConversionException {
        Object o = new CommonMessage();
        try{
            o = fromMessage(message, new CommonMessage());
        }catch(Exception e){
            e.printStackTrace();
        }
        return o;
    }

    public <T> T fromMessage(Message message, T t) {
        String json = "";
        try {
            json = new String(message.getBody(), defaultCharset);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return (T) JSONObject.parseObject(json, t.getClass());
    }
}
