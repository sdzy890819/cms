package com.cn.cms.po;

import com.cn.cms.enums.DelTagEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Created by zhangyang on 16/11/15.
 */
@Getter
@Setter
public class Base {

    protected Long id ;

    protected Date createTime;

    protected Date updateTime;

    protected Integer delTag = DelTagEnum.NORMAL.getType();
}
