package com.cn.cms.biz;

import com.cn.cms.bo.RelationColumn;
import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.po.Channel;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.po.NewsRecommend;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by zhangyang on 16/12/11.
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
            result.add(relationColumn);
        }
        return result;
    }

    /**
     * 保存新闻栏目
     * @param newsColumn
     */
    public void saveNewsColumn(NewsColumn newsColumn){
        newsService.saveNewsColumn(newsColumn);
//        作废
//        if(newsColumn.getListId()!=null){
//            preTemplateBiz.buildListTemplate(newsColumn, newsColumn.getListId(), TemplateClassifyEnum.list);
//        }
//        if(newsColumn.getDetailId()!=null){
//            preTemplateBiz.buildDetailTemplate(newsColumn, newsColumn.getDetailId(), TemplateClassifyEnum.detail);
//        }
    }

    /**
     * 修改新闻栏目
     * @param newsColumn
     */
    public void updateNewsColumn(NewsColumn newsColumn){
//        作废
//        NewsColumn old = newsService.getNewsColumn(newsColumn.getId());
        newsService.updateNewsColumn(newsColumn);
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
        Integer count = newsService.queryNewsCount(null, null);
        page.setCount(count);
        if(page.isQuery()) {
            return newsService.queryNewsList(null, null, page);
        }
        return null;
    }

    public List<News> myNewsList(String userId, Integer publish, Page page){
        Integer count = newsService.queryNewsCount(userId, publish);
        page.setCount(count);
        if(page.isQuery()) {
            return newsService.queryNewsList(userId, publish, page);
        }
        return null;
    }

    public News findNewsAndDetail(Long id){
        return newsService.findNewsAndDetail(id);
    }

    /**
     * 保存新闻
     * @param news
     */
    public void saveNews(News news){
        newsService.saveNews(news);
    }

    public void updateNews(News news){
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

    public void recommendNews(NewsRecommend newsRecommend){
        newsService.updateNewsRecommend(newsRecommend);
    }

}

