package com.cn.cms.job;

import com.cn.cms.biz.BuildBiz;
import com.cn.cms.utils.ContextUtil;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/27.
 */
@Component("autoPublishEntryJob")
public class AutoPublishEntryJob extends BaseTask {

    @Resource
    private BuildBiz buildBiz;

    @Override
    protected void execute() {
        buildBiz.buildAuto();
    }

    @Override
    protected String getJobName() {
        return "自动生成JOB";
    }
}
