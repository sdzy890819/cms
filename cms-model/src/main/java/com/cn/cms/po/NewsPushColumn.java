package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 17/5/10.
 */
@Getter
@Setter
public class NewsPushColumn extends Base {

    private Long newsId;

    /**
     * 新闻频道ID
     */
    private Long channelId;

    /**
     * 新闻栏目ID
     */
    private Long columnId;

    //-------------------------------

    private String channelName;

    private String columnName;
}
