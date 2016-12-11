package com.cn.cms.biz;

import com.cn.cms.po.NewsColumn;
import com.cn.cms.service.NewsService;
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
}
