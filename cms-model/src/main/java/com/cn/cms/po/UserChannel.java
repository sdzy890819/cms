package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 频道PO
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
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
