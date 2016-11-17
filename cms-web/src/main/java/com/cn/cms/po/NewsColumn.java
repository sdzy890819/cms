package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 新闻栏目PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class NewsColumn extends Base {

    /**
     * 栏目名
     */
    private String columnName;

    /**
     * 频道ID
     */
    private Long channelId;
}
