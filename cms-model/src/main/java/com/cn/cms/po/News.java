package com.cn.cms.po;

import com.cn.cms.enums.PlatformEnum;
import com.cn.cms.enums.PublishEnum;
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
     * 撰稿人
     */
    private String writeUserName;

    /**
     * 发布人
     */
    private String buildUserId;

    /**
     * 平台
     */
    private Integer platform = PlatformEnum.CMS.getType();

    /**
     * 平台名称
     */
    private String platformStr ;
    /**
     * 详情
     */
    private NewsDetail newsDetail;

    /**
     * 发布地址
     */
    private String url;

    /**
     * 发布相对地址
     */
    private String relativePath;

    /**
     * 是否发布
     */
    private Integer publish = PublishEnum.NO.getType();

    public String getPlatformStr(){
        return PlatformEnum.get(platform).getName();
    }
}
