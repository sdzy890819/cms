package com.cn.cms.service;

import com.cn.cms.po.OperationHistory;

import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/18.
 */
public interface OperationService {

    void save(List<OperationHistory> list);
}
