package com.cn.cms.dao;

import com.cn.cms.po.NewsDetail;
import org.apache.ibatis.annotations.Param;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface NewsDetailDao {


    NewsDetail findNewsDetail(@Param(value = "newsId") Long newsId);

    void delNewsDetail(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "newsId") Long newsId);

    void saveNewsDetail(@Param(value = "p1") NewsDetail newsDetail);

    void updateNewsDetail(@Param(value = "p1") NewsDetail newsDetail);
}
