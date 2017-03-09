package com.cn.cms.dao;

import com.cn.cms.po.TemplateRelation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface TemplateRelationDao {

    List<TemplateRelation> queryTemplateRelationList(@Param(value = "templateId") Long templateId, @Param(value = "relationType") Integer relationType);

    List<TemplateRelation> queryListForTemplateId(@Param(value = "templateId") Long templateId);

    Integer queryListForTemplateIdCount(@Param(value = "templateId") Long templateId);

    TemplateRelation queryListForAll(@Param(value = "templateId") Long templateId,
                                     @Param(value = "relationId") Long relationId,
                                     @Param(value = "relationType")Integer relationType);

    void updateRelation(@Param(value = "templateId") Long templateId, @Param(value = "relationTypes") Integer[] relationTypes, @Param(value = "list") List<TemplateRelation> list);

    void saveRelation(@Param(value = "p1") TemplateRelation templateRelation);

    void delRelation(@Param(value = "templateId") Long templateId, @Param(value = "relationId") Long relationId, @Param(value = "relationType") Integer relationType);

    void delRelationByTemplateId(@Param(value = "templateId") Long templateId);
}
