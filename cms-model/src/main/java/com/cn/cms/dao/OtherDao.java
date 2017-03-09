package com.cn.cms.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface OtherDao {

    @Select("${sql}")
    List<Map<String,Object>> execSql(@Param(value = "sql") String sql);

    @Select("${sql}")
    Map<String, Object> execSqlOne(String sql);
}
