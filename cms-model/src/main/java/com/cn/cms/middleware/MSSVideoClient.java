package com.cn.cms.middleware;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.exception.BizException;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.middleware.bean.VideoFinishResponse;
import com.cn.cms.middleware.bean.VideoPartResponse;
import com.cn.cms.middleware.bean.VideoResponse;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.UrlUtils;
import lombok.Getter;
import lombok.Setter;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * Created by zhangyang on 17/1/17.
 */
@Getter
@Setter
public class MSSVideoClient {

    private CommonLog log = CommonLogFactory.getLog(MSSVideoClient.class);

    private String uploadUrl;

    private String queryUrl;

    private String finishUrl;

    private String interruptUrl;

    private String accessKey;

    private String accessId;


    public VideoResponse upload(String baseCode, String fileName, int partNum, int finish) throws BizException {
        VideoResponse videoResponse = null;
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("fileName", fileName);
            jsonObject.put("access_id", this.getAccessId());
            jsonObject.put("access_key", this.getAccessKey());
            jsonObject.put("part", baseCode);
            jsonObject.put("partNum", partNum);
            log.info("access_id" + accessId + "--"+getAccessId());
            log.info("access_key" + accessKey + "--"+getAccessKey());
            String result = UrlUtils.getConnStrForPOSTVideo(uploadUrl, StaticContants.UTF8, jsonObject.toJSONString());
            if (StringUtils.isNotBlank(result)) {
                videoResponse = JSONObject.parseObject(result, VideoPartResponse.class);
                if(videoResponse!=null && videoResponse.getFlag()==100) {
                    if (finish > 0) {
                        videoResponse = finish(fileName);
                    }
                }else{
                    interrupt(fileName);
                }
            }
            return videoResponse;
        }catch (Exception e){
            interrupt(fileName);
            throw new BizException(videoResponse!=null?videoResponse.getFlagString():StaticContants.ERROR_VIDEO);
        }
    }


    private VideoResponse finish(String fileName) throws BizException{
        VideoResponse videoResponse = null;
        JSONObject obj1 = new JSONObject();
        obj1.put("fileName", fileName);
        obj1.put("access_id", this.getAccessId());
        obj1.put("access_key", getAccessKey());
        String finishResult = UrlUtils.getConnStrForPOSTVideo(finishUrl, StaticContants.UTF8, obj1.toJSONString());
        videoResponse = JSONObject.parseObject(finishResult, VideoFinishResponse.class);
        return videoResponse;
    }

    private void interrupt(String fileName) throws BizException {
        JSONObject obj1 = new JSONObject();
        obj1.put("fileName", fileName);
        obj1.put("access_id", this.getAccessId());
        obj1.put("access_key", getAccessKey());
        UrlUtils.getConnStrForPOSTVideo(interruptUrl, StaticContants.UTF8, obj1.toJSONString());
    }

    public static void main(String[] args) throws IOException, BizException {
        MSSVideoClient m = new MSSVideoClient();
        File file = new File("/Users/zhangyang/Documents/a.WMV");
        FileInputStream fileInputStream = new FileInputStream(file);
        System.out.println(fileInputStream.available());
        byte[] bytes = new byte[fileInputStream.available()];
        fileInputStream.read(bytes);
        String baseCode = EncryptUtil.base64(bytes).replaceAll("\\r|\\n", "");
        System.out.println(baseCode.length());
        fileInputStream.close();
        m.upload(baseCode, file.getName(), 1, 1);
    }


}
