package com.cn.cms.dao;

import com.cn.cms.po.NewsStock;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface NewsStockDao {

    void saveStocks(@Param(value = "list")List<NewsStock> list);

    void delStocks(@Param(value = "newsId") Long newsId);

    List<NewsStock> findNewsStocks(@Param(value = "list") List<Long> newsIds);

    List<NewsStock> findNewsStockList(@Param(value = "newsId") Long newsId);

}
