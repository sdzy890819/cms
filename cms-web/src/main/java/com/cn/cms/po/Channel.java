package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 频道PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class Channel extends Base {

    /**
     * 频道名称
     */
    private String channelName;

    /**
     * 频道域名
     */
    private String channelUrl;

    /**
     * 频道绝对路径
     */
    private String channelPath;

    /**
     * 频道说明
     */
    private String channelDesc;

    /**
     * 部门分类ID
     */
    private Long categoryId;

}
