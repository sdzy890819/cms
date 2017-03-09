package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 部门分类PO
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
@Getter
@Setter
public class Category extends Base {

    /**
     * 名称
     */
    private String categoryName;

    /**
     * 说明
     */
    private String categoryDesc;

}
