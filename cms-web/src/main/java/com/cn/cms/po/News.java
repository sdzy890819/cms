package com.cn.cms.po;

import com.cn.cms.enums.PlatformEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 新闻PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class News extends Base{

    /**
     * 标题
     */
    private String title;

    /**
     * 子标题
     */
    private String subTitle;

    /**
     * 关键字 多个关键字按照空格分割
     */
    private String keyword;

    /**
     * SEO描述。
     */
    private String description;

    /**
     * 来源
     */
    private String source;

    /**
     * 作者
     */
    private String author;

    /**
     * 发布时间
     */
    private Date buildTime;

    /**
     * 撰稿时间
     */
    private Date writeTime;

    /**
     * 频道ID
     */
    private Long channelId;

    /**
     * 栏目ID
     */
    private Long columnId;

    /**
     * 撰稿人
     */
    private String writeUserId;

    /**
     * 发布人
     */
    private String buildUserId;

    /**
     * 平台
     */
    private int platform = PlatformEnum.CMS.getType();

    /**
     * 详情
     */
    private NewsDetail newsDetail;
}
