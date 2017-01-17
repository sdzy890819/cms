package com.cn.cms.middleware.bean;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Created by zhangyang on 17/1/17.
 */
@Getter
@Setter
@ToString
public class WeedfsResponse {

    private boolean status;

    private int size;

    private String fid;

    private String fileUrl;


}
