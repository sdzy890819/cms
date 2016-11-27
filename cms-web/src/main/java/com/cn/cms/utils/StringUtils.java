package com.cn.cms.utils;

import com.cn.cms.bo.UserBean;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class StringUtils extends org.apache.commons.lang3.StringUtils{

    /**
     * 拼接URL数据
     * @param strings
     * @return
     */
    public static String concatUrl(String... strings){
        StringBuffer sbf = new StringBuffer();
        if(strings!=null && strings.length>0){
            for (String str : strings) {
                if(isNotBlank(str)){
                    if(str.endsWith("/")){
                        sbf.append(str.substring(0,str.length()-1));
                    }else{
                        sbf.append(str);
                    }
                }
            }
        }
        return sbf.toString();
    }

    /**
     * 检测列表是否不为空
     * @param collection
     * @return
     */
    public static boolean isNotEmpty(Collection<? extends Object> collection){
        if(collection!=null && collection.size()>0){
            return true;
        }
        return false;
    }

    /**
     * 检测列表是否为空
     * @param collection
     * @return
     */
    public static boolean isEmpty(Collection<? extends Object> collection){
        if(collection == null || collection.size() == 0){
            return true;
        }
        return false;
    }




    public static void main(String[] args){
        System.out.println(concatUrl("http://a.b.com/","/aaa/","index.html"));
        List<UserBean>  userBeanList = new ArrayList<UserBean>();
        System.out.println(isNotEmpty(userBeanList));
    }
}
