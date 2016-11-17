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
     * 权限名称
     */
    private String permissionName;

    /**
     * 权限码
     */
    private String permissionCode;



}
