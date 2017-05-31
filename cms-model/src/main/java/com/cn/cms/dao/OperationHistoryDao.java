package com.cn.cms.dao;

import com.cn.cms.po.OperationHistory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface OperationHistoryDao {

    void save(@Param(value = "list") List<OperationHistory> list);

}
