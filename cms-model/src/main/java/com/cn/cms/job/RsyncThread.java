package com.cn.cms.job;

import lombok.Getter;
import lombok.Setter;

/**
 * 暂时废弃
 * Created by 华盛信息科技有限公司(HS) on 17/3/9.
 */
@Getter
@Setter
public class RsyncThread extends BaseTask {

    private String filePath;

    private String cmdPath;

    private String rsyncModel;

    public RsyncThread(String filePath, String cmdPath, String rsyncModel){
        this.filePath = filePath;
        this.cmdPath = cmdPath;
        this.rsyncModel = rsyncModel;
    }

    @Override
    protected void execute() {

    }

    @Override
    protected String getJobName() {
        return "rsync任务执行 开发";
    }

}
