package com.cn.cms.dao;

import com.cn.cms.po.RecommendColumn;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface RecommendColumnDao {

    List<RecommendColumn> findAll();

    void createRecommendColumn(@Param(value = "p1") RecommendColumn recommendColumn);

    void updateRecommendColumn(@Param(value = "p1") RecommendColumn recommendColumn);
}
