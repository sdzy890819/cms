package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 用户－用户组对应关系
 * Created by ADMIN on 16/11/17.
 */
@Getter
@Setter
public class UserPosition extends Base {

    /**
     * 用户组ID
     */
    private Long positionId;

    /**
     * 用户ID
     */
    private String userId;

}
