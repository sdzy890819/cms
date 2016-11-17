package com.cn.cms.po;

import com.cn.cms.enums.PlatformEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 视频PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class Video extends Base {

    /**
     * 视频标题
     */
    private String videoTitle;

    /**
     * 视频说明
     */
    private String videoDesc;

    /**
     * 上传人
     */
    private String uploadUserId;

    /**
     * 上传时间
     */
    private Date uploadTime;

    /**
     * 视频链接URL
     */
    private String videoUrl;

    /**
     * 视频相对路径
     */
    private String videoPath;

    /**
     * 平台
     */
    private int platform = PlatformEnum.CMS.getType();

}
