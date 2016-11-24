package com.cn.cms.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangyang on 16/11/24.
 */
public class CookieUtil {

    public static void addCookie(HttpServletResponse response,String name,String value,int maxAge){
        response.addCookie(addcookie(name,value,maxAge));
    }


    public static Cookie addcookie(String name , String value, int maxAge){
        Cookie cookie = new Cookie(name,value);
        cookie.setPath("/");
        if(maxAge>0){
            cookie.setMaxAge(maxAge);
        }
        return cookie;
    }

    public static String getCookieVal(HttpServletRequest request, String name){
        Map<String,String> cookieMap = getCookieMap(request);
        if(cookieMap.containsKey(name)){
            return cookieMap.get(name);
        }else{
            return null;
        }
    }

    public static void delCookieVal(HttpServletRequest request, HttpServletResponse response, String name){
        Cookie[] cookies = request.getCookies();
        if(name!=null&&!"".equals(name)){
            for(Cookie cookie:cookies){
                if(cookie.getName().equals(name)){
                    cookie.setValue("");
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }
        }
    }

    private static Map<String,String> getCookieMap(HttpServletRequest request){
        Map<String,String> cookieMap = new HashMap<String,String>();
        Cookie[] cookies = request.getCookies();
        if(null!=cookies){
            for(Cookie cookie : cookies){
                cookieMap.put(cookie.getName(), cookie.getValue());
            }
        }
        return cookieMap;
    }



    //----获取Ip
    public static String getRemoteIp(HttpServletRequest request){

        if(request.getHeader("x-forwarded-for")==null||"".equals(request.getHeader("x-forwarded-for"))){
            return request.getRemoteAddr();
        }
        return request.getHeader("x-forwarded-for");
    }
}
