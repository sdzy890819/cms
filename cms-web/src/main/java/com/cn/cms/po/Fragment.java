package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 碎片PO
 * Created by zhangyang on 16/11/17.
 */
@Getter
@Setter
public class Fragment extends Base {

    /**
     * 碎片分类ID
     */
    private Long fragmentClassifyId;

    /**
     * 碎片当前内容
     */
    private String fragmentContent;

    /**
     * 碎片名称
     */
    private String fragmentName;

    /**
     * 排序值
     */
    private int sortNum;

    /**
     * 碎片模版
     */
    private String fragmentModel;

}
