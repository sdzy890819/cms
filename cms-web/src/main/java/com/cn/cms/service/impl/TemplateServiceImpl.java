package com.cn.cms.service.impl;

import com.cn.cms.dao.TemplateDao;
import com.cn.cms.dao.TemplateRelationDao;
import com.cn.cms.po.Template;
import com.cn.cms.po.TemplateRelation;
import com.cn.cms.service.ResourceService;
import com.cn.cms.service.TemplateService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class TemplateServiceImpl implements TemplateService {


    @Resource
    private TemplateDao templateDao;

    @Resource
    private TemplateRelationDao templateRelationDao;

    public Integer queryTemplateCount() {
        return templateDao.queryTemplateCount();
    }

    public List<Template> queryTemplateList(Page page) {
        return templateDao.queryTemplateList(page);
    }

    public void delTemplate(String lastModifyUserId, Long id) {
        templateDao.delTemplate(lastModifyUserId, id);
    }

    public void saveTemplate(Template template) {
        templateDao.saveTemplate(template);
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

    public void updateRelation(Long templateId, Integer[] relationTypes, List<TemplateRelation> list) {
        templateRelationDao.updateRelation(templateId, relationTypes, list);
    }

    public void saveRelation(TemplateRelation templateRelation) {
        templateRelationDao.saveRelation(templateRelation);
    }

    public void delRelation(Long templateId, Long relationId, Integer relationType) {
        templateRelationDao.delRelation(templateId, relationId, relationType);
    }
}

