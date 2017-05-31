package com.cn.cms.middleware.bean;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.exception.BizException;
import com.cn.cms.utils.GzipUtils;
import com.cn.cms.utils.StringUtils;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang.ArrayUtils;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by ADMIN on 17/1/18.
 */
@Getter
@Setter
public class BaiduLoginInfo {

    private Map<String ,String> head = new HashMap<>();

    private Map<String ,Object> preLoginData = new HashMap<>();

    private Map<String ,Object> loginData = new HashMap<>();

    private Map<String, Object> loginOutData = new HashMap<>();

    private Map<String, String> apiHead = new HashMap<>();

    private Map<String, Object> siteData = new HashMap<>();

    private Map<String, Object> searchData = new HashMap<>();

    private String userName;

    private String pwd;

    private String token;

    private String uuid;

    private Integer accountType;

    private String loginUrl;

    private String apiUrl;

    private String contentType ;

    private int MAX_MSG_SIZE = 4096;

    private Map<String, String> loginKey = new HashMap<>();

    private String ucid;

    private String st;

    public static String UCID_KEY = "ucid";

    public static String ST_KEY = "st";

    public BaiduLoginInfo(String userName, String pwd, String token, String uuid,
                          Integer accountType, String loginUrl, String apiUrl, String contentType){
        this.userName = userName;
        this.pwd = pwd;
        this.token = token;
        this.uuid = uuid;
        this.accountType = accountType;
        this.loginUrl = loginUrl;
        this.apiUrl = apiUrl;
        this.contentType = contentType;
        head.put("UUID", this.uuid);
        head.put("account_type", String.valueOf(this.accountType));
        head.put("Content-Type", this.contentType);
        //-------预登录信息封装
        preLoginData.put("username", this.userName);
        preLoginData.put("token", this.token);
        preLoginData.put("functionName", "preLogin");
        preLoginData.put("uuid", this.uuid);
        Map<String, Object> preLoginTmp = new HashMap<>();
        preLoginTmp.put("osVersion", "linux");
        preLoginTmp.put("deviceType", "pc");
        preLoginTmp.put("clientVersion", "1.0");
        preLoginData.put("request", preLoginTmp);

        //-----------登录信息封装
        loginData.put("username", this.userName);
        loginData.put("token", this.token);
        loginData.put("functionName", "doLogin");
        loginData.put("uuid", this.uuid);
        Map<String, Object> loginTmp = new HashMap<>();
        loginTmp.put("password", this.pwd);
        loginData.put("request", loginTmp);
        //-----------登出信息封装
        loginOutData.put("username", this.userName);
        loginOutData.put("token", this.token);
        loginOutData.put("functionName", "doLogout");
        loginOutData.put("uuid", this.uuid);
        loginOutData.put("request", loginKey);
        //-----------API封装.

    }


    /**
     * 设置状态
     * @param name
     * @param value
     */
    public void setLoginKeyMap(String name, String value){
        if(BaiduLoginInfo.UCID_KEY.equals(name)){
            ucid = value;
        }else if(BaiduLoginInfo.ST_KEY.equals(name)){
            st = value;
        }
        loginKey.put(name, value);
    }

    /**
     * 清理状态
     */
    public void delLoginKeyMap(){
        loginKey.clear();
        ucid = null;
        st = null;
    }

    /**
     * 初始化登录
     * @return
     * @throws IOException
     */
    public HttpURLConnection initLogin() throws IOException {
        return (HttpURLConnection) new URL(loginUrl).openConnection();
    }

    /**
     * 开启Api接口s
     * @param url
     * @return
     * @throws IOException
     */
    public HttpURLConnection initApi(String url) throws IOException {
        apiHead.put("UUID", uuid);
        apiHead.put("USERID", ucid);
        apiHead.put("Content-Type", "data/json;charset=UTF-8");
        Map<String, String> tmp = new HashMap<>();
        siteData.put("header", tmp);
        tmp.put("username", this.userName);
        tmp.put("password", this.st);
        tmp.put("token", this.token);
        tmp.put("account_type", String.valueOf(this.accountType));
        siteData.put("body", null);
        return (HttpURLConnection) new URL(StringUtils.concatUrl(apiUrl,url)).openConnection();
    }

    public HttpURLConnection initApiData(String url, Object object) throws IOException {
        apiHead.put("UUID", uuid);
        apiHead.put("USERID", ucid);
        apiHead.put("Content-Type", "data/json;charset=UTF-8");
        Map<String, String> tmp = new HashMap<>();
        searchData.put("header", tmp);
        tmp.put("username", this.userName);
        tmp.put("password", this.st);
        tmp.put("token", this.token);
        tmp.put("account_type", String.valueOf(this.accountType));
        searchData.put("body", object);
        return (HttpURLConnection) new URL(StringUtils.concatUrl(apiUrl,url)).openConnection();
    }

    /**
     * 开启stream
     * @param httpURLConnection
     * @return
     * @throws IOException
     */
    public OutputStream openStream(HttpURLConnection httpURLConnection, Map<String, String> head) throws IOException {
        httpURLConnection.setRequestMethod("POST");
        Iterator<Map.Entry<String, String>> it =  head.entrySet().iterator();
        while(it.hasNext()) {
            Map.Entry<String, String> entry = it.next();
            httpURLConnection.setRequestProperty(entry.getKey(), entry.getValue());
        }
        httpURLConnection.setDoInput(true);
        httpURLConnection.setDoOutput(true);
        OutputStream outputStream = httpURLConnection.getOutputStream();
        return outputStream;
    }




    public JSONObject getJsonResponse(HttpURLConnection httpURLConnection) throws BizException{
        InputStream in = null;
        try {
            in = httpURLConnection.getInputStream();
            int total = 0, k = 0;
            byte[] b = new byte[MAX_MSG_SIZE];
            while (total < MAX_MSG_SIZE) {
                k = in.read(b, total, MAX_MSG_SIZE - total);
                if (k < 0)
                    break;
                total += k;
            }
            if (total == MAX_MSG_SIZE) {
                throw new BizException("Server returned message too large.");
            }
            byte[] zip = ArrayUtils.subarray(b, 0, total);
            return JSONObject.parseObject(new String(zip));
        }catch(Exception e){
            throw new BizException(e);
        }finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    throw new BizException(e);
                }
            }
        }
    }

    /**
     * 回返信息
     * @param httpURLConnection
     * @return
     * @throws BizException
     */
    public JSONObject getResponse(HttpURLConnection httpURLConnection) throws BizException {
        InputStream in = null;
        try {
            in = httpURLConnection.getInputStream();
            byte[] b = new byte[8];
            if (in.read(b) != 8) {
                throw new BizException("Server response is invalid.");
            }
            if (b[1] != 0) {
                throw new BizException("Server returned an error code: " + b[1]);
            }
            int total = 0, k = 0;
            b = new byte[MAX_MSG_SIZE];
            while (total < MAX_MSG_SIZE) {
                k = in.read(b, total, MAX_MSG_SIZE - total);
                if (k < 0)
                    break;
                total += k;
            }
            if (total == MAX_MSG_SIZE) {
                throw new BizException("Server returned message too large.");
            }
            byte[] zip = ArrayUtils.subarray(b, 0, total);
            zip = GzipUtils.unGzip(zip);
            return JSONObject.parseObject(new String(zip));
        } catch (IOException e) {
            throw new BizException(e);
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    throw new BizException(e);
                }
            }
        }
    }

}
