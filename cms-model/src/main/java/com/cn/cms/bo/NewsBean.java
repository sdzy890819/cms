package com.cn.cms.bo;

import com.cn.cms.enums.PlatformEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 16/12/12.
 */
public class NewsBean  {

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String source;

    @Getter
    @Setter
    private String author;

    @Getter
    @Setter
    private String writeUserId;

    @Getter
    @Setter
    private String writeUserName;

    @Getter
    @Setter
    private Long channelId;

    @Getter
    @Setter
    private Long columnId;

    @Getter
    @Setter
    private int platform = PlatformEnum.CMS.getType();

    private String platformStr;


    public String getPlatformStr() {
        return PlatformEnum.get(platform).getName();
    }
}
