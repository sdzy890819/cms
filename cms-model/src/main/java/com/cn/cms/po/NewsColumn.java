package com.cn.cms.po;

import com.cn.cms.bo.ColumnPublishInfo;
import com.cn.cms.enums.PublishEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * 新闻栏目PO
 * Created by ADMIN on 16/11/17.
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
     * 列表页预模版ID[废弃]
     */
    private Long listId;

    /**
     * 详情页预模版ID[废弃]
     */
    private Long detailId;

    /**
     * 模版ID
     */
    private Long listTemplate2Id;

    /**
     *  模版列表页url
     */
    private String listUrl;

    /**
     * 模版ID
     */
    private Long detailTemplate2Id;

    /**
     * 关键字
     */
    private String keywords;

    /**
     * 描述
     */
    private String description;

    //---新增
    /**
     * 相对路径
     */
    private String path;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 模版列表页url相对路径。
     */
    private String listRelativePath;

    /**
     * 发布地址
     */
    private String publishUrl;

    /**
     * 额外赋值
     */
    private String channelName;


    /**
     * 额外赋值
     */
    private ColumnPublishInfo columnPublishInfo;




}
