package com.cn.cms.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationContext;

/**
 * Created by ADMIN on 16/12/23.
 */
public class ContextUtil {

    private static ContextUtil contextUtil = null;

    @Getter
    @Setter
    private ApplicationContext context;

    public static ContextUtil getContextUtil(){
        if(contextUtil == null){
            contextUtil = new ContextUtil();
        }
        return contextUtil;
    }

    /**
     * 获取bean
     * @param name
     * @param clzz
     * @param <T>
     * @return
     */
    public <T> T getBean(String name, Class<T> clzz){
        return context.getBean(name, clzz);
    }

    /**
     * 获取Bean
     * @param clzz
     * @param <T>
     * @return
     */
    public <T> T getBean(Class<T> clzz){
        return context.getBean(clzz);
    }

}
