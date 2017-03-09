package com.cn.cms.dao;

import com.cn.cms.po.OperationHistory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface OperationHistoryDao {

    void save(@Param(value = "list") List<OperationHistory> list);

}
