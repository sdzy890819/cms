package com.cn.cms.service.impl;

import com.cn.cms.dao.NewsColumnDao;
import com.cn.cms.dao.NewsDao;
import com.cn.cms.dao.NewsDetailDao;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.service.FragmentService;
import com.cn.cms.service.NewsService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class NewsServiceImpl implements NewsService {

    @Resource
    private NewsColumnDao newsColumnDao;

    @Resource
    private NewsDao newsDao;

    @Resource
    private NewsDetailDao newsDetailDao;

    public List<NewsColumn> queryList(Long channelId) {
        return newsColumnDao.queryList(channelId);
    }

    public void saveNewsColumn(NewsColumn newsColumn) {
        newsColumnDao.saveNewsColumn(newsColumn);
    }

    public void delNewsColumn(String lastModifyUserId, Long id) {
        newsColumnDao.delNewsColumn(lastModifyUserId, id);
    }
}
