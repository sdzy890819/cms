package com.cn.cms.po;

import com.cn.cms.enums.PublishEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 专题PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class Topic extends Base {

    /**
     * 专题标题
     */
    private String topicTitle;

    /**
     * 专题内容
     */
    private String topicContent;

    /**
     * 专题相对路径
     */
    private String topicPath;

    /**
     * 专题文件名
     */
    private String topicFilename;

    /**
     * 专题分类ID
     */
    private Long topicClassifyId;

    /**
     * 部门类别ID
     */
    private Long categoryId;

    /**
     * 频道ID
     */
    private Long channelId;

    /**
     * 发布时间 yyyy-MM-dd
     * 填写的。
     */
    private Date releaseTime;

    /**
     * 关键词.SEO标准
     */
    private String keyword;

    /**
     * 描述、SEO标准
     */
    private String description;

    /**
     * 专题栏目ID(做系列专题使用)
     */
    private Long topicColumnId;

    /**
     * URL
     */
    private String topicUrl;

    /**
     * 发布人
     */
    private String buildUserId;

    /**
     * 发布时间
     */
    private Date buildTime;

    /**
     * 是否发布
     */
    private Integer publish = PublishEnum.NO.getType();

    private String publishStr;

    public String getPublishStr(){
        PublishEnum publishEnum = PublishEnum.get(publish);
        if(publishEnum!=null){
            return publishEnum.getName();
        }
        return publishStr;
    }

}
