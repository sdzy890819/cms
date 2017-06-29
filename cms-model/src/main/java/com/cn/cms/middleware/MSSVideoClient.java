package com.cn.cms.middleware;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.exception.BizException;
import com.cn.cms.logfactory.CommonLog;
import com.cn.cms.logfactory.CommonLogFactory;
import com.cn.cms.middleware.bean.*;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.UrlUtils;
import lombok.Getter;
import lombok.Setter;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collection;

/**
 * Created by ADMIN on 17/1/17.
 */
@Getter
@Setter
public class MSSVideoClient {

    private CommonLog log = CommonLogFactory.getLog(MSSVideoClient.class);

    private String uploadUrl = "http://upload.dvr.aodianyun.com/v2/DVR.UploadPart";

    private String queryUrl = "http://upload.dvr.aodianyun.com/v2/DVR.UploadQuery";

    private String finishUrl = "http://upload.dvr.aodianyun.com/v2/DVR.UploadComplete";

    private String listUrl = "http://openapi.aodianyun.com/v2/DVR.GetUploadDvrList";

    private String interruptUrl = "http://upload.dvr.aodianyun.com/v2/DVR.AbortUpload";

    private String deleteUrl = "http://openapi.aodianyun.com/v2/DVR.RemoveUploadDvr";

    private String accessKey = "1p5Z7yUHsCqdLiCJbB8lwDPd3Ffe1q8f";

    private String accessId = "115840986417";


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

    public void interrupt(String fileName) throws BizException {
        JSONObject obj1 = new JSONObject();
        obj1.put("fileName", fileName);
        obj1.put("access_id", this.getAccessId());
        obj1.put("access_key", getAccessKey());
        UrlUtils.getConnStrForPOSTVideo(interruptUrl, StaticContants.UTF8, obj1.toJSONString());
    }

    public VideoResponse delete(String[] strings) throws BizException {
        VideoResponse videoResponse = null;
        JSONObject obj1 = new JSONObject();
        obj1.put("url", strings);
        obj1.put("access_id", this.getAccessId());
        obj1.put("access_key", getAccessKey());
        String finishResult = UrlUtils.getConnStrForPOSTVideo(deleteUrl, StaticContants.UTF8, obj1.toJSONString());
        videoResponse = JSONObject.parseObject(finishResult, VideoFinishResponse.class);
        return videoResponse;
    }


    /**
     * 获取信息
     * @param url
     * @return
     * @throws BizException
     */
    public VideoInfo get(String url) throws BizException{
        VideoListResponse videoResponse = null;
        JSONObject obj1 = new JSONObject();
        obj1.put("url", url);
        obj1.put("access_id", this.getAccessId());
        obj1.put("access_key", getAccessKey());
        String listResult = UrlUtils.getConnStrForPOSTVideo(listUrl, StaticContants.UTF8, obj1.toJSONString());
        videoResponse = JSONObject.parseObject(listResult, VideoListResponse.class);
        if(videoResponse!=null && videoResponse.getFlag() == 100 && videoResponse.getList().size()>0){
            return videoResponse.getList().get(0);
        }
        return null;
    }


}
