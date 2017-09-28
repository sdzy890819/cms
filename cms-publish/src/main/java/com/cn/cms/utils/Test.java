package com.cn.cms.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import lombok.Getter;
import lombok.Setter;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

/**
 * Created by ADMIN on 16/12/28.
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
//        String str = "{\"data\":{\"channelName\":\"aaaaaa\"}}";
//        A<Channel> a = JSONObject.parseObject(str ,new TypeReference<A<Channel>>(){});
//        Channel channel = a.getData();
//        System.out.println(channel.getChannelName());
//        System.out.println(StaticContants.OS_NAME);
        //System.out.println(JSONObject.toJSONString(ErrorCodeEnum.ERROR_CODE_DEFAULT, StaticContants.config));
//        String path = "//data/template中国/aa.html";
//        System.out.println(path = path.replaceAll("//", "/"));
//        System.out.println(EncryptUtil.md5(path));
//        String path1 = "/data/template中国/aa.html";
//        System.out.println(path1 = path1.replaceAll("//", "/"));
//        System.out.println(EncryptUtil.md5(path1));
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("abc", "777");
//        Set<String> set  = new HashSet<>();
//        set.add(jsonObject.toJSONString());
//        Iterator<String> it = set.iterator();
//        JSONArray jsonArray = new JSONArray();
//        while(it.hasNext()){
//            JSONObject jsonObject1 = JSONObject.parseObject(it.next());
//            jsonArray.add(jsonObject1);
//        }
//        System.out.println(jsonArray.getJSONObject(0).getString("abc"));
//        Page pageDetail = new Page(1, 1, 3);
//        System.out.println(pageDetail.getNextPage());
//        File file =new File("/Users/zhangyang/Documents/projects/cms/documents/build1.sh");
//        System.out.println(file.exists());


        System.out.println("最新 世界 ,价值".replaceAll("[\\s，,]+", ","));
        List<String> a  = new ArrayList<>();
        a.add("aaa");
        List<String> b = null;
        a.addAll(b);

    }



}

@Getter
@Setter
class A<T>{
    private T data;
}