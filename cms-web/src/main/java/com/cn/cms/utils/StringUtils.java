package com.cn.cms.utils;

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



    public static void main(String[] args){
        System.out.println(concatUrl("http://a.b.com/","/aaa/","index.html"));
    }
}
