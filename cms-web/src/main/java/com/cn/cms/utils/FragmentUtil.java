package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.RegexNumEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by zhangyang on 16/12/2.
 */
public class FragmentUtil {

    private static final CommonLog log = CommonLogFactory.getLog(FragmentUtil.class);

    /**
     * 按照碎片规则匹配字段
     * @param str
     * @param regexNumEnum
     * @return
     */
    public static List<String> getKey(String str, RegexNumEnum regexNumEnum){
        Pattern pattern = Pattern.compile(StaticContants.FRAGMENT_REGEX);
        Matcher matcher = pattern.matcher(str);
        List<String> list = new ArrayList<String>();
        try {
            while (matcher.find()) {
                list.add(matcher.group(regexNumEnum.getType()));
            }
        }catch (Exception e){
            log.error("匹配出现错误", e);
        }
        return list;
    }



    /**
     * 获取碎片编辑内容的对应关系
     * @param model
     * @param str
     * @return
     */
    public static List<String> getVal(String model, String str){
        String regex = model.replaceAll(StaticContants.FRAGMENT_REGEX, StaticContants.FRAGMENT_ALL_REGEX);
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        List<String> list = new ArrayList<String>();
        if(matcher.find()){
            for(int i = 1; i <= matcher.groupCount(); i++){
                list.add(matcher.group(i));
            }
        }
        return list;
    }


}
