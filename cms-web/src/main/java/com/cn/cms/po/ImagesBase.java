package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 图片基础PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class ImagesBase extends Base {

    /**
     * 基础url 根据路径拼接图片地址
     */
    private String baseUrl;

    /**
     * 图片存储基础目录
     */
    private String basePath;

}
