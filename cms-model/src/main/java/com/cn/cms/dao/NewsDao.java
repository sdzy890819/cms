package com.cn.cms.dao;

import com.cn.cms.po.News;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface NewsDao {

    List<News> queryNewsList(@Param(value = "page") Page page);

    Integer queryNewsCount();

    News findNewsAndDetail(@Param(value = "id") Long id);

    void delNews(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void saveNews(@Param(value = "p1") News news);

    void updateNews(@Param(value = "p1") News news);

}
