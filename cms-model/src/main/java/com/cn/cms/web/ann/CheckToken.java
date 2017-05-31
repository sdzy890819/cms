package com.cn.cms.web.ann;

import java.lang.annotation.*;

/**
 * 检测Token是否有效。
 * Created by ADMIN on 16/11/15.
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface CheckToken {

}
