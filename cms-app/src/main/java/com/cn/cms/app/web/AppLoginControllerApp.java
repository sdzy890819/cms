package com.cn.cms.app.web;

import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.web.ann.CheckAppToken;
import com.cn.cms.web.result.ApiResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangyang on 17/2/8.
 */
@RestController
@RequestMapping(value = "/app",produces = "application/json; charset=UTF-8")
public class AppLoginControllerApp extends AppBaseController {

    @Resource
    private UserBiz userBiz;

    /**
     * 登录。用户名、密码、时间.
     * 前端使用用户名+密码＋时间做AES加密。
     * @param response
     * @param userName
     * @param pwd
     * @param time
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(HttpServletResponse response,
                        HttpServletRequest request,
                        @RequestParam(value="userName")String userName,
                        @RequestParam(value="pwd")String pwd,
                        @RequestParam(value="time")String time,
                        @RequestParam(value="tt")String tt) throws IOException {
        String cookieTT = CookieUtil.getCookieVal(request, StaticContants.APP_COOKIE_TT);
        String idfa = CookieUtil.getCookieVal(request, StaticContants.APP_COOKIE_DEVICE_IDFA);
        return userBiz.checkUserAndSetCookieForApp(response ,userName ,pwd, time, cookieTT, idfa, tt);
    }


    /**
     * 登出
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/loginOut", method = RequestMethod.POST)
    public String loginOut(HttpServletRequest request ,HttpServletResponse response){
        userBiz.clearAppCookie(request, response);
        return ApiResponse.returnSuccess();
    }

    /**
     * 获取当前登录用户信息
     * @param request
     * @return
     */
    @RequestMapping(value = "/currentUser")
    @CheckAppToken
    public String currentUser(HttpServletRequest request){
        String userID = getCurrentUserId(request);
        if(StringUtils.isBlank(userID)){
            return ApiResponse.returnFail(ErrorCodeEnum.ERROR_LOGIN_FAIL.getType(),ErrorCodeEnum.ERROR_LOGIN_FAIL.getMessage());
        }
        UserBean userBean = userBiz.getUserBean(userID);
        return ApiResponse.returnSuccess(userBean);
    }



    /**
     * 密匙
     * @return
     */
    @RequestMapping(value = "/login/init", method = RequestMethod.GET)
    public String loginInit(HttpServletResponse response) throws IOException {
        String randomPwd = EncryptUtil.randomPwd(96);
        String tt = EncryptUtil.encryptAESKey(randomPwd);
        String key = EncryptUtil.encryptAESKey(randomPwd);
        String ttbase = EncryptUtil.base64(EncryptUtil.encryptAES(key, tt).concat(key).getBytes(StaticContants.UTF8));
        CookieUtil.addCookie(response, StaticContants.APP_COOKIE_TT, ttbase, 0);
        Map<String, String> map = new HashMap<>();
        map.put("tt", tt);
        return ApiResponse.returnSuccess(map);
    }



    /**
     * 密匙
     * @return
     */
    @RequestMapping(value = "/login/test/en", method = RequestMethod.GET)
    public String en(@RequestParam(value = "tt") String tt,
                     @RequestParam(value = "userName") String userName,
                     @RequestParam(value = "pwd") String pwd,
                     @RequestParam(value = "time") String time) throws IOException {
        String abc = EncryptUtil.encryptPwd(userName, pwd);
        Map<String, String> map = new HashMap<>();
        map.put("tt", tt);
        map.put("userName", userName);
        map.put("pwd", pwd);
        map.put("time", time);
        map.put("encrypt", abc);
        return ApiResponse.returnSuccess(map);
    }

}
