package com.cn.cms.service;

import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 16/12/26.
 */
public interface OtherService {

    List<Map<String, Object>> execSql(String sql);

    Integer execSqlCount(String sql);

    Map<String, Object> execSqlOne(String sql);

}
