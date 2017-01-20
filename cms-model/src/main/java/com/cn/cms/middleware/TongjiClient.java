package com.cn.cms.middleware;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.middleware.bean.BaiduLoginInfo;
import com.cn.cms.middleware.bean.SiteInfo;
import com.cn.cms.middleware.bean.SubSiteInfo;
import com.cn.cms.middleware.bean.TongjiData;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.GzipUtils;
import com.cn.cms.utils.StringUtils;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Resource;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhangyang on 17/1/18.
 */
@Getter
@Setter
public class TongjiClient {

    private CommonLog log = CommonLogFactory.getLog(TongjiClient.class);

    private String userName = "\u5168\u666f\u7f51";

    private String pwd = "wwwp5wnet";

    private String token = "d1f67c878deaf47044db8cb8c5659906";

    private String uuid = "4c:8d:79:ea:d7:cc";

    private Integer accountType = 1;

    private String loginUrl = "https://api.baidu.com/sem/common/HolmesLoginService";

    private String apiUrl = "https://api.baidu.com/json/tongji/v1/ReportService";

    private String apiSiteUrl = "/getSiteList";

    private String apiDataUrl = "/getData";

    private String contentType = "data/gzencode and rsa public encrypt;charset=UTF-8";

    private String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHn/hfvTLRXViBXTmBhNYEIJeGGGDkmrYBxCRelriLEYEcrwWrzp0au9nEISpjMlXeEW4+T82bCM22+JUXZpIga5qdBrPkjU08Ktf5n7Nsd7n9ZeI0YoAKCub3ulVExcxGeS3RVxFai9ozERlavpoTOdUzEH6YWHP4reFfpMpLzwIDAQAB";

    private BaiduLoginInfo baiduLoginInfo = null;

    @Resource
    private JedisClient jedisClient;

    public TongjiClient(){
        initLogin();
    }

    /**
     * 预备登录
     * @return
     * @throws Exception
     */
    public boolean preLogin() throws Exception {
        HttpURLConnection httpURLConnection = baiduLoginInfo.initLogin();
        OutputStream outputStream = baiduLoginInfo.openStream(httpURLConnection, baiduLoginInfo.getHead());
        String json = JSONObject.toJSONString(baiduLoginInfo.getPreLoginData());
        log.info("预登录信息：".concat(json));
        byte[] bytes = GzipUtils.gzipString(json);
        outputStream.write(EncryptUtil.encryptByPublicKey(bytes, EncryptUtil.getPublicKey(publicKey)));
        outputStream.flush();
        outputStream.close();
        JSONObject jsonObject = baiduLoginInfo.getResponse(httpURLConnection);
        log.info(jsonObject.toJSONString());
        if(!jsonObject.getBoolean("needAuthCode")){
            return true;
        }
        return false;
    }

    /**
     * 初始化信息
     */
    public void initLogin(){
        baiduLoginInfo = new BaiduLoginInfo(userName, pwd, token, uuid, accountType, loginUrl, apiUrl, contentType);
    }

    /**
     * 执行登录.
     * @throws Exception
     */
    public void doLogin() throws Exception {
        HttpURLConnection httpURLConnection = baiduLoginInfo.initLogin();
        OutputStream outputStream = baiduLoginInfo.openStream(httpURLConnection, baiduLoginInfo.getHead());
        String json = JSONObject.toJSONString(baiduLoginInfo.getLoginData());
        log.info("登录信息：".concat(json));
        byte[] bytes = GzipUtils.gzipString(json);
        outputStream.write(EncryptUtil.encryptByPublicKey(bytes, EncryptUtil.getPublicKey(publicKey)));
        outputStream.flush();
        outputStream.close();
        JSONObject jsonObject = baiduLoginInfo.getResponse(httpURLConnection);
        log.info(jsonObject.toJSONString());
        if(jsonObject.getInteger("retcode") == 0){
            baiduLoginInfo.setLoginKeyMap(BaiduLoginInfo.UCID_KEY, jsonObject.getString(BaiduLoginInfo.UCID_KEY));
            baiduLoginInfo.setLoginKeyMap(BaiduLoginInfo.ST_KEY, jsonObject.getString(BaiduLoginInfo.ST_KEY));
        }
    }

    /**
     * 获取site信息
     * @throws Exception
     */
    public void getSite() throws Exception {
        if(baiduLoginInfo!=null && baiduLoginInfo.getLoginKey().size()>0){
            HttpURLConnection httpURLConnection = baiduLoginInfo.initApi(apiSiteUrl);
            OutputStream outputStream = baiduLoginInfo.openStream(httpURLConnection, baiduLoginInfo.getApiHead());
            String json = JSONObject.toJSONString(baiduLoginInfo.getSiteData());
            log.info("SITE信息：".concat(json));
            outputStream.write(json.getBytes("UTF-8"));
            outputStream.flush();
            outputStream.close();
            JSONObject jsonObject = baiduLoginInfo.getJsonResponse(httpURLConnection);
            log.info(jsonObject.toJSONString());
        }
    }

    /**
     * getData
     * @param paramter
     * @throws Exception
     */
    public JSONObject getData(JSONObject paramter) throws Exception {
        if(baiduLoginInfo!=null && baiduLoginInfo.getLoginKey().size()>0){
            HttpURLConnection httpURLConnection = baiduLoginInfo.initApiData(apiDataUrl, paramter);
            OutputStream outputStream = baiduLoginInfo.openStream(httpURLConnection, baiduLoginInfo.getApiHead());
            String json = JSONObject.toJSONString(baiduLoginInfo.getSearchData());
            log.info("DATA SEARCH信息：".concat(json));
            outputStream.write(json.getBytes("UTF-8"));
            outputStream.flush();
            outputStream.close();
            JSONObject jsonObject = baiduLoginInfo.getJsonResponse(httpURLConnection);
            log.info(jsonObject.toJSONString());
            return jsonObject;
        }
        return null;
    }


    /**
     * 初始化
     */
    public void init() {
        try {
            if (preLogin()) {
                doLogin();
            }
        }catch (Exception e){
            log.error("获取百度统计登录失败.", e);
        }
    }

    /**
     * 销毁
     */
    public void destory(){
        try {
            loginOut();
        } catch (Exception e) {
            log.error("百度统计登出失败", e);
        }
    }

    /**
     * 登出
     * @throws Exception
     */
    public boolean loginOut() throws Exception {
        HttpURLConnection httpURLConnection = baiduLoginInfo.initLogin();
        OutputStream outputStream = baiduLoginInfo.openStream(httpURLConnection, baiduLoginInfo.getHead());
        String json = JSONObject.toJSONString(baiduLoginInfo.getLoginOutData());
        log.info("登出信息：".concat(json));
        byte[] bytes = GzipUtils.gzipString(json);
        outputStream.write(EncryptUtil.encryptByPublicKey(bytes, EncryptUtil.getPublicKey(publicKey)));
        outputStream.flush();
        outputStream.close();
        JSONObject jsonObject = baiduLoginInfo.getResponse(httpURLConnection);
        log.info(jsonObject.toJSONString());
        if(jsonObject.getInteger("retcode") == 0){
            return true;
        }
        return false;
    }

    /**
     * 分析Site 存入Redis
     * @param jsonObject
     */
    public void analysisSite(JSONObject jsonObject){

        if(jsonObject.getJSONObject("header").getInteger("status") == 0){
            List<SiteInfo> list = new ArrayList<>();
            JSONArray array = jsonObject.getJSONObject("body").getJSONArray("data").getJSONObject(0).getJSONArray("list");

            JSONObject a = array.getJSONObject(0);
            SiteInfo siteInfo = new SiteInfo();
            siteInfo.setDomain(a.getString("domain"));
            siteInfo.setSiteId(a.getLong("site_id"));
            siteInfo.setStatus(a.getInteger("status"));
            JSONArray array1 = a.getJSONArray("sub_dir_list");
            List<SubSiteInfo>  subSiteInfos = new ArrayList<>();
            for(int j=0;j<array1.size();j++){
                JSONObject b = array1.getJSONObject(j);
                SubSiteInfo subSiteInfo = new SubSiteInfo();
                subSiteInfo.setName(b.getString("name"));
                subSiteInfo.setSubDirId(b.getLong("sub_dir_id"));
                subSiteInfos.add(subSiteInfo);
            }
            siteInfo.setSubSiteInfos(subSiteInfos);
            jedisClient.set(RedisKeyContants.REDIS_BAIDU_SITE_KEY, JSONObject.toJSONString(siteInfo));
        }
    }


    public TongjiData analysisData(JSONObject jsonObject) throws Exception {
        TongjiData data = null;
        if(jsonObject.getJSONObject("header").getInteger("status") == 0){
            data = new TongjiData();
            data.setQueryNum(jsonObject.getJSONObject("header").getInteger("rquota"));
            JSONObject result = jsonObject.getJSONObject("body").getJSONArray("data").getJSONObject(0).getJSONObject("result");
            data.setTotal(result.getInteger("total"));
            JSONArray sum = result.getJSONArray("sum");
            data.setSumPv(sum.getJSONArray(0).getLong(0));
            data.setSumUv(sum.getJSONArray(0).getLong(1));
            data.setNewSumUv(sum.getJSONArray(0).getLong(2));
            data.setSumIp(sum.getJSONArray(0).getLong(3));
            String[] keys = new String[result.getJSONArray("items").getJSONArray(0).size()];
            for(int i=(keys.length-1),j = 0;i >= 0;i--,j ++){
                keys[j] = result.getJSONArray("items").getJSONArray(0).getJSONArray(i).getString(0);
            }
            data.setKey(keys);
            JSONArray tmp = result.getJSONArray("items").getJSONArray(1);
            Long[] pvs = new Long[tmp.size()];
            Long[] uvs = new Long[tmp.size()];
            Long[] nuvs = new Long[tmp.size()];
            Long[] ips = new Long[tmp.size()];

            for(int i = (tmp.size()-1),j = 0; i >= 0 ; i++, j++){
                pvs[j] = tmp.getJSONArray(i).getLong(0);
                uvs[j] = tmp.getJSONArray(i).getLong(1);
                nuvs[j] = tmp.getJSONArray(i).getLong(2);
                ips[j] = tmp.getJSONArray(i).getLong(3);
                if(i == 0){
                    data.setTodayIp(ips[j]);
                    data.setTodayNewUv(nuvs[j]);
                    data.setTodayPv(pvs[j]);
                    data.setTodayUv(uvs[j]);
                }
            }
            data.setPvArray(pvs);
            data.setUvArray(uvs);
            data.setNuvArray(nuvs);
            data.setIpArray(ips);
        }
        return data;
    }

    public TongjiData getDate(String startDate, String endDate) throws Exception {
        String str = jedisClient.get(RedisKeyContants.REDIS_BAIDU_TONGJI_DATA_KEY);
        if(StringUtils.isBlank(str)) {
            if (preLogin()) {
                doLogin();
                JSONObject object = new JSONObject();
                object.put("site_id", 1075604);
                object.put("method", "trend/time/a");
                object.put("start_date", startDate);
                object.put("end_date", endDate);
                object.put("metrics", "pv_count,visitor_count,new_visitor_count,ip_count");
                object.put("max_results", 0);
                object.put("gran", "day");
                JSONObject result = getData(object);
                loginOut();
                TongjiData data = analysisData(result);
                if (data != null && data.getTotal() > 0) {
                    jedisClient.set(RedisKeyContants.REDIS_BAIDU_TONGJI_DATA_KEY, JSONObject.toJSONString(data), StaticContants.BAIDU_DATA_SECONDS);
                }
                return data;
            }
            return null;
        }else{
            return JSONObject.parseObject(str, TongjiData.class);
        }
    }


    public static void main(String[] args) throws Exception {
        TongjiClient b = new TongjiClient();
        if(b.preLogin()){
            b.doLogin();
            //b.getSite();
            //1075604
            JSONObject object = new JSONObject();
//            object.put("site_id", 1075604);
//            object.put("method", "trend/time/a");
//            object.put("start_date", "20170101");
//            object.put("end_date", "20170119");
//            object.put("metrics", "pv_count,visitor_count,ip_count,new_visitor_count");
//            object.put("max_results", 0);
//            object.put("gran", "day");

            object.put("site_id", 1075604);
            object.put("method", "visit/toppage/a");
            object.put("start_date", "20170101");
            object.put("end_date", "20170119");
            object.put("metrics", "pv_count,visitor_count,ip_count,outward_count");
            object.put("max_results", 0);
            //object.put("source", "http://www.p5w.net/stock/news/zonghe/201701/t20170119_1694410.htm");
            object.put("gran", "day");
            //---PV。UV。IP。新增UV
            b.getData(object);
            b.loginOut();
        }
    }


}
