package com.cn.cms.web.ann;

import java.lang.annotation.*;

/**
 * 权限检测功能
 * Created by 华盛信息科技有限公司(HS) on 16/11/15.
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface CheckAppAuth {

    String name() default "";
}
