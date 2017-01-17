package com.cn.cms.job;

import com.cn.cms.biz.BuildBiz;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.utils.ContextUtil;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/27.
 */
@Component("autoPublishEntryJob")
public class AutoPublishEntryJob extends JobTask {

    @Resource
    private BuildBiz buildBiz;

    protected String KEY = "autoPublishEntryJob";

    @Override
    protected void execute() {
        super.execute();
        buildBiz.buildAuto();
    }

    @Override
    protected String getJobName() {
        return "自动生成JOB";
    }

    @Override
    protected String getKEY() {
        return KEY;
    }
}
