package com.cn.cms.dao;

import com.cn.cms.po.NewsStock;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface NewsStockDao {

    void saveStocks(@Param(value = "list")List<NewsStock> list);

    void delStocks(@Param(value = "newsId") Long newsId);

}
