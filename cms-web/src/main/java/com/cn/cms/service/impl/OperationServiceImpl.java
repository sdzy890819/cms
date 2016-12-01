package com.cn.cms.service.impl;

import com.cn.cms.dao.OperationHistoryDao;
import com.cn.cms.po.OperationHistory;
import com.cn.cms.service.NewsService;
import com.cn.cms.service.OperationService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class OperationServiceImpl implements OperationService {


    @Resource
    private OperationHistoryDao operationHistoryDao;

    public void save(List<OperationHistory> list) {
        this.operationHistoryDao.save(list);
    }
}
