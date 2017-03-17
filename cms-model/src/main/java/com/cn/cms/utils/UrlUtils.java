package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.exception.BizException;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/17.
 */
public class UrlUtils {

    private static CommonLog log = CommonLogFactory.getLog(UrlUtils.class);

    private static String BOUNDARY = "---------qwertya1234";



    public static void connect(String urlPath, String method) throws Exception{
        URL url = new URL(urlPath);
        HttpURLConnection urlconn = (HttpURLConnection)url.openConnection();
        urlconn.setRequestMethod(method);
        urlconn.setConnectTimeout(1000);
        urlconn.setReadTimeout(2000);
        urlconn.connect();

        if(urlconn.getResponseCode() == 404){
            throw new BizException("文件已不存在");
        }
        if(urlconn.getResponseCode() != 202){
            throw new BizException(urlconn.getResponseMessage());
        }
        urlconn.disconnect();
    }


    /**
     * 注意：5秒内请求不到页面.就认为出现错误。
     * @param urlPath
     * @return
     */
    public static String getConnStr(String urlPath) throws Exception{
        HttpURLConnection urlconn = null;
        StringBuffer sbf  = new StringBuffer();
        try{
            URL url = new URL(urlPath);
            urlconn = (HttpURLConnection)url.openConnection();
            urlconn.setRequestMethod("GET");
            urlconn.setConnectTimeout(1000);
            urlconn.setReadTimeout(2000);
            urlconn.connect();
            BufferedReader br = new BufferedReader(new InputStreamReader(urlconn.getInputStream(),StaticContants.UTF8));
            while(br.ready()){
                sbf.append(br.readLine());
            }
            br.close();
            urlconn.disconnect();
            return sbf.toString();
        }catch(Exception e){
            log.error("获取URL:"+urlPath+"错误:"+e.getMessage());
            throw new BizException(e);
        }finally{
            if(urlconn!=null){
                urlconn.disconnect();
            }
            log.info("请求的接口地址："+urlPath+"    输出内容为："+sbf.toString());
        }
    }

    /**
     * form提交。
     * @param urlPath
     * @param method
     * @param encoding
     * @return
     */
    public static String getConnStrForMethod(String urlPath,String method,String encoding){
        HttpURLConnection urlconn = null;
        StringBuffer sbf  = new StringBuffer();
        try{
            URL url = new URL(urlPath);
            urlconn = (HttpURLConnection)url.openConnection();
            urlconn.setRequestMethod(method);
            urlconn.setConnectTimeout(1000);
            urlconn.setReadTimeout(2000);
            urlconn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            urlconn.connect();
            BufferedReader br = new BufferedReader(new InputStreamReader(urlconn.getInputStream(),encoding));
            while(br.ready()){
                sbf.append(br.readLine());
            }
            br.close();
            urlconn.disconnect();
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

    /**
     * 按照POST提交 form
     * @param urlPath
     * @param encoding
     * @param param
     * @return
     */
    public static String getConnStrForPOST(String urlPath,String encoding,String param) throws BizException{
        HttpURLConnection urlconn = null;
        StringBuffer sbf  = new StringBuffer();
        try{
            URL url = new URL(urlPath);
            urlconn = (HttpURLConnection)url.openConnection();
            urlconn.setRequestMethod("POST");
            urlconn.setDoOutput(true);
            urlconn.setConnectTimeout(1000);
            urlconn.setReadTimeout(5000);
            urlconn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            urlconn.connect();
            OutputStreamWriter osw = new OutputStreamWriter(urlconn.getOutputStream(),encoding);
            osw.write(param);
            osw.flush();
            osw.close();
            if(urlconn.getResponseCode() == 200){
                BufferedReader br = new BufferedReader(new
                        InputStreamReader(urlconn.getInputStream(),encoding));
                while(br.ready()){
                    sbf.append(br.readLine());
                }
                br.close();
                urlconn.disconnect();
            }
            log.info("请求的接口地址：".concat(urlPath).concat(sbf.toString()));
            return sbf.toString();
        }catch(Exception e){
            log.error("获取URL:"+urlPath+"错误:"+e.getMessage());
            e.printStackTrace();
            throw new BizException(e);
        }finally{
            if(urlconn!=null){
                urlconn.disconnect();
            }
            log.info("请求的接口地址："+urlPath+"    输出内容为："+sbf.toString());
        }
    }


    public static String getConnStrForPOSTVideo(String urlPath,String encoding,String param) throws BizException{
        HttpURLConnection urlconn = null;
        StringBuffer sbf  = new StringBuffer();
        try{
            URL url = new URL(urlPath);
            urlconn = (HttpURLConnection)url.openConnection();
            urlconn.setRequestMethod("POST");
            urlconn.setDoOutput(true);
            urlconn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            urlconn.connect();
            OutputStreamWriter osw = new OutputStreamWriter(urlconn.getOutputStream(),encoding);
            osw.write(param);
            osw.flush();
            osw.close();
            if(urlconn.getResponseCode() == 200){
                BufferedReader br = new BufferedReader(new
                        InputStreamReader(urlconn.getInputStream(),encoding));
                while(br.ready()){
                    sbf.append(br.readLine());
                }
                br.close();
                urlconn.disconnect();
            }
            log.info("请求的接口地址：".concat(urlPath).concat(sbf.toString()));
            return sbf.toString();
        }catch(Exception e){
            log.error("获取URL:"+urlPath+"错误:"+e.getMessage());
            e.printStackTrace();
            throw new BizException(e);
        }finally{
            if(urlconn!=null){
                urlconn.disconnect();
            }
            log.info("请求的接口地址："+urlPath+"    输出内容为："+sbf.toString());
        }
    }



    /**
     * GET url
     * @param urlPath
     * @param encoding
     * @return
     */
    public static String getConnStr(String urlPath,String encoding) throws BizException{
        HttpURLConnection urlconn = null;
        StringBuffer sbf  = new StringBuffer();
        try{
            URL url = new URL(urlPath);
            urlconn = (HttpURLConnection)url.openConnection();
            urlconn.setRequestMethod("GET");
            urlconn.setConnectTimeout(1000);
            urlconn.setReadTimeout(2000);
            urlconn.connect();
            BufferedReader br = new BufferedReader(new InputStreamReader(urlconn.getInputStream(),encoding));
            while(br.ready()){
                sbf.append(br.readLine());
            }
            br.close();
            urlconn.disconnect();
            return sbf.toString();
        }catch(Exception e){
            log.error("获取URL:"+urlPath+"错误:"+e.getMessage());
            e.printStackTrace();
            throw new BizException(e);
        }finally{
            if(urlconn!=null){
                urlconn.disconnect();
            }
            log.info("请求的接口地址："+urlPath+"    输出内容为："+sbf.toString());
        }
    }

    /**
     * 提交form
     * @param urlPath
     * @param param
     * @param value
     * @param inputStream
     * @return
     */
    public static String postFile(String urlPath, String param, String value,InputStream inputStream) throws Exception{
        HttpURLConnection urlconn = null;
        StringBuffer sbf  = new StringBuffer();
        try{
            URL url = new URL(urlPath);
            urlconn = (HttpURLConnection)url.openConnection();
            urlconn.setRequestMethod("POST");
            urlconn.setDoOutput(true);
            urlconn.setDoInput(true);
            urlconn.setUseCaches(false);
            urlconn.setRequestProperty("connection", "Keep-Alive");
            urlconn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BOUNDARY);
            urlconn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
            urlconn.setRequestProperty("Charsert", StaticContants.UTF8);
            OutputStream os = urlconn.getOutputStream();
            byte[] endData = ("\r\n--" + BOUNDARY + "--\r\n").getBytes();
            StringBuffer stringBuffer = new StringBuffer();
            stringBuffer.append("--");
            stringBuffer.append(BOUNDARY);
            stringBuffer.append("\r\n");
            stringBuffer.append("Content-Disposition: form-data;name=\"".concat(param).concat("\";filename=\"").concat(value).concat("\"\r\n"));
            stringBuffer.append("Content-Type:application/octet-stream\r\n\r\n");
            byte[] data = stringBuffer.toString().getBytes();
            os.write(data);
            int bytes = 0;
            byte[] bufferOut = new byte[1024];
            while ((bytes = inputStream.read(bufferOut)) != -1) {
                os.write(bufferOut, 0, bytes);
            }
            os.write("\r\n".getBytes());
            inputStream.close();
            os.write(endData);
            os.flush();
            os.close();
            BufferedReader br = new BufferedReader(new InputStreamReader(urlconn.getInputStream(), StaticContants.UTF8));
            while(br.ready()){
                sbf.append(br.readLine());
            }
            br.close();
            urlconn.disconnect();
            return sbf.toString();
        }catch(Exception e){
            log.error("获取URL:"+urlPath+"错误:"+e.getMessage());
            throw new BizException(e);
        }finally{
            if(urlconn!=null){
                urlconn.disconnect();
            }
            log.info("请求的接口地址："+urlPath+"    输出内容为："+sbf.toString());
        }
    }

}
