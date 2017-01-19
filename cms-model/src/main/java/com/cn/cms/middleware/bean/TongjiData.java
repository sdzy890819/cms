package com.cn.cms.middleware.bean;

import lombok.Getter;
import lombok.Setter;

import java.lang.reflect.Array;

/**
 * Created by zhangyang on 17/1/19.
 */
@Getter
@Setter
public class TongjiData {

    private Integer queryNum;

    private Integer total;

    private Long sumPv;

    private String sumPvName = "PV";

    private Long sumUv;

    private String sumUvName = "UV";

    private Long newSumUv;

    private String newSumUvName = "NEW-UV";

    private Long sumIp;

    private String sumIpName = "NEW-IP";

    private String[] key;

    private Long[] pvArray;

    private Long[] uvArray;

    private Long[] nuvArray;

    private Long[] ipArray;

}
