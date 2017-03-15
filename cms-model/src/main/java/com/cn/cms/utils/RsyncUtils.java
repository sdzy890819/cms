package com.cn.cms.utils;

import com.cn.cms.exception.BizException;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/3/9.
 */
public class RsyncUtils {

    private static CommonLog log = CommonLogFactory.getLog(RsyncUtils.class);

    /**
     * rsync模块执行.
     * @param rsyncModel
     * @param filePath
     * @param shFile
     */
    public static void rsync(String rsyncModel, String filePath, String shFile, String absPath){
        String cmdString = "sh ".concat(shFile).concat(" ").concat(rsyncModel).concat(" ").concat(filePath).concat(" ").concat(absPath);
        try {
            Process proc = Runtime.getRuntime().exec(shFile);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
            String tmp = null;
            while((tmp = bufferedReader.readLine())!=null){
                log.info(cmdString + "输出：" + tmp);
            }
            while((tmp = errorReader.readLine())!=null){
                log.info(cmdString + "输出：" + tmp);
            }
            errorReader.close();
            bufferedReader.close();
            int result = proc.waitFor();
            if(0 != result){
                log.error("执行出现异常，返回:" + result);
            }
        } catch (IOException e) {
            log.error("shell 执行出错,", e);
        } catch (InterruptedException e) {
            log.error("shell 等待执行出错,", e);
        }
    }


}
