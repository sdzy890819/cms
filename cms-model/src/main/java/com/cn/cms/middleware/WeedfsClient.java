package com.cn.cms.middleware;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.middleware.bean.FileResponse;
import com.cn.cms.middleware.bean.WeedfsAssignResponse;
import com.cn.cms.middleware.bean.WeedfsResponse;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.utils.UrlUtils;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/17.
 */
@Getter
@Setter
public class WeedfsClient {

    private String masterHost;

    private String assign;


    /**
     * 提交到Weedfs
     * @param fileName
     * @param inputStream
     * @return
     */
    public WeedfsResponse upload(String fileName, InputStream inputStream) throws Exception {
        String assignResult = UrlUtils.getConnStr(StringUtils.concatUrl(masterHost,assign));
        WeedfsAssignResponse weedfsAssignResponse = JSONObject.parseObject(assignResult, WeedfsAssignResponse.class);
        WeedfsResponse weedfsResponse = new WeedfsResponse();
        String url = StringUtils.concatUrl("http://",weedfsAssignResponse.getPublicUrl(),weedfsAssignResponse.getFid());
        String result =  UrlUtils.postFile(url, "fileBody", fileName, inputStream);
        if(StringUtils.isNotBlank(result)){
            FileResponse fileResponse = JSONObject.parseObject(result, FileResponse.class);
            weedfsResponse.setFid(weedfsAssignResponse.getFid());
            weedfsResponse.setFileUrl(url);
            weedfsResponse.setSize(fileResponse.getSize());
            weedfsResponse.setStatus(true);
        }
        return weedfsResponse;
    }

    /**
     * 缓存数据
     * @param file
     * @return
     * @throws Exception
     */
    public WeedfsResponse upload(File file) throws Exception {
        String assignResult = UrlUtils.getConnStr(StringUtils.concatUrl(masterHost,assign));
        WeedfsAssignResponse weedfsAssignResponse = JSONObject.parseObject(assignResult, WeedfsAssignResponse.class);
        WeedfsResponse weedfsResponse = new WeedfsResponse();
        String url = StringUtils.concatUrl("http://",weedfsAssignResponse.getPublicUrl(),weedfsAssignResponse.getFid());
        String result =  UrlUtils.postFile(url, "fileBody", file.getName(), new FileInputStream(file));
        if(StringUtils.isNotBlank(result)){
            FileResponse fileResponse = JSONObject.parseObject(result, FileResponse.class);
            weedfsResponse.setFid(weedfsAssignResponse.getFid());
            weedfsResponse.setFileUrl(url);
            weedfsResponse.setSize(fileResponse.getSize());
            weedfsResponse.setStatus(true);
        }
        return weedfsResponse;
    }

    /**
     * 通过fid获取Fid对应的信息
     * @param fid
     * @return
     */
    public WeedfsResponse get(String fid) throws Exception {
        WeedfsResponse weedfsResponse = null;
        String volumnId = fid.split(",")[0];
        String result = UrlUtils.getConnStr(StringUtils.concatUrl(masterHost, assign.concat("&volumeId=").concat(volumnId)));
        WeedfsAssignResponse weedfsAssignResponse = JSONObject.parseObject(result, WeedfsAssignResponse.class);
        String url = StringUtils.concatUrl("http://",weedfsAssignResponse.getPublicUrl(),weedfsAssignResponse.getFid());
        weedfsResponse = new WeedfsResponse();
        weedfsResponse.setStatus(true);
        weedfsResponse.setFileUrl(url);
        weedfsResponse.setFid(fid);
        return weedfsResponse;
    }

    /**
     * 删除FID
     * @param fileUrl
     * @return
     * @throws Exception
     */
    public WeedfsResponse delete(String fid, String fileUrl) throws Exception {
        UrlUtils.connect(fileUrl, "DELETE");
        WeedfsResponse weedfsResponse = new WeedfsResponse();
        weedfsResponse.setFid(fid);
        weedfsResponse.setStatus(true);
        weedfsResponse.setFileUrl(fileUrl);
        return weedfsResponse;
    }

}
