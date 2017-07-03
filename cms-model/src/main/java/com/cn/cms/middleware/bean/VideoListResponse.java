package com.cn.cms.middleware.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by ADMIN on 2017/6/29.
 */
@Getter
@Setter
public class VideoListResponse extends VideoResponse {

    /**
     * 返回结果
     */
    private List<VideoInfo> List;
}
