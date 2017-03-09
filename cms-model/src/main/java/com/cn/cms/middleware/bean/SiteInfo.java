package com.cn.cms.middleware.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/19.
 */
@Getter
@Setter
public class SiteInfo {

    private String domain;

    private Long siteId;

    private Integer status;

    private List<SubSiteInfo> subSiteInfos;

}
