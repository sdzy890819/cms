package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 模版对应关系PO
 * Created by ADMIN on 16/11/17.
 */
@Getter
@Setter
public class TemplateRelation extends Base {

    /**
     * 模版ID
     */
    private Long templateId;

    /**
     * 栏目ID、碎片ID、专题分类ID
     */
    private Long relationId;

    /**
     * 1－栏目ID、2－碎片ID、3－专题分类ID
     */
    private Integer relationType;

}
