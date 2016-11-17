package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 新闻详情PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class NewsDetail extends Base {

    /**
     * 详细内容
     */
    private String content;

    /**
     * 新闻ID
     */
    private Long newsId;

}
