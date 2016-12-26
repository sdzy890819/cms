package com.cn.cms.job;

import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

/**
 * Created by zhangyang on 16/12/23.
 */
public class RsyncThread implements Runnable {

    private CommonLog log = CommonLogFactory.getLog(this.getClass());

    private String sendFilePath;

    private String absolutePath;

    public RsyncThread(String sendFilePath, String absolutePath){
        this.sendFilePath = sendFilePath;
        this.absolutePath = absolutePath;
    }

    @Override
    public void run() {
        try {
            this.send();
        }catch(Exception e){
            log.error("Rsync动作失败。", e);
        }
    }

    public void send(){
        try {
            String ss = getCommand();
            if(ss == null){
                return;
            }
            log.info("脚本执行=====>" + ss);
            Process process = Runtime.getRuntime().exec(ss);
            InputStreamReader ir = new InputStreamReader(process
                    .getInputStream());
            LineNumberReader input = new LineNumberReader(ir);
            String line;
            String _ss = "";
            while ((line = input.readLine()) != null) {
                _ss = _ss + line + "\r\n";
            }
            process.destroy();
//			log.info(_ss);
        } catch (IOException e) {
            log.error(e);
        }
    }

    String getCommand(){
        return "sh /data/app/a.sh";
    }

}
