package com.cn.cms.po;

import com.cn.cms.enums.PermissionTypeEnum;
import com.cn.cms.enums.ShowFlagEnum;
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
    private int type = PermissionTypeEnum.MENU.getType();

    /**
     * 地址
     */
    private String url;

    /**
     * 排序
     */
    private int sort;

    /**
     * 父ID
     */
    private Long parentId;

    /**
     * 展示标签
     */
    private int showFlag = ShowFlagEnum.NO.getType();

    /**
     * 权限Code
     */
    private String permission;

}
