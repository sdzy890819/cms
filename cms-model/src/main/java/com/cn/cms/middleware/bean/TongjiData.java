package com.cn.cms.middleware.bean;

import lombok.Getter;
import lombok.Setter;

import java.lang.reflect.Array;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/19.
 */
@Getter
@Setter
public class TongjiData {

    private Integer queryNum;

    private Integer total;

    private Long sumPv;

    private Long todayPv;

    private String sumPvName = "PV数";

    private Long sumUv;

    private Long todayUv;

    private String sumUvName = "UV数";

    private Long newSumUv;

    private Long todayNewUv;

    private String newSumUvName = "NEW-UV数";

    private Long sumIp;

    private Long todayIp;

    private String sumIpName = "IP数";

    private String[] key;

    private Long[] pvArray;

    private Long[] uvArray;

    private Long[] nuvArray;

    private Long[] ipArray;

}
