package com.cn.cms.context;

import com.cn.cms.utils.ContextUtil;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Created by zhangyang on 16/12/24.
 */
@Component
public class ContextInit implements ApplicationContextAware {

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        ContextUtil.getContextUtil().setContext(applicationContext);
    }
}
