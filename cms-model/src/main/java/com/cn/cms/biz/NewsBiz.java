package com.cn.cms.biz;

import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.service.NewsService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/12/11.
 */
@Component
public class NewsBiz extends BaseBiz {

    @Resource
    private NewsService newsService;

    public List<NewsColumn> listNewsColumn(Long channelId){
        return newsService.queryList(channelId);
    }

    public void saveNewsColumn(NewsColumn newsColumn){
        newsService.saveNewsColumn(newsColumn);
    }

    public void delNewsColumn(String lastModifyUserId, Long id){
        newsService.delNewsColumn(lastModifyUserId, id);
    }

    public List<News> listNews(Page page){
        Integer count = newsService.queryNewsCount();
        page.setCount(count);
        if(count > 0 && page.getPage() <= page.getPageCount()) {
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

}

