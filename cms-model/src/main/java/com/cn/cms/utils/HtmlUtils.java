package com.cn.cms.utils;

import com.alibaba.fastjson.JSONArray;
import com.cn.cms.contants.StaticContants;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by zhangyang on 17/3/7.
 */
public class HtmlUtils {


    /**
     * 获取股票信息
     * @param content
     * @return
     */
    public static List<String> matcher(String content){
        return matcher(content, StaticContants.REGEX_STOCK, 3);
    }

    /**
     * 匹配正则
     * @param content
     * @param regex
     * @param groupNum
     * @return
     */
    public static List<String> matcher(String content, String regex ,Integer groupNum){
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(content);
        List<String> list = new ArrayList<>();
        while (matcher.find()){
            list.add(matcher.group(groupNum));
        }
        return list;
    }


    public static void main(String[] args){
        List<String> list = matcher("<a stkcode=\"000001，ST天下\" stkname=\"add\">总的</a>");

    }




}
