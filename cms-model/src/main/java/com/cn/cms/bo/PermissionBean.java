package com.cn.cms.bo;

import com.cn.cms.po.Permission;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/29.
 */
@Getter
@Setter
public class PermissionBean {

    private List<Permission> permissions;

    private Permission permission;

}
