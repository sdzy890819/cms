package com.cn.cms.po;

import com.cn.cms.enums.PlatformEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 图片PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class Images extends Base{

    /**
     * 图片地址
     */
    private String imageUrl;

    /**
     * 图片长像素
     */
    private Integer imageWidthPixel;

    /**
     * 图片宽像素
     */
    private Integer imageHeightPixel;

    /**
     * 原始长像素
     */
    private Integer orgWidthPixel;

    /**
     * 原始宽像素
     */
    private Integer orgHeightPixel;

    /**
     * 图片标题
     */
    private String imageTitle;

    /**
     * 上传人
     */
    private String uploadUserId;

    /**
     * 上传时间
     */
    private Date uploadTime;

    /**
     * 图片相对路径
     */
    private String imagePath;

    /**
     * 是否水印
     */
    private Integer watermark;

    /**
     * 是否压缩
     */
    private Integer compress;

    /**
     * 平台
     */
    private Integer platform = PlatformEnum.CMS.getType();



}
