package com.cn.cms.po;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PlatformEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.PushTagEnum;
import com.cn.cms.enums.RecommendEnum;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 新闻PO
 * Created by ADMIN on 16/11/17.
 */
@Getter
@Setter
public class News extends Base implements Cloneable{

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
     * 定时文字
     */
    private String timerStr;

    /**
     * 图片URL
     */
    private String imageUrl;

    /**
     * 发布状态
     */
    private String publishStr;

    /**
     * 维护的stockCode
     */
    private String stockCode;

    /**
     * 股票名称
     */
    private String stockName;

    /**
     * 是否推送其他栏目
     */
    private Integer pushTag;

    /**
     * 推荐排序
     */
    protected Long sort = 1000L;

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

    /**
     * 推荐时间
     */
    protected Date recommendTime;

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

    public String getTimerStr(){
        if(timer!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(timer);
        }
        return " ";
    }

    /**
     * 是否推荐
     */
    protected Integer recommend = RecommendEnum.NO.getType();

    protected String recommendStr;

    public String getRecommendStr(){
        if(recommend!=null) {
            return RecommendEnum.get(recommend).getName();
        }
        return recommendStr;
    }

    //-----新增
    /**
     * 新闻股票列表
     */
    private List<NewsStock> newsStocks;

    /**
     * 临时新闻推送栏目信息JSON
     * [{title:"",val:""},{title:"",val:""}]
     */
    private JSONArray columnIds;

    /**
     * 可修改发布时间
     */
    private Date editPublishTime;


    /**
     * 作者数组
     */
    //private String[] authorArray;

    /**
     * 关键字数组
     */
    //private String[] keywordArray;

    /**
     * 股票代码列表
     */
    //private String[] stockArray;

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

    public News(){

    }

    public News(News news){
        if(news != null) {
            this.setTitle(news.getTitle());
            this.setSubTitle(news.getSubTitle());
            this.setKeyword(news.getKeyword());
            this.setDescription(news.getDescription());
            this.setSource(news.getSource());
            this.setAuthor(news.getAuthor());
            this.setBuildTime(news.getBuildTime());
            this.setWriteTime(news.getWriteTime());
            this.setCategoryId(news.getCategoryId());
            this.setChannelId(news.getChannelId());
            this.setChannelName(news.getChannelName());
            this.setColumnId(news.getColumnId());
            this.setColumnName(news.getColumnName());
            this.setWriteUserId(news.getWriteUserId());
            this.setWriteUserName(news.getWriteUserName());
            this.setBuildUserId(news.getBuildUserId());
            this.setBuildUserName(news.getBuildUserName());
            this.setPlatform(news.getPlatform());
            NewsDetail newsDetail = new NewsDetail(news.getNewsDetail());
            this.setNewsDetail(newsDetail);
            this.setPlatformStr(news.getPlatformStr());
            this.setUrl(news.getUrl());
            this.setRelativePath(news.getRelativePath());
            this.setPublish(news.getPublish());
            this.setField1(news.getField1());
            this.setField2(news.getField2());
            this.setField3(news.getField3());
            this.setField4(news.getField4());
            this.setField5(news.getField5());
            this.setAutoPublish(news.getAutoPublish());
            this.setTimer(news.getTimer());
            this.setImageUrl(news.getImageUrl());
            this.setPublishStr(news.getPublishStr());
            this.setSort(news.getSort());
            this.setRecommendTitle(news.getRecommendTitle());
            this.setRecommendDescription(news.getRecommendDescription());
            this.setRecommendImages(news.getRecommendImages());
            this.setRecommendColumnId(news.getRecommendColumnId());
            this.setRecommendUserId(news.getRecommendUserId());
            this.setRecommendTime(news.getRecommendTime());
            this.setRecommend(news.getRecommend());
            this.setNewsStocks(news.getNewsStocks());
            this.setEditPublishTime(news.getEditPublishTime());
            this.setId(news.getId());
            this.setCreateTime(news.getCreateTime());
            this.setUpdateTime(news.getUpdateTime());
            this.setDelTag(news.getDelTag());
            this.setLastModifyUserId(news.getLastModifyUserId());
            this.setLastModifyUserName(news.getLastModifyUserName());
        }
    }

    @Override
    public News clone() {
        News news = null;
        try {
            news =  (News)super.clone();
            news.setNewsDetail(news.getNewsDetail().clone());
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return news;
    }
}
