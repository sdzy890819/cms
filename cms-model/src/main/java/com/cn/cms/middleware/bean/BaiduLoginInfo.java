package com.cn.cms.middleware.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangyang on 17/1/18.
 */
@Getter
@Setter
public class BaiduLoginInfo {

    private Map<String ,String> head = new HashMap<>();

    private Map<String ,Object> preLoginData = new HashMap<>();

    private String userName = "全景网";

    private String pwd = "wwwp5wnet";

    private String token = "d1f67c878deaf47044db8cb8c5659906";

    private String uuid = "4c:8d:79:ea:d7:cc";

    private Integer accountType = 1;

    private String loginUrl = "https://api.baidu.com/sem/common/HolmesLoginService";

    private String apiUrl = "https://api.baidu.com/json/tongji/v1/ReportService";

    private String contentType = "data/gzencode and rsa public encrypt;charset=UTF-8";

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
        preLoginData.put("username", this.userName);
        preLoginData.put("token", this.token);
        preLoginData.put("functionName", "preLogin");
        preLoginData.put("uuid", this.uuid);
        Map<String, Object> tmp = new HashMap<>();
        preLoginData.put("request",null);
    }

}
