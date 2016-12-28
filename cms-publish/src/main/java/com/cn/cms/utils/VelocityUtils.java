package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Created by zhangyang on 16/12/21.
 */
public class VelocityUtils {

    private static final CommonLog log = CommonLogFactory.getLog(VelocityUtils.class);

    private static final Properties prop = new Properties();

    static{
        prop.put("userdirective","com.cn.cms.template.directive.TAGList," +
                "com.cn.cms.template.directive.TAGDetail");
    }


    /**
     * 解析代码片段
     * @param str
     * @param map
     * @return
     */
    public static StringWriter publish(String str, Map<String, Object> map){
        VelocityEngine velocityEngine = new VelocityEngine(prop);
        VelocityContext context = new VelocityContext(map);
        StringWriter writer = new StringWriter();
        velocityEngine.evaluate(context, writer, StaticContants.PUBLISH_TMP_TEMPLATE_NAME, str);
        return writer;
    }

    /**
     * 根据内容文件发布
     * @param map
     * @param content
     * @param publishFile
     */
    public static void publish(Map<String, Object> map, String content, String publishFile){
        VelocityEngine velocityEngine = new VelocityEngine(prop);
        VelocityContext context = new VelocityContext(map);
        File file = new File(publishFile);
        FileUtil.mkdir(file);
        try {
            FileWriter fileWriter = new FileWriter(file);
            velocityEngine.evaluate(context, fileWriter, StaticContants.PUBLISH_TMP_TEMPLATE_NAME, content);
            fileWriter.flush();
            fileWriter.close();
        }catch (IOException e){
            log.error("发布模版出现错误" ,e);
        }

    }

    /**
     * 文件发布。
     * @param map
     * @param templateFile
     * @param publishFile
     * @param encode
     */
    public static void publish(Map<String, Object> map, String templateFile,
                               String publishFile, String encode){
        VelocityEngine velocityEngine = new VelocityEngine(prop);
        VelocityContext context = new VelocityContext(map);
        File file = new File(publishFile);
        FileUtil.mkdir(file);
        try {
            FileWriter fileWriter = new FileWriter(file);
            velocityEngine.mergeTemplate(templateFile, encode, context, fileWriter);
            fileWriter.flush();
            fileWriter.close();
        } catch (IOException e) {
            log.error("发布模版出现错误" ,e);
        }
    }

    /**
     * Test
     * @param args
     */
    public static void main(String[] args){
        Map<String, Object> objectMap = new HashMap<>();
        objectMap.put("page", 1);
        publish("#TAGList() ABC #end", objectMap);
    }

}
