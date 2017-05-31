package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 频道PO
 * Created by ADMIN on 16/11/17.
 */
@Getter
@Setter
public class UserChannel extends Base {

    /**
     * 用户ID
     */
    private String userId;

    /**
     * 频道ID
     */
    private Long channelId;

}
