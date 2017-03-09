package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 用户组权限
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
@Getter
@Setter
public class PositionPermission extends Base {

    /**
     * 用户组ID
     */
    private Long positionId;

    /**
     * 权限ID
     */
    private Long permissionId;

}
