package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 视频基础PO
 * Created by ADMIN on 16/11/17.
 */
@Getter
@Setter
public class VideoBase extends Base {

    /**
     * 基础域名
     */
    private String baseUrl;

    /**
     * 基础绝对路径
     */
    private String basePath;

}
