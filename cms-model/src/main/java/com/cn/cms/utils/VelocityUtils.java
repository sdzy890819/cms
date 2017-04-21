package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.exception.BizException;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.apache.velocity.tools.generic.DateTool;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/21.
 */
public class VelocityUtils {

    private static final CommonLog log = CommonLogFactory.getLog(VelocityUtils.class);

    private static final Properties prop = new Properties();

    static{
        prop.put("userdirective","com.cn.cms.template.directive.TAGList," +
                "com.cn.cms.template.directive.TAGDetail");
        prop.put(Velocity.FILE_RESOURCE_LOADER_PATH, "/");
        prop.put(Velocity.RUNTIME_LOG_LOGSYSTEM_CLASS, "org.apache.velocity.runtime.log.SimpleLog4JLogSystem");
        prop.put("runtime.log.logsystem.log4j.category", "velocity_log");
        prop.put("runtime.log.error.stacktrace", "false");
        prop.put("runtime.log.warn.stacktrace", "false");
        prop.put("runtime.log.info.stacktrace", "false");
        prop.put("runtime.log.invalid.reference", "true");
        prop.put("directive.foreach.counter.initial.value", "1");
        prop.put("directive.foreach.counter.name", "velocityCount");
    }

    /**
     * 加载
     * @param map
     */
    public static void loadMap(Map<String, Object> map){
        if(map!=null) {
            map.put("dateTools", new DateTool());
            map.put("stringTools", StringUtils.class);
        }
    }

    /**
     * 解析代码片段
     * @param map
     * @param str
     * @return
     */
    public static String parse(Map<String, Object> map, String str) throws BizException{
        loadMap(map);
        VelocityEngine velocityEngine = new VelocityEngine(prop);
        VelocityContext context = new VelocityContext(map);

        try {
            StringWriter writer = new StringWriter();
            velocityEngine.evaluate(context, writer, StaticContants.PUBLISH_TMP_TEMPLATE_NAME, str);
            writer.flush();
            writer.close();
            return writer.toString();
        } catch (IOException e) {
            throw new BizException("预览模版出现错误", e);
        }
    }

    /**
     * 根据内容文件发布
     * @param map
     * @param content
     * @param publishFile
     */
    public static void publish(Map<String, Object> map, String content, String publishFile){
        loadMap(map);
        log.info("生成目录：" + publishFile +  " 根据内容文件发布发布开始");
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
        loadMap(map);
        log.info("模版文件：" + templateFile + ", 生成目录：" + publishFile + ", 编码：" + encode + " 文件发布开始");
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
     * 解析模版，返回字符串
     * @param map
     * @param templateFile
     * @param encode
     * @return
     */
    public static String parseTemplate(Map<String, Object> map,
                                       String templateFile,
                                       String encode) throws BizException{
        loadMap(map);
        VelocityEngine velocityEngine = new VelocityEngine(prop);
        VelocityContext context = new VelocityContext(map);
        try {
            StringWriter stringWriter = new StringWriter();
            velocityEngine.mergeTemplate(templateFile, encode, context, stringWriter);
            stringWriter.flush();
            stringWriter.close();
            return stringWriter.toString();
        } catch (IOException e) {
            throw new BizException("预览模版出现错误", e);
        } catch (ResourceNotFoundException e){
            throw new BizException("模版找不到,请上传模版，模版位置：" + templateFile , e);
        }
    }

    /**
     * Test
     * @param args
     */
    public static void main(String[] args) throws BizException{
        Map<String, Object> objectMap = new HashMap<>();
        parse(objectMap, "#TAGDETAIL(\"test\",1,\"shi\") ${test} #end");
    }

}
