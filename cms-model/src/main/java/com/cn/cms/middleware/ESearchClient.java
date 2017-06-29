package com.cn.cms.middleware;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.SortEnum;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.middleware.bo.ImagesSearch;
import com.cn.cms.middleware.bo.NewsSearch;
import com.cn.cms.middleware.bo.TopicSearch;
import com.cn.cms.middleware.bo.VideoSearch;
import com.cn.cms.middleware.po.QueryResult;
import com.cn.cms.po.*;
import com.cn.cms.utils.DateUtils;
import com.cn.cms.utils.HtmlUtils;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import lombok.Getter;
import lombok.Setter;
import org.apache.http.client.methods.RequestBuilder;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.sort.SortOrder;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

/**
 * Created by ADMIN on 17/1/5.
 */
@Getter
@Setter
public class ESearchClient {

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    private TransportClient client;

    private List<String> clusterList;

    private String url;

    private Calendar calendar = Calendar.getInstance();

    private String clusterName;

    private String timeout;


    /**
     * 新闻检索
     * @param newsSearch
     * @param page
     * @return
     */
    public QueryResult<News> searchNews(NewsSearch newsSearch, Page page){
        BoolQueryBuilder qb = QueryBuilders.boolQuery();
        if(StringUtils.isNotBlank(newsSearch.getCondition())) {
            if(newsSearch.getCondition().length() == newsSearch.getCondition().getBytes().length){
                qb = qb.must(QueryBuilders.multiMatchQuery(newsSearch.getCondition(), new String[]{"title", "title.pinyin", "subTitle", "keyword", "description", "content","recommendTitle","recommendDescription"}));
            }else {
                qb = qb.must(QueryBuilders.multiMatchQuery(newsSearch.getCondition(), new String[]{"title","subTitle","keyword","description","content","recommendTitle","recommendDescription"}));
            }
        }
        if(StringUtils.isNotBlank(newsSearch.getAuthor())){
            qb = qb.must(QueryBuilders.commonTermsQuery(StaticContants.FIELD_AUTHOR, newsSearch.getAuthor()));
        }
        if(StringUtils.isNotBlank(newsSearch.getSource())){
            qb = qb.must(QueryBuilders.commonTermsQuery(StaticContants.FIELD_SOURCE,newsSearch.getSource()));
        }
        if(newsSearch.getCategoryId()!=null && newsSearch.getCategoryId()>0){
            qb = qb.must(QueryBuilders.termQuery("categoryId", newsSearch.getCategoryId()));
        }
        if(newsSearch.getChannelId()!=null && newsSearch.getChannelId()>0){
            qb = qb.must(QueryBuilders.termQuery(StaticContants.FIELD_CHANNELID, newsSearch.getChannelId()));
        }
        if(newsSearch.getColumnId()!=null && newsSearch.getColumnId()>0){
            qb = qb.must(QueryBuilders.termQuery(StaticContants.FIELD_COLUMNID, newsSearch.getColumnId()));
        }
        if(newsSearch.getPlatform()!=null && newsSearch.getPlatform()>0){
            qb = qb.must(QueryBuilders.termQuery(StaticContants.FIELD_PLATFORM, newsSearch.getPlatform()));
        }
        if(newsSearch.getStartTimeMillis()!=null && newsSearch.getStartTimeMillis()>0){
            qb = qb.must(QueryBuilders.rangeQuery(StaticContants.FIELD_CREATE_TIME).gte(newsSearch.getStartTimeMillis()));
        }
        if(newsSearch.getEndTimeMillis()!=null && newsSearch.getEndTimeMillis()>0){
            qb = qb.must(QueryBuilders.rangeQuery(StaticContants.FIELD_CREATE_TIME).lte(newsSearch.getEndTimeMillis()));
        }
        if(StringUtils.isNotBlank(newsSearch.getBuildUserId())){
            qb = qb.must(QueryBuilders.termQuery("buildUserId", newsSearch.getBuildUserId()));
        }
        if(StringUtils.isNotBlank(newsSearch.getLastModifyUserId())){
            qb = qb.must(QueryBuilders.termQuery("lastModifyUserId", newsSearch.getLastModifyUserId()));
        }
        if(newsSearch.getDelTag() != null){
            qb = qb.must(QueryBuilders.termQuery("delTag", newsSearch.getDelTag()));
        }
        if(newsSearch.getPublish() != null){
            qb = qb.must(QueryBuilders.termQuery("publish", newsSearch.getPublish()));
        }
        if(newsSearch.getId()!=null && newsSearch.getId()>0){
            qb = qb.must(QueryBuilders.termQuery("id", newsSearch.getId()));
        }


        SearchRequestBuilder builder = this.client.prepareSearch(ESSearchTypeEnum.news.getIndex())
                .setTypes(ESSearchTypeEnum.news.getName())
                .setFrom(page.getStart())
                .setSize(page.getPageSize())
                .setQuery(qb)
                .setSearchType(SearchType.DEFAULT)
                .setExplain(false);
        if(newsSearch.getSort()!=null && newsSearch.getSort() > 0){
            builder = builder.addSort(SortEnum.get(newsSearch.getSort()).getSort(), SortOrder.DESC);
        }else {
            builder = builder.addSort("id", SortOrder.DESC);
        }
        log.info(builder.toString());
        SearchResponse response = builder.execute().actionGet();
        SearchHits hits = response.getHits();
        page.setCount((int)hits.getTotalHits());

        QueryResult<News> queryResult = new QueryResult<>();
        List<News> newses = new ArrayList<>();
        for(SearchHit hit : hits){
            News news = new News();
            news.setId(convertLong(hit.getSource().get("id").toString()));
            news.setUrl((String)hit.getSource().get("url"));
            news.setTitle((String)hit.getSource().get("title"));
            news.setPublish(convertInteger( hit.getSource().get("publish")));
            news.setSubTitle((String)hit.getSource().get("subTitle"));
            news.setKeyword((String)hit.getSource().get("keyword"));
            news.setDescription((String)hit.getSource().get("description"));
            news.setSource((String)hit.getSource().get("source"));
            news.setAuthor((String)hit.getSource().get("author"));
            news.setBuildTime(convertLongAndDate(hit.getSource().get("buildTime")));
            news.setBuildUserId((String)hit.getSource().get("buildUserId"));
            news.setWriteTime(convertLongAndDate(hit.getSource().get("writeTime")));
            news.setWriteUserId((String)hit.getSource().get("writeUserId"));
            news.setCategoryId(convertLong(hit.getSource().get("categoryId")));
            news.setChannelId(convertLong(hit.getSource().get("channelId")));
            news.setColumnId(convertLong(hit.getSource().get("columnId")));
            news.setPlatform(convertInteger(hit.getSource().get("platform")));
            news.setRelativePath((String)hit.getSource().get("relativePath"));
            news.setUpdateTime(convertLongAndDate(hit.getSource().get("updateTime")));
            news.setLastModifyUserId((String) hit.getSource().get("lastModifyUserId"));
            newses.add(news);
        }
        queryResult.setList(newses);
        queryResult.setPage(page);
        return queryResult;
    }

    /**
     * 转换类型
     * @param obj
     * @return
     */
    public Long convertLong(Object obj){
        if(obj!=null){
            return Long.parseLong(obj.toString());
        }
        return 0L;
    }

    /**
     * 转换类型
     * @param obj
     * @return
     */
    public Integer convertInteger(Object obj){
        if(obj!=null){
            return Integer.parseInt(obj.toString());
        }
        return 0;
    }

    /**
     * 转换类型
     * @param obj
     * @return
     */
    public Date convertLongAndDate(Object obj){
        if(obj!=null){
            if(Long.parseLong(obj.toString()) > 0 ) {
                calendar.setTimeInMillis(Long.parseLong(obj.toString()));
                return calendar.getTime();
            }else {
                return null;
            }
        }
        return null;
    }



    /**
     * 查询专题
     * @param topicSearch
     * @param page
     * @return
     */
    public QueryResult<Topic> searchTopic(TopicSearch topicSearch, Page page){
        BoolQueryBuilder qb = QueryBuilders.boolQuery();
        if(StringUtils.isNotBlank(topicSearch.getCondition())) {
            if(topicSearch.getCondition().length() == topicSearch.getCondition().getBytes().length){
                qb = qb.must(QueryBuilders.multiMatchQuery(topicSearch.getCondition(), new String[]{"topicTitle", "topicTitle.pinyin", "keyword", "description"}));
            }else {
                qb = qb.must(QueryBuilders.multiMatchQuery(topicSearch.getCondition(), new String[]{"topicTitle", "keyword", "description"}));
            }

        }
        if(topicSearch.getChannelId()!=null && topicSearch.getChannelId()>0){
            qb = qb.must(QueryBuilders.termQuery("channelId", topicSearch.getChannelId()));
        }
        if(topicSearch.getCategoryId()!=null && topicSearch.getCategoryId()>0){
            qb = qb.must(QueryBuilders.termQuery("categoryId", topicSearch.getCategoryId()));
        }
        if(topicSearch.getTopicClassifyId()!=null && topicSearch.getTopicClassifyId()>0){
            qb = qb.must(QueryBuilders.termQuery("topicClassifyId", topicSearch.getTopicClassifyId()));
        }
        if(topicSearch.getTopicColumnId()!=null && topicSearch.getTopicColumnId()>0){
            qb = qb.must(QueryBuilders.termQuery("topicColumnId", topicSearch.getTopicColumnId()));
        }
        if(topicSearch.getReleaseTimeMillis()!=null && topicSearch.getReleaseTimeMillis()>0){
            qb = qb.must(QueryBuilders.termQuery("releaseTime", topicSearch.getReleaseTimeMillis()));
        }
        if(topicSearch.getStartTimeMillis()!=null && topicSearch.getStartTimeMillis()>0){
            qb = qb.must(QueryBuilders.rangeQuery("createTime").gte(topicSearch.getStartTimeMillis()));
        }
        if(topicSearch.getEndTimeMillis()!=null && topicSearch.getEndTimeMillis()>0){
            qb = qb.must(QueryBuilders.rangeQuery("createTime").lte(topicSearch.getEndTimeMillis()));
        }


        SearchRequestBuilder builder = this.client.prepareSearch(ESSearchTypeEnum.topic.getIndex())
                .setTypes(ESSearchTypeEnum.topic.getName())
                .setFrom(page.getStart())
                .setSize(page.getPageSize())
                .setQuery(qb)
                .setSearchType(SearchType.DEFAULT)
                .setExplain(false)
                .addSort("id", SortOrder.DESC);
        log.info(builder.toString());
        SearchResponse response = builder.execute().actionGet();
        SearchHits hits = response.getHits();
        page.setCount((int)hits.getTotalHits());
        QueryResult<Topic> queryResult = new QueryResult<>();
        List<Topic> topics = new ArrayList<>();
        for(SearchHit hit : hits){
            Topic topic = new Topic();
            topic.setId(convertLong(hit.getSource().get("id")));
            topic.setTopicTitle((String)hit.getSource().get("topicTitle"));
            topic.setTopicPath((String)hit.getSource().get("topicPath"));
            topic.setTopicFilename((String)hit.getSource().get("topicFilename"));
            topic.setTopicClassifyId(convertLong(hit.getSource().get("topicClassifyId")));
            topic.setCategoryId(convertLong(hit.getSource().get("categoryId")));
            topic.setChannelId(convertLong(hit.getSource().get("channelId")));
            topic.setReleaseTime(convertLongAndDate(hit.getSource().get("releaseTime")));
            topic.setKeyword((String)hit.getSource().get("keyword"));
            topic.setDescription((String)hit.getSource().get("description"));
            topic.setTopicColumnId(convertLong(hit.getSource().get("topicColumnId")));
            topic.setTopicUrl((String)hit.getSource().get("topicUrl"));
            topic.setBuildUserId((String)hit.getSource().get("buildUserId"));
            topic.setBuildTime(convertLongAndDate(hit.getSource().get("buildTime")));
            topic.setPublish(convertInteger(hit.getSource().get("publish")));
            topics.add(topic);
        }
        queryResult.setList(topics);
        queryResult.setPage(page);
        return queryResult;
    }

    /**
     * 查询图片
     * @param imagesSearch
     * @param page
     * @return
     */
    public QueryResult<Images> searchImages(ImagesSearch imagesSearch, Page page){
        BoolQueryBuilder qb = QueryBuilders.boolQuery();
        if(StringUtils.isNotBlank(imagesSearch.getCondition())) {
            if(imagesSearch.getCondition().length() == imagesSearch.getCondition().getBytes().length){
                qb = qb.must(QueryBuilders.multiMatchQuery(imagesSearch.getCondition(), new String[]{"imageTitle", "imageTitle.pinyin"}));
            }else {
                qb = qb.must(QueryBuilders.matchQuery("imageTitle", imagesSearch.getCondition()));
            }
        }
        SearchRequestBuilder builder = this.client.prepareSearch(ESSearchTypeEnum.images.getIndex())
                .setTypes(ESSearchTypeEnum.images.getName())
                .setFrom(page.getStart())
                .setSize(page.getPageSize())
                .setQuery(qb)
                .setSearchType(SearchType.DEFAULT)
                .setExplain(false)
                .addSort("id", SortOrder.DESC);
        log.info(builder.toString());
        SearchResponse response = builder.execute().actionGet();
        SearchHits hits = response.getHits();
        page.setCount((int)hits.getTotalHits());
        QueryResult<Images> queryResult = new QueryResult<>();
        List<Images> imagesList = new ArrayList<>();
        for(SearchHit hit : hits){
            Images images = new Images();
            images.setId(convertLong(hit.getSource().get("id")));
            images.setImageUrl((String)hit.getSource().get("imageUrl"));
            images.setImageWidthPixel(convertInteger(hit.getSource().get("imageWidthPixel")));
            images.setImageHeightPixel(convertInteger(hit.getSource().get("imageHeightPixel")));
            images.setOrgWidthPixel(convertInteger(hit.getSource().get("orgWidthPixel")));
            images.setOrgHeightPixel(convertInteger(hit.getSource().get("orgHeightPixel")));
            images.setImageTitle((String)hit.getSource().get("imageTitle"));
            images.setUploadUserId((String)hit.getSource().get("uploadUserId"));
            images.setUploadTime(convertLongAndDate(hit.getSource().get("uploadTime")));
            images.setImagePath((String)hit.getSource().get("imagePath"));
            images.setWatermark(convertInteger(hit.getSource().get("watermark")));
            images.setCompress(convertInteger(hit.getSource().get("compress")));
            images.setPlatform(convertInteger(hit.getSource().get("platform")));
            images.setCreateUserId((String)hit.getSource().get("createUserId"));
            images.setLastModifyUserId((String)hit.getSource().get("lastModifyUserId"));
            images.setCreateTime(convertLongAndDate(hit.getSource().get("createTime")));
            images.setUpdateTime(convertLongAndDate(hit.getSource().get("updateTime")));

            imagesList.add(images);
        }
        queryResult.setList(imagesList);
        queryResult.setPage(page);
        return queryResult;
    }

    /**
     * 查询视频
     * @param videoSearch
     * @param page
     * @return
     */
    public QueryResult<Video> searchVideo(VideoSearch videoSearch, Page page){
        BoolQueryBuilder qb = QueryBuilders.boolQuery();
        if(StringUtils.isNotBlank(videoSearch.getCondition())) {
            if(videoSearch.getCondition().length() == videoSearch.getCondition().getBytes().length){
                qb = qb.must(QueryBuilders.multiMatchQuery(videoSearch.getCondition(), new String[]{"videoTitle", "videoTitle.pinyin", "videoDesc"}));
            }else {
                qb = qb.must(QueryBuilders.multiMatchQuery(videoSearch.getCondition(), new String[]{"videoTitle", "videoDesc"}));
            }
        }

        SearchRequestBuilder builder = this.client.prepareSearch(ESSearchTypeEnum.video.getIndex())
                .setTypes(ESSearchTypeEnum.video.getName())
                .setFrom(page.getStart())
                .setSize(page.getPageSize())
                .setQuery(qb)
                .setSearchType(SearchType.DEFAULT)
                .setExplain(false)
                .addSort("id", SortOrder.DESC);
        log.info(builder.toString());
        SearchResponse response = builder.execute().actionGet();
        SearchHits hits = response.getHits();
        page.setCount((int)hits.getTotalHits());
        Calendar calendar = Calendar.getInstance();
        QueryResult<Video> queryResult = new QueryResult<>();
        List<Video> videos = new ArrayList<>();
        for(SearchHit hit : hits){
            Video video = new Video();
            video.setId(convertLong(hit.getSource().get("id")));
            video.setVideoTitle((String)hit.getSource().get("videoTitle"));
            video.setVideoDesc((String)hit.getSource().get("videoDesc"));
            video.setUploadUserId((String)hit.getSource().get("uploadUserId"));
            video.setUploadTime(convertLongAndDate(hit.getSource().get("uploadTime")));
            video.setVideoUrl((String)hit.getSource().get("videoUrl"));
            video.setVideoPath((String) hit.getSource().get("videoPath"));
            video.setPlatform(convertInteger(hit.getSource().get("platform")));
            video.setM3u8Url((String) hit.getSource().get("m3u8Url"));
            video.setCreateUserId((String)hit.getSource().get("createUserId"));
            video.setLastModifyUserId((String)hit.getSource().get("lastModifyUserId"));
            video.setCreateTime(convertLongAndDate(hit.getSource().get("createTime")));
            video.setUpdateTime(convertLongAndDate(hit.getSource().get("updateTime")));

            videos.add(video);
        }
        queryResult.setList(videos);
        queryResult.setPage(page);
        return queryResult;
    }

    /**
     * 更新新闻索引
     * @param news
     * @return
     */
    public boolean updateNews(News news){
        boolean bool = false;
        try {
            XContentBuilder builder = jsonBuilder().startObject();
            builder = builder.field("id", news.getId());
            builder = builder.field("title", news.getTitle());
            builder = builder.field("subTitle", news.getSubTitle());
            builder = builder.field("keyword", news.getKeyword());
            builder = builder.field("description", news.getDescription());
            builder = builder.field("source", news.getSource());
            builder = builder.field("author", news.getAuthor());

            builder = builder.field("authorArray", JSONArray.toJSONString(news.getAuthor().split(StaticContants.REGEX_SPLIT)));
            builder = builder.field("keywordArray", JSONArray.toJSONString(news.getKeyword().split(StaticContants.REGEX_SPLIT)));
            builder = builder.field("editPublishTime", DateUtils.convertDateToMillis(news.getEditPublishTime()));
            if(StringUtils.isNotEmpty(news.getNewsStocks())) {
                String[] stockArray = new String[news.getNewsStocks().size()];
                for(int i=0;i<news.getNewsStocks().size();i++){
                    stockArray[i] = news.getNewsStocks().get(i).getStockCode();
                }
                builder = builder.field("stockArray", JSONArray.toJSONString(stockArray));
            }
            builder = builder.field("imageUrl", news.getImageUrl());

            builder = builder.field("buildTime", DateUtils.convertDateToMillis(news.getBuildTime()));
            builder = builder.field("writeTime", DateUtils.convertDateToMillis(news.getWriteTime()));
            builder = builder.field("categoryId", news.getCategoryId());
            builder = builder.field("channelId", news.getChannelId());
            builder = builder.field("columnId", news.getColumnId());
            builder = builder.field("writeUserId", news.getWriteUserId());
            builder = builder.field("buildUserId", news.getBuildUserId());
            builder = builder.field("platform", news.getPlatform());
            builder = builder.field("content", news.getNewsDetail()!=null?news.getNewsDetail().getContent():"");
            builder = builder.field("url", news.getUrl());
            builder = builder.field("relativePath", news.getRelativePath());
            builder = builder.field("publish", news.getPublish());
            builder = builder.field("field1", news.getField1());
            builder = builder.field("field2", news.getField2());
            builder = builder.field("field3", news.getField3());
            builder = builder.field("field4", news.getField4());
            builder = builder.field("field5", news.getField5());
            builder = builder.field("autoPublish", news.getAutoPublish());
            builder = builder.field("timer", DateUtils.convertDateToMillis(news.getTimer()));
            builder = builder.field("sort", news.getSort());
            builder = builder.field("recommendTitle",news.getRecommendTitle());
            builder = builder.field("recommendDescription", news.getRecommendDescription());
            builder = builder.field("recommendImages", news.getRecommendImages());
            builder = builder.field("recommendColumnId", news.getRecommendColumnId());
            builder = builder.field("recommendUserId", news.getRecommendUserId());
            builder = builder.field("recommend", news.getRecommend());
            builder = builder.field("createTime", DateUtils.convertDateToMillis(news.getCreateTime()));
            builder = builder.field("updateTime", DateUtils.convertDateToMillis(news.getUpdateTime()));
            builder = builder.field("delTag", news.getDelTag());
            builder = builder.field("lastModifyUserId", news.getLastModifyUserId());
            builder = builder.field("createUserId", news.getCreateUserId());
            builder = builder.field("recommendTime", DateUtils.convertDateToMillis(news.getRecommendTime()));
            builder = builder.endObject();
            IndexResponse response = client.prepareIndex(ESSearchTypeEnum.news.getIndex(),
                    ESSearchTypeEnum.news.getName(), String.valueOf(news.getId()))
                    .setSource(builder)
                    .get();
            bool = true;
        } catch (IOException e) {
            log.error(e);
        }
        return bool;
    }

    /**
     * 统一更新
     * @param base
     * @param esSearchTypeEnum
     * @return
     */
    public boolean update(Base base, ESSearchTypeEnum esSearchTypeEnum){
        boolean bool = false;

        switch (esSearchTypeEnum){
            case news:{
                bool = this.updateNews((News) base);
                break;
            }
            case topic:{
                bool = this.updateTopic((Topic) base);
                break;
            }
            case images:{
                bool = this.updateImages((Images) base);
                break;
            }
            case video:{
                bool = this.updateVideo((Video) base);
                break;
            }
            default:{
                break;
            }
        }
        return bool;
    }

    /**
     * 删除索引
     * @param id
     * @param esSearchTypeEnum
     * @return
     */
    public boolean delete(Long id, ESSearchTypeEnum esSearchTypeEnum){
        boolean bool = false;
        DeleteResponse response = client.prepareDelete(esSearchTypeEnum.getIndex(),
                esSearchTypeEnum.getName(), String.valueOf(id)).get();
        if(response.status() == RestStatus.OK) {
            bool = true;
        }
        return bool;
    }

    /**
     * 更新专题索引
     * @param topic
     * @return
     */
    public boolean updateTopic(Topic topic){
        boolean bool = false;
        try {
            XContentBuilder builder = jsonBuilder().startObject();
            builder = builder.field("id", topic.getId());
            builder = builder.field("topicTitle", topic.getTopicTitle());
            builder = builder.field("topicPath", topic.getTopicPath());
            builder = builder.field("topicFilename", topic.getTopicFilename());
            builder = builder.field("topicClassifyId", topic.getTopicClassifyId());
            builder = builder.field("categoryId", topic.getCategoryId());
            builder = builder.field("channelId", topic.getChannelId());
            builder = builder.field("releaseTime", DateUtils.convertDateToMillis(topic.getReleaseTime()));
            builder = builder.field("keyword", topic.getKeyword());
            builder = builder.field("description", topic.getDescription());
            builder = builder.field("topicColumnId", topic.getTopicColumnId());
            builder = builder.field("topicUrl", topic.getTopicUrl());
            builder = builder.field("buildUserId", topic.getBuildUserId());
            builder = builder.field("buildTime", DateUtils.convertDateToMillis(topic.getBuildTime()));
            builder = builder.field("publish", topic.getPublish());
            builder = builder.field("createTime", DateUtils.convertDateToMillis(topic.getCreateTime()));
            builder = builder.field("updateTime", DateUtils.convertDateToMillis(topic.getUpdateTime()));
            builder = builder.field("delTag", topic.getDelTag());
            builder = builder.field("lastModifyUserId", topic.getLastModifyUserId());
            builder = builder.field("createUserId", topic.getCreateUserId());
            builder = builder.endObject();
            IndexResponse response = client.prepareIndex(ESSearchTypeEnum.topic.getIndex(),
                    ESSearchTypeEnum.topic.getName(), String.valueOf(topic.getId()))
                    .setSource(builder)
                    .get();
            bool = true;
        } catch (IOException e) {
            log.error(e);
        }
        return bool;
    }

    /**
     * 更新图片索引
     * @param images
     * @return
     */
    public boolean updateImages(Images images){
        boolean bool = false;
        try {
            XContentBuilder builder = jsonBuilder().startObject();
            builder = builder.field("id", images.getId());
            builder = builder.field("imageUrl", images.getImageUrl());
            builder = builder.field("imageWidthPixel", images.getImageWidthPixel());
            builder = builder.field("imageHeightPixel", images.getImageHeightPixel());
            builder = builder.field("orgWidthPixel", images.getOrgWidthPixel());
            builder = builder.field("orgHeightPixel", images.getOrgHeightPixel());
            builder = builder.field("imageTitle", images.getImageTitle());
            builder = builder.field("uploadUserId", images.getUploadUserId());
            builder = builder.field("uploadTime", DateUtils.convertDateToMillis(images.getUploadTime()));
            builder = builder.field("imagePath", images.getImagePath());
            builder = builder.field("watermark", images.getWatermark());
            builder = builder.field("compress", images.getCompress());
            builder = builder.field("platform", images.getPlatform());
            builder = builder.field("createTime", DateUtils.convertDateToMillis(images.getCreateTime()));
            builder = builder.field("updateTime", DateUtils.convertDateToMillis(images.getUpdateTime()));
            builder = builder.field("delTag", images.getDelTag());
            builder = builder.field("lastModifyUserId", images.getLastModifyUserId());
            builder = builder.field("createUserId", images.getCreateUserId());
            builder = builder.endObject();
            IndexResponse response = client.prepareIndex(ESSearchTypeEnum.images.getIndex(),
                    ESSearchTypeEnum.images.getName(), String.valueOf(images.getId()))
                    .setSource(builder)
                    .get();
            bool = true;
        } catch (IOException e) {
            log.error(e);
        }
        return bool;
    }

    /**
     * 更新视频
     * @param video
     * @return
     */
    public boolean updateVideo(Video video){
        boolean bool = false;
        try {
            XContentBuilder builder = jsonBuilder().startObject();
            builder = builder.field("id", video.getId());
            builder = builder.field("videoTitle", video.getVideoTitle());
            builder = builder.field("videoDesc", video.getVideoDesc());
            builder = builder.field("uploadUserId", video.getUploadUserId());
            builder = builder.field("uploadTime", DateUtils.convertDateToMillis(video.getUploadTime()));
            builder = builder.field("videoUrl", video.getVideoUrl());
            builder = builder.field("m3u8Url", video.getM3u8Url());
            builder = builder.field("videoPath", video.getVideoPath());
            builder = builder.field("platform", video.getPlatform());
            builder = builder.field("createTime", DateUtils.convertDateToMillis(video.getCreateTime()));
            builder = builder.field("updateTime", DateUtils.convertDateToMillis(video.getUpdateTime()));
            builder = builder.field("delTag", video.getDelTag());
            builder = builder.field("lastModifyUserId", video.getLastModifyUserId());
            builder = builder.field("createUserId", video.getCreateUserId());
            builder = builder.endObject();
            IndexResponse response = client.prepareIndex(ESSearchTypeEnum.video.getIndex(),
                    ESSearchTypeEnum.video.getName(), String.valueOf(video.getId()))
                    .setSource(builder)
                    .get();
            bool = true;
        } catch (IOException e) {
            log.error(e);
        }
        return bool;
    }



    /**
     * 初始化
     */
    public void open(){
        try {
            Settings settings = Settings.builder()
                    .put("client.transport.sniff", false)
                    .put("cluster.name", clusterName)
                    .put("client.transport.ping_timeout", timeout).build();
            this.client = new PreBuiltTransportClient(settings);
            if(clusterList!=null){
                for(int i=0; i<clusterList.size(); i++){
                    String items = clusterList.get(i);
                    if(StringUtils.isNotBlank(items)){
                        String[] item = items.split(":");
                            this.client = this.client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(item[0]),Integer.parseInt(item[1])));
                    }
                }
            }
        } catch (UnknownHostException e) {
            log.error(e);
        }
    }

    /**
     * 销毁
     */
    public void close(){
        if (this.client == null) {
            return;
        }
        this.client.close();
        this.client = null;
    }

    public static void main(String[] args){
        ESearchClient eSearchClient = new ESearchClient();
        List<String> list = new ArrayList<>();
        list.add("120.77.220.11:9300");
        eSearchClient.setClusterList(list);
        eSearchClient.open();
        NewsSearch newsSearch = new NewsSearch();
        newsSearch.setCondition("测试");
        Page page = new Page(1,20);
        QueryResult<News> newsQueryResult = eSearchClient.searchNews(newsSearch,page);
        System.out.println(JSONObject.toJSONString(newsQueryResult));

    }



}
