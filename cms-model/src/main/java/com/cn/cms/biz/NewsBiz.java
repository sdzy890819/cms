package com.cn.cms.biz;

import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

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

    public List<NewsColumn> listNewsColumn(Long channelId){
        return newsService.queryList(channelId);
    }

    /**
     * 保存新闻栏目
     * @param newsColumn
     */
    public void saveNewsColumn(NewsColumn newsColumn){
        newsService.saveNewsColumn(newsColumn);
        if(newsColumn.getListId()!=null){
            preTemplateBiz.buildListTemplate(newsColumn, newsColumn.getListId(), TemplateClassifyEnum.list);
        }
        if(newsColumn.getDetailId()!=null){
            preTemplateBiz.buildDetailTemplate(newsColumn, newsColumn.getDetailId(), TemplateClassifyEnum.detail);
        }
    }

    /**
     * 修改新闻栏目
     * @param newsColumn
     */
    public void updateNewsColumn(NewsColumn newsColumn){
        NewsColumn old = newsService.getNewsColumn(newsColumn.getId());
        newsService.updateNewsColumn(newsColumn);
        if(old.getListId() != newsColumn.getListId() && newsColumn.getListId()!=null){
            if(old.getListTemplateId()!=null){
                preTemplateBiz.destroyListTemplate(old.getId(), old.getListTemplateId(), newsColumn.getLastModifyUserId());
            }
            preTemplateBiz.buildListTemplate(newsColumn, newsColumn.getListId(), TemplateClassifyEnum.list);
        }
        if(old.getDetailId() != newsColumn.getDetailId() && newsColumn.getDetailId()!=null){
            if(old.getDetailTemplateId()!=null){
                preTemplateBiz.destroyListTemplate(old.getId(), old.getDetailTemplateId(), newsColumn.getLastModifyUserId());
            }
            preTemplateBiz.buildDetailTemplate(newsColumn, newsColumn.getDetailId(), TemplateClassifyEnum.detail);
        }
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
        NewsColumn old = newsService.getNewsColumn(id);
        newsService.delNewsColumn(lastModifyUserId, id);
        if(old !=null && old.getDetailTemplateId()!=null){
            preTemplateBiz.destroyListTemplate(old.getId(), old.getDetailTemplateId(), lastModifyUserId);
        }
        if(old !=null && old.getListTemplateId()!=null){
            preTemplateBiz.destroyListTemplate(old.getId(), old.getListTemplateId(), lastModifyUserId);
        }
    }

    public List<News> listNews(Page page){
        Integer count = newsService.queryNewsCount();
        page.setCount(count);
        if(page.isQuery()) {
            return newsService.queryNewsList(page);
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

}

