package com.cn.cms.service;

import com.cn.cms.po.OperationHistory;

import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
 */
public interface OperationService {

    void save(List<OperationHistory> list);
}
