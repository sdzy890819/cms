package com.cn.cms.job;

import com.cn.cms.biz.BuildBiz;
import com.cn.cms.middleware.JedisClient;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/28.
 */
@Component("autoPublishJob")
public class AutoPublishJob extends JobTask {

    @Resource
    private BuildBiz buildBiz;

    protected String KEY = "autoPublishJob";

    @Override
    protected void execute() {
        super.execute();
        buildBiz.buildAutoPublish();
    }

    @Override
    protected String getJobName() {
        return "定时新闻生成Job";
    }

    @Override
    protected String getKEY() {
        return KEY;
    }
}
