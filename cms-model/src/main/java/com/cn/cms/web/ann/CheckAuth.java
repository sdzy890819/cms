package com.cn.cms.web.ann;

import java.lang.annotation.*;

/**
 * 权限检测功能
 * Created by zhangyang on 16/11/15.
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface CheckAuth {

    String name() default "";
}
