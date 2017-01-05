package com.cn.cms.po;

import com.cn.cms.enums.PublishEnum;
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

    /**
     * 列表页预模版ID
     */
    private Long listId;

    /**
     * 详情页预模版ID
     */
    private Long detailId;

    /**
     * 模版ID
     */
    private Long listTemplateId;

    /**
     * 模版ID
     */
    private Long detailTemplateId;

    /**
     * 关键字
     */
    private String keywords;

    /**
     * 描述
     */
    private String description;
}
