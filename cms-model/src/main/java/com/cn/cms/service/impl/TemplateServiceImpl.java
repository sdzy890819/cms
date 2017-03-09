package com.cn.cms.service.impl;

import com.cn.cms.bo.TemplateSearch;
import com.cn.cms.dao.NewsColumnDao;
import com.cn.cms.dao.NewsDao;
import com.cn.cms.dao.TemplateDao;
import com.cn.cms.dao.TemplateRelationDao;
import com.cn.cms.enums.JobEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.po.Template;
import com.cn.cms.po.TemplateRelation;
import com.cn.cms.service.TemplateService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/18.
 */
@Repository
public class TemplateServiceImpl implements TemplateService {


    @Resource
    private TemplateDao templateDao;

    @Resource
    private TemplateRelationDao templateRelationDao;

    @Resource
    private NewsColumnDao newsColumnDao;

    public Integer queryTemplateCount() {
        return templateDao.queryTemplateCount();
    }

    public List<Template> queryTemplateList(Page page) {
        return templateDao.queryTemplateList(page);
    }

    @Override
    public Integer searchTemplateCount(TemplateSearch templateSearch) {
        return templateDao.searchTemplateCount(templateSearch);
    }

    @Override
    public List<Template> searchTemplate(TemplateSearch templateSearch, Page page) {
        return templateDao.searchTemplate(templateSearch, page);
    }

    public void delTemplate(String lastModifyUserId, Long id) {
        templateDao.delTemplate(lastModifyUserId, id);
    }

    public void saveTemplate(Template template) {
        templateDao.saveTemplate(template);
    }

    @Override
    public Integer queryFilenameAndPathCount(Template template){
        return templateDao.queryFilenameAndPathCount(template);
    }

    public void updateTemplate(Template template) {
        templateDao.updateTemplate(template);
    }

    public Template getTemplate(Long id) {
        return templateDao.getTemplate(id);
    }

    public List<TemplateRelation> queryTemplateRelationList(Long templateId, Integer relationType) {
        return templateRelationDao.queryTemplateRelationList(templateId, relationType);
    }

    public List<TemplateRelation> queryListForTemplateId(Long templateId) {
        return templateRelationDao.queryListForTemplateId(templateId);
    }

    @Override
    public Integer queryListForTemplateIdCount(Long templateId) {
        return templateRelationDao.queryListForTemplateIdCount(templateId);
    }

    @Override
    public TemplateRelation queryListForAll(Long templateId, Long relationId, Integer relationType) {
        return templateRelationDao.queryListForAll(templateId, relationId, relationType);
    }

    public void updateRelation(Long templateId, Integer[] relationTypes, List<TemplateRelation> list) {
        templateRelationDao.updateRelation(templateId, relationTypes, list);
    }

    public void saveRelation(TemplateRelation templateRelation) {
        templateRelationDao.saveRelation(templateRelation);
    }

    public void delRelation(Long templateId, Long relationId, Integer relationType) {
        templateRelationDao.delRelation(templateId, relationId, relationType);
    }

    @Override
    public void delRelation(Long templateId) {
        templateRelationDao.delRelationByTemplateId(templateId);
    }

    @Override
    public List<Template> findTemplateListByRelation(Long relationId, Integer relationType) {
        return templateDao.findTemplateListByRelation(relationId, relationType, JobEnum.trigger.getType());
    }

    @Override
    public void publishTemplate(List<Long> list) {
        templateDao.publishTemplate(list, PublishEnum.YES.getType());
    }

    @Override
    public List<Template> findTemplateListByAuto() {
        return templateDao.findTemplateListByAuto(TemplateClassifyEnum.detail.getType(), JobEnum.job.getType());
    }

    @Override
    public Template findTemplateByChannel(Long channelId, Integer templateClassify,
                                          Long relationId, Integer relationType, int job) {
        return templateDao.findTemplateByChannel(channelId, templateClassify, relationId, relationType,job);
    }

    @Override
    public void saveTemplateAndRelationAndNewsColumn(Template template, TemplateRelation templateRelation, NewsColumn newsColumn) {
        if(template.getId() == null ) {
            templateDao.saveTemplate(template);
        }
        templateRelation.setTemplateId(template.getId());
        if(templateRelation.getId() == null ) {
            templateRelationDao.saveRelation(templateRelation);
        }
        if(template.getTemplateClassify() == TemplateClassifyEnum.list.getType()) {
//            newsColumn.setListTemplateId(template.getId());
            newsColumnDao.publishListNewsColumn(newsColumn);
        }else if(template.getTemplateClassify() == TemplateClassifyEnum.detail.getType()){
//            newsColumn.setDetailTemplateId(template.getId());
            newsColumnDao.publishDetailNewsColumn(newsColumn);
        }
    }


    @Override
    public Template findTemplateList(Long channelId, Integer templateClassify) {
        return templateDao.findTemplateList(channelId,templateClassify,JobEnum.trigger.getType());
    }

    @Override
    public void uploadTemplate(String lastModifyUserId, Long id, Integer upload) {
        templateDao.uploadTemplate(lastModifyUserId, id, upload);
    }
}

