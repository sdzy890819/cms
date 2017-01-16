package com.cn.cms.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.po.Channel;
import lombok.Getter;
import lombok.Setter;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

/**
 * Created by zhangyang on 16/12/28.
 */
public class Test {

    private static final CommonLog log = CommonLogFactory.getLog(Test.class);

    public static String getConnStrForPOST(String urlPath,String encoding,String param){
        HttpURLConnection urlconn = null;
        StringBuffer sbf  = new StringBuffer();
        try{
            URL url = new URL(urlPath);
            urlconn = (HttpURLConnection)url.openConnection();
            urlconn.setRequestMethod("POST");
            urlconn.setDoOutput(true);
            urlconn.setConnectTimeout(1000);
            urlconn.setReadTimeout(2000);
            urlconn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            urlconn.connect();
            OutputStreamWriter osw = new OutputStreamWriter(urlconn.getOutputStream(),encoding);
            osw.write(param);
            osw.flush();
            osw.close();
            if(urlconn.getResponseCode() == 200){
                BufferedReader br = new BufferedReader(new InputStreamReader(urlconn.getInputStream(),encoding));
                while(br.ready()){
                    sbf.append(br.readLine());
                }
                br.close();
                urlconn.disconnect();
            }
            return sbf.toString();
        }catch(Exception e){
            log.error("获取URL:"+urlPath+"错误:"+e.getMessage());
            e.printStackTrace();
        }finally{
            if(urlconn!=null){
                urlconn.disconnect();
            }
            log.info("请求的接口地址："+urlPath+"    输出内容为："+sbf.toString());
        }
        return null;
    }

    public static void main(String []args) {
        String str = "{\"data\":{\"channelName\":\"aaaaaa\"}}";
        A<Channel> a = JSONObject.parseObject(str ,new TypeReference<A<Channel>>(){});
        Channel channel = a.getData();
        System.out.println(channel.getChannelName());
    }



}

@Getter
@Setter
class A<T>{
    private T data;
}