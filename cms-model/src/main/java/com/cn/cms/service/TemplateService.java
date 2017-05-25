package com.cn.cms.service;

import com.cn.cms.bo.TemplateSearch;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.po.Template;
import com.cn.cms.po.TemplateRelation;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/18.
 */
public interface TemplateService {

    Integer queryTemplateCount();

    List<Template> queryTemplateList(Page page);

    Integer searchTemplateCount(TemplateSearch templateSearch);

    List<Template> searchTemplate(TemplateSearch templateSearch, Page page);

    void delTemplate(String lastModifyUserId, Long id);

    void saveTemplate(Template template);

    Integer queryFilenameAndPathCount(Template template);

    void updateTemplate(Template template);

    Template getTemplate(Long id);

    List<TemplateRelation> queryTemplateRelationList(Long templateId, Integer relationType);

    List<TemplateRelation> queryListForTemplateId(Long templateId);

    Integer queryListForTemplateIdCount(Long templateId);

    TemplateRelation queryListForAll(Long templateId, Long relationId, Integer relationType);

    void updateRelation(Long templateId, Integer[] relationTypes, List<TemplateRelation> list);

    void saveRelation(TemplateRelation templateRelation);

    void delRelation(Long templateId, Long relationId, Integer relationType);

    void delRelation(Long templateId);

    List<Template> findTemplateListByRelation(Long relationId, Integer relationType);

    List<Template> findTemplateListByRelationNotDetail(Long relationId, Integer relationType);

    List<Template> findTemplateListByNewsPushColumnAndNotDetail(Long newsId, Integer relationType);

    void publishTemplate(List<Long> list);

    List<Template> findTemplateListByAuto();

    Template findTemplateByChannel(Long channelId,
                                   Integer templateClassify,
                                   Long relationId,
                                   Integer relationType,
                                   int job);

    @Deprecated
    void saveTemplateAndRelationAndNewsColumn(Template template, TemplateRelation templateRelation, NewsColumn newsColumn);

    Template findTemplateList(Long channelId, Integer templateClassify);

    void uploadTemplate(String lastModifyUserId,
                        Long id,
                        Integer upload);
}
