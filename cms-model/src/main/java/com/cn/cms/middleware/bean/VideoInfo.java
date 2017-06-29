package com.cn.cms.middleware.bean;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 2017/6/29.
 */
@Getter
@Setter
public class VideoInfo {

    private String id;

    private String url;

    private long size;

    private double duration;

    private String thumbnail;

    private int width;

    private int height;

    private String adaptive;

    private String m3u8_360;

    private String m3u8_240;

    private String m3u8_720;

    private String m3u8_1080;
}
