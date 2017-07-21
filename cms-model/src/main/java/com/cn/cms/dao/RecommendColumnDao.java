package com.cn.cms.dao;

import com.cn.cms.po.RecommendColumn;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface RecommendColumnDao {

    List<RecommendColumn> findAll(@Param(value = "st") String st);

    void createRecommendColumn(@Param(value = "p1") RecommendColumn recommendColumn);

    void updateRecommendColumn(@Param(value = "p1") RecommendColumn recommendColumn);

    List<RecommendColumn> findRecommendColumnByIds(@Param(value = "list") List<Long> ids);

    void deleteRecommendColumn(@Param(value = "id") Long id, @Param(value = "lastModifyUserId") String lastModifyUserId);
}
