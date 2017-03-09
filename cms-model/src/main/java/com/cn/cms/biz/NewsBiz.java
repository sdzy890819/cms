package com.cn.cms.biz;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.bo.PreviousColumn;
import com.cn.cms.bo.RelationColumn;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.DelTagEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.*;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.HtmlUtils;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/11.
 */
@Component
public class NewsBiz extends BaseBiz {

    @Resource
    private NewsService newsService;

    @Resource
    private PreTemplateBiz preTemplateBiz;

    @Resource
    private TemplateBiz templateBiz;

    @Resource
    private JedisClient jedisClient;

    @Resource
    private UserBiz userBiz;
    @Resource
    private ChannelBiz channelBiz;

    public List<NewsColumn> listNewsColumn(Long channelId){
        return newsService.queryList(channelId);
    }

    public List<NewsColumn> listNewsColumn(Page page){
        Integer count = this.newsService.queryListCount();
        page.setCount(count);
        if(page.isQuery()){
            return this.newsService.queryListForPage(page);
        }
        return null;
    }


    /**
     * 加载数据
     * @param list
     */
    public void dataInit(List<News> list ){
        List<String> userIds = new ArrayList<>();
        List<Long> channelIds = new ArrayList<>();
        List<Long> columnIds = new ArrayList<>();
        if(StringUtils.isNotEmpty(list)) {
            for (int i = 0; i < list.size(); i++) {
                if(StringUtils.isNotBlank(list.get(i).getWriteUserId())) {
                    userIds.add(list.get(i).getWriteUserId());
                }
                if(StringUtils.isNotBlank(list.get(i).getLastModifyUserId())) {
                    userIds.add(list.get(i).getLastModifyUserId());
                }
                if(StringUtils.isNotBlank(list.get(i).getBuildUserId())){
                    userIds.add(list.get(i).getBuildUserId());
                }
                if(list.get(i).getChannelId()!=null) {
                    channelIds.add(list.get(i).getChannelId());
                }
                if(list.get(i).getColumnId()!=null) {
                    columnIds.add(list.get(i).getColumnId());
                }
            }
            Map<String, UserBean> map = userBiz.getUserBeanMap(userIds);
            Map<Long ,Channel> channelMap = channelBiz.getChannelsMap(channelIds);
            Map<Long, NewsColumn> newsColumnMap = this.getNewsColumnMap(columnIds);
            for (int i = 0; i < list.size(); i++) {
                list.get(i).setWriteUserName(map.get(list.get(i).getWriteUserId())!=null?
                        map.get(list.get(i).getWriteUserId()).getRealName():"");
                list.get(i).setLastModifyUserName(map.get(list.get(i).getLastModifyUserId())!=null?
                        map.get(list.get(i).getLastModifyUserId()).getRealName():"");
                list.get(i).setBuildUserName(map.get(list.get(i).getBuildUserId())!=null?
                        map.get(list.get(i).getBuildUserId()).getRealName():"");
                list.get(i).setChannelName(channelMap.get(list.get(i).getChannelId())!=null?
                        channelMap.get(list.get(i).getChannelId()).getChannelName():"");
                list.get(i).setColumnName(newsColumnMap.get(list.get(i).getColumnId())!=null?
                        newsColumnMap.get(list.get(i).getColumnId()).getColumnName():"");
            }
        }
    }

    public List<RelationColumn> getAll(){
        List<Channel> list = channelBiz.listChannel();
        List<Long> ids = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            ids.add(list.get(i).getId());
        }
        List<NewsColumn> newsColumns = newsService.getListForChannelIds(ids);
        Map<Long, List<NewsColumn>> map = new HashMap<>();
        List<NewsColumn> tmp = null;
        for(int i=0;i<newsColumns.size();i++){
            NewsColumn newsColumn = newsColumns.get(i);
            tmp = map.get(newsColumn.getChannelId());
            if(!StringUtils.isNotEmpty(tmp)){
                tmp = new ArrayList<>();
                map.put(newsColumn.getChannelId(), tmp);
            }
            tmp.add(newsColumn);
        }

        List<RelationColumn> result = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            Channel channel = list.get(i);
            RelationColumn relationColumn = new RelationColumn();
            relationColumn.setChannel(channel);
            relationColumn.setList(map.get(channel.getId()));
            if(StringUtils.isNotEmpty(relationColumn.getList())) {
                result.add(relationColumn);
            }
        }
        return result;
    }

    /**
     * 保存新闻栏目
     * @param newsColumn
     */
    public void saveNewsColumn(NewsColumn newsColumn){
        newsService.saveNewsColumn(newsColumn);
        this.jedisClient.set(RedisKeyContants.getRedisNewcolumnId(newsColumn.getId()), JSONObject.toJSONString(newsColumn));
//        作废
//        if(newsColumn.getListId()!=null){
//            preTemplateBiz.buildListTemplate(newsColumn, newsColumn.getListId(), TemplateClassifyEnum.list);
//        }
//        if(newsColumn.getDetailId()!=null){
//            preTemplateBiz.buildDetailTemplate(newsColumn, newsColumn.getDetailId(), TemplateClassifyEnum.detail);
//        }
    }

    /**
     * 返回NewsColumnMap
     * @param list
     * @return
     */
    public Map<Long, NewsColumn> getNewsColumnMap(List<Long> list){
        Map<Long, String> map = new HashMap<>();
        for(int i=0;i<list.size();i++){
            map.put(list.get(i), RedisKeyContants.getRedisNewcolumnId(list.get(i)));
        }
        Map<Long, NewsColumn> result = new HashMap<>();
        List<String> tmp = jedisClient.mget(map.values().toArray(new String[map.size()]));
        if(StringUtils.isNotEmpty(tmp)){
            for(int i=0;i<tmp.size();i++){
                NewsColumn newsColumn = JSONObject.parseObject(tmp.get(i), NewsColumn.class);
                if(newsColumn!=null) {
                    result.put(newsColumn.getId(), newsColumn);
                }
            }
        }
        return result;
    }

    /**
     * 修改新闻栏目
     * @param newsColumn
     */
    public void updateNewsColumn(NewsColumn newsColumn){
//        作废
//        NewsColumn old = newsService.getNewsColumn(newsColumn.getId());
        newsService.updateNewsColumn(newsColumn);
        this.jedisClient.set(RedisKeyContants.getRedisNewcolumnId(newsColumn.getId()), JSONObject.toJSONString(newsColumn));
//        if(old.getListId() != newsColumn.getListId() && newsColumn.getListId()!=null){
//            if(old.getListTemplateId()!=null){
//                preTemplateBiz.destroyListTemplate(old.getId(), old.getListTemplateId(), newsColumn.getLastModifyUserId());
//            }
//            preTemplateBiz.buildListTemplate(newsColumn, newsColumn.getListId(), TemplateClassifyEnum.list);
//        }
//        if(old.getDetailId() != newsColumn.getDetailId() && newsColumn.getDetailId()!=null){
//            if(old.getDetailTemplateId()!=null){
//                preTemplateBiz.destroyListTemplate(old.getId(), old.getDetailTemplateId(), newsColumn.getLastModifyUserId());
//            }
//            preTemplateBiz.buildDetailTemplate(newsColumn, newsColumn.getDetailId(), TemplateClassifyEnum.detail);
//        }
    }

    /**
     * 获取栏目信息
     * @param id
     * @return
     */
    public NewsColumn getNewsColumn(Long id){
        return newsService.getNewsColumn(id);
    }

    /**
     * 删除栏目。
      * @param lastModifyUserId
     * @param id
     */
    public void delNewsColumn(String lastModifyUserId, Long id){
//        作废
//        NewsColumn old = newsService.getNewsColumn(id);
        newsService.delNewsColumn(lastModifyUserId, id);
//        if(old !=null && old.getDetailTemplateId()!=null){
//            preTemplateBiz.destroyListTemplate(old.getId(), old.getDetailTemplateId(), lastModifyUserId);
//        }
//        if(old !=null && old.getListTemplateId()!=null){
//            preTemplateBiz.destroyListTemplate(old.getId(), old.getListTemplateId(), lastModifyUserId);
//        }
    }

    public List<News> listNews(Page page){
        Integer count = newsService.queryNewsCount(null, null, null);
        page.setCount(count);
        if(page.isQuery()) {
            return newsService.queryNewsList(null, null, null, page);
        }
        return null;
    }

    public List<News> myNewsList(String userId, Integer publish, Page page){
        Integer count = newsService.queryNewsCount(userId, publish, null);
        page.setCount(count);
        if(page.isQuery()) {
            return newsService.queryNewsList(userId, publish, null, page);
        }
        return null;
    }

    public List<News> listNewsManage(Page page){
        Integer count = newsService.queryNewsCount(null, null, DelTagEnum.DEL.getType());
        page.setCount(count);
        if(page.isQuery()) {
            return newsService.queryNewsList(null, null, DelTagEnum.DEL.getType(), page);
        }
        return null;
    }

    public News findNewsAndDetail(Long id){
        return newsService.findNewsAndDetail(id);
    }

    public String getImagesUrl(String content){
        Pattern pattern = Pattern.compile(StaticContants.REGEX_IMG);
        Matcher matcher = pattern.matcher(content);
        if(matcher.find()){
            return matcher.group(3);
        }
        return null;
    }

    /**
     * 保存新闻
     * @param news
     */
    public void saveNews(News news){
        news.setImageUrl(getImagesUrl(news.getNewsDetail().getContent()));
        news.setNewsStocks(getNewsStock(news.getNewsDetail().getContent(), news.getLastModifyUserId(), news.getId()));
        newsService.saveNews(news);
        String result = jedisClient.get(RedisKeyContants.getRedisAddNewPreviousColumnInfo(news.getLastModifyUserId()));
        PreviousColumn previousColumn = null ;
        if(StringUtils.isNotBlank(result)){
            previousColumn = JSONObject.parseObject(result, PreviousColumn.class);

        }else{
            previousColumn = new PreviousColumn();
        }
        int tmp = 0;
        if(news.getChannelId()!=null){
            previousColumn.setChannelId(news.getChannelId());
            tmp ++ ;
        }
        if(news.getCategoryId()!=null){
            previousColumn.setCategoryId(news.getCategoryId());
            tmp ++ ;
        }
        if(news.getColumnId()!=null){
            previousColumn.setColumnId(news.getColumnId());
            tmp ++ ;
        }
        if(news.getSource()!=null){
            previousColumn.setSource(news.getSource());
        }
        if(tmp>0){
            jedisClient.set(RedisKeyContants.getRedisAddNewPreviousColumnInfo(news.getLastModifyUserId())
                    , JSONObject.toJSONString(previousColumn));
        }
    }

    public PreviousColumn getPreviousColumn(String userId){
        String result = jedisClient.get(RedisKeyContants.getRedisAddNewPreviousColumnInfo(userId));
        if(StringUtils.isNotBlank(result)){
            return JSONObject.parseObject(result, PreviousColumn.class);
        }
        return null;
    }

    public void updateNews(News news){
        news.setImageUrl(getImagesUrl(news.getNewsDetail().getContent()));
        news.setNewsStocks(getNewsStock(news.getNewsDetail().getContent(), news.getLastModifyUserId(), news.getId()));
        newsService.updateNews(news);
    }

    /**
     * 删除新闻
     * @param lastModifyUserId
     * @param id
     */
    public void delNews(String lastModifyUserId, Long id){
        newsService.delNews(lastModifyUserId, id);
    }

    /**
     * 根据columnId 分页获取当前信息
     * @param columnId
     * @param page
     * @return
     */
    public List<News> findNewsByColumnId(Long columnId, Page page){
        return newsService.findNewsByColumnId(columnId, page);
    }

    /**
     * 发布新闻
     * @param news
     */
    public void publishNews(News news){
        newsService.publishNews(news);
    }

    /**
     * 根据时间查询当前定时生成的内容
     * @param timer
     * @return
     */
    public List<News> findNewsByAutoPublish(Date timer){
        return newsService.findNewsByAutoPublish(PublishEnum.NO, AutoPublishEnum.YES, timer);
    }

    /**
     * 根据ID列表获取新闻列表
     * @param ids
     * @return
     */
    public List<News> findNewsAndDetailByIds(List<Long> ids){
        return newsService.findNewsAndDetailList(ids);
    }

    /**
     * 获取News.
     * @param id
     * @return
     */
    public News findNews(Long id){
        return newsService.findNews(id);
    }


    public NewsRecommend findNewsRecommend(Long id){
        return newsService.findNewsRecommend(id);
    }

    public List<NewsRecommend> findListByRecommedColumnId(Long recommendColumnId, Page page){
        return newsService.findListByRecommedColumnId(recommendColumnId, page);
    }

    public void recommendNews(NewsRecommend newsRecommend){
        newsService.updateNewsRecommend(newsRecommend);
    }

    public List<RecommendColumn> listRecommendColumn(){
        return newsService.findAll();
    }

    public void saveRecommendColumn(RecommendColumn p1){
        if(p1.getId()!=null && p1.getId()>0){
            newsService.updateRecommendColumn(p1);
        }else{
            newsService.createRecommendColumn(p1);
        }
    }

    /**
     * 发布列表页模版
     * @param newsColumn
     */
    public void publishListTemplate2(NewsColumn newsColumn){
        newsService.publishListTemplate2(newsColumn);
    }


    /**
     * 获取新闻相关的股票代码.
     * @param content
     * @param lastModifyUserId
     * @param newsId
     * @return
     */
    private List<NewsStock> getNewsStock(String content, String lastModifyUserId, Long newsId){
        List<String> list = HtmlUtils.matcher(content);
        List<NewsStock> result = new ArrayList<>();
        if(StringUtils.isNotEmpty(list)) {
            for (int i = 0; i < list.size(); i++) {
                String[] tmps = list.get(i).split(StaticContants.REGEX_SPLIT_STOCK);
                if(tmps.length == 2) {
                    NewsStock newsStock = new NewsStock();
                    newsStock.setLastModifyUserId(lastModifyUserId);
                    newsStock.setNewsId(newsId);
                    newsStock.setStockCode(tmps[0]);
                    newsStock.setStockName(tmps[1]);
                    result.add(newsStock);
                }
            }
        }
        return result;
    }

    /**
     * 查询新闻包含的股票列表
     * @param newsIds
     * @return
     */
    public Map<Long, List<NewsStock>> findNewsStocks(List<Long> newsIds){
        List<NewsStock> list = newsService.findNewsStocks(newsIds);
        Map<Long, List<NewsStock>> map = new HashMap<>();
        for(NewsStock newsStock : list){
            List<NewsStock> tmp = map.get(newsStock);
            if(StringUtils.isEmpty(tmp)){
                tmp = new ArrayList<>();
                map.put(newsStock.getNewsId() ,tmp);
            }
            tmp.add(newsStock);
        }
        return map;
    }

    /**
     * 查询新闻包含的股票列表
     * @param newsId
     * @return
     */
    public List<NewsStock> findNewsStockList(Long newsId){
        return newsService.findNewsStockList(newsId);
    }


    public News findNewsManage(Long id){
        return newsService.findNewsManage(id);
    }

    public News findNewsAndDetailManage(Long id){
        return newsService.findNewsAndDetailManage(id);
    }

    /**
     * 撤销发布
     * @param news
     */
    public void rescind(News news){
        newsService.updateRescind(news);
    }
}

