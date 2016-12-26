package com.cn.cms.service;

import com.cn.cms.po.Template;
import com.cn.cms.po.TemplateRelation;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
public interface TemplateService {

    Integer queryTemplateCount();

    List<Template> queryTemplateList(Page page);

    void delTemplate(String lastModifyUserId, Long id);

    void saveTemplate(Template template);

    void updateTemplate(Template template);

    Template getTemplate(Long id);

    List<TemplateRelation> queryTemplateRelationList(Long templateId, Integer relationType);

    List<TemplateRelation> queryListForTemplateId(Long templateId);

    void updateRelation(Long templateId, Integer[] relationTypes, List<TemplateRelation> list);

    void saveRelation(TemplateRelation templateRelation);

    void delRelation(Long templateId, Long relationId, Integer relationType);

    List<Template> findTemplateListByRelation(Long relationId, Integer relationType);

    void publishTemplate(List<Long> list);
}
