package com.cn.cms.job;

import com.cn.cms.biz.OperationHistoryBiz;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Base;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/28.
 */
@Component("operationIntoDBJob")
public class OperationIntoDBJob extends JobTask {

    @Resource
    private OperationHistoryBiz operationHistoryBiz;

    @Resource
    protected JedisClient jedisClient;

    protected String KEY = "operationIntoDBJob";

    @Override
    protected void execute() {
        super.execute();
        operationHistoryBiz.recordInsertDB();
    }

    @Override
    protected String getJobName() {
        return "Operation历史入库Job";
    }
}
