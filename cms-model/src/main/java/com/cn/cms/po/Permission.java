package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 权限PO
 * Created by zhangyang on 16/11/17.
 */
@Setter
@Getter
public class Permission extends Base {


    /**
     * 名称
     */
    private String name;

    /**
     * 说明
     */
    private String description;

    /**
     * 类型
     */
    private Integer type;

    /**
     * 地址
     */
    private String url;

    /**
     * 排序
     */
    private Integer sort;

    /**
     * 父ID
     */
    private Long parentId;

    /**
     * 展示标签
     */
    private Integer showFlag;

    /**
     * 权限Code
     */
    private String permission;

}
