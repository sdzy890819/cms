package com.cn.cms.service;

import com.cn.cms.po.NewsColumn;

import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface NewsService {

    List<NewsColumn> queryList(Long channelId);

    void saveNewsColumn(NewsColumn newsColumn);

    void delNewsColumn(String lastModifyUserId, Long id);
}
