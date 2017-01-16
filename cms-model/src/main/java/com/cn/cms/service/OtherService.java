package com.cn.cms.service;

import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/26.
 */
public interface OtherService {

    List<Map<String, Object>> execSql(String sql);

    Map<String, Object> execSqlOne(String sql);

}
