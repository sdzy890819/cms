package com.cn.cms.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsDetail;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by ADMIN on 17/3/7.
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

    /**
     * 分割新闻内容
     * @param content
     * @return
     */
    public static String[] splitNewsContent(String content){

        String[] tmp = content.split(StaticContants.REGEX_SPLIT_PAGE);
        for(int i = 1; i < tmp.length; i++){
            int a = tmp[i].toLowerCase().indexOf("<p") ;
            int b = tmp[i].toLowerCase().indexOf("</p");
            if( a > b ){
                int c = tmp[i].toLowerCase().indexOf(">", b) + 1;
                tmp[i-1] = tmp[i-1] + tmp[i].substring(0, c);
                tmp[i] = tmp[i].substring(c);
            }
        }
        return tmp ;
    }


    public static void main(String[] args){
        News news = new News();
        news.setId(10L);
        news.setCreateTime(new Date());
        NewsDetail newsDetail = new NewsDetail();
        newsDetail.setContent("<p>AAAAAAAAAAAAAAAA</p>--------<p>1111121321313</p>");
        news.setNewsDetail(newsDetail);
        News publishNews = news.clone();
        publishNews.getNewsDetail().setContent("11111");
        publishNews.setId(12L);
        System.out.println(publishNews.getNewsDetail().getContent());

        System.out.println(news.getNewsDetail().getContent());

        System.out.println(publishNews.getId());

        System.out.println(news.getId());

    }




}
