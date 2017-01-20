package com.cn.cms.po;

import com.cn.cms.enums.DelTagEnum;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

/**
 * 基础Base类。所有的PO都要继承这个类。
 * Created by zhangyang on 16/11/15.
 */
@Getter
@Setter
public class Base implements Serializable{

    /**
     * 主键ID
     */
    protected Long id ;

    /**
     * 创建时间 系统会自动默认当前时间为创建时间
     */
    protected Date createTime;

    /**
     * 修改时间－每次修改都会改变。Table内自动变更
     */
    protected Date updateTime;

    /**
     * 删除标记。默认删除状态为 正常状态。
     */
    protected Integer delTag = DelTagEnum.NORMAL.getType();

    /**
     * 最后修改人ID
     */
    protected String lastModifyUserId;

    protected String lastModifyUserName;

}
