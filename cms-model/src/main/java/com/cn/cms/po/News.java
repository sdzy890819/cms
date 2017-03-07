package com.cn.cms.po;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PlatformEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.RecommendEnum;
import com.cn.cms.utils.StringUtils;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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
     * 部门ID
     */
    private Long categoryId;

    /**
     * 频道ID
     */
    private Long channelId;

    /**
     * 频道名
     */
    private String channelName;

    /**
     * 栏目ID
     */
    private Long columnId;

    /**
     * 栏目名称
     */
    private String columnName;

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
     * 发布人名
     */
    private String buildUserName;

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

    /**
     * 自定义字段
     */
    private String field1;

    /**
     * 自定义字段
     */
    private String field2;

    /**
     * 自定义字段
     */
    private String field3;

    /**
     * 自定义字段
     */
    private String field4;

    /**
     * 自定义字段
     */
    private String field5;

    /**
     * 是否定时。
     */
    private Integer autoPublish;

    /**
     * 定时
     */
    private Date timer;

    /**
     * 图片URL
     */
    private String imageUrl;

    /**
     * 发布状态
     */
    private String publishStr;

    /**
     * 推荐排序
     */
    protected Integer sort = 1000;

    /**
     * 推荐标题
     */
    protected String recommendTitle;

    /**
     * 推荐内容
     */
    protected String recommendDescription;

    /**
     * 推荐图片地址
     */
    protected String recommendImages;

    /**
     * 推荐栏目ID
     */
    protected Long recommendColumnId;

    /**
     * 推荐人
     */
    protected String recommendUserId;

    protected String updateTimeStr;

    protected String buildTimeStr;

    public String getUpdateTimeStr(){
        if(updateTime!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(updateTime);
        }
        return " ";
    }

    public String getBuildTimeStr(){
        if(buildTime!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(buildTime);
        }
        return " ";
    }

    /**
     * 是否推荐
     */
    protected Integer recommend = RecommendEnum.NO.getType();

    //-----新增
    /**
     * 新闻股票列表
     */
    private List<NewsStock> newsStocks;

    /**
     * 可修改发布时间
     */
    private Date editPublishTime;

    /**
     * 作者数组
     */
    private String[] authorArray;

    /**
     * 关键字数组
     */
    private String[] keywordArray;

    /**
     * 股票代码列表
     */
    private String[] stockArray;

    public String getPublishStr(){
        PublishEnum publishEnum = PublishEnum.get(publish);
        if(publishEnum!=null){
            return publishEnum.getName();
        }
        return publishStr;
    }

    public String getPlatformStr(){
        return PlatformEnum.get(platform).getName();
    }
}
