package com.cn.cms.job;

import com.cn.cms.biz.BuildBiz;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/28.
 */
@Component("autoPublishJob")
public class AutoPublishJob extends BaseTask {

    @Resource
    private BuildBiz buildBiz;

    @Override
    protected void execute() {
        buildBiz.buildAutoPublish();
    }

    @Override
    protected String getJobName() {
        return "定时新闻生成Job";
    }
}
