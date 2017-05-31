package com.cn.cms.service.impl;

import com.cn.cms.dao.PreTemplateBaseDao;
import com.cn.cms.dao.PreTemplateDao;
import com.cn.cms.po.PreTemplate;
import com.cn.cms.po.PreTemplateBase;
import com.cn.cms.service.PreTemplateService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ADMIN on 17/1/3.
 */
@Repository
public class PreTemplateServiceImpl implements PreTemplateService {

    @Resource
    private PreTemplateDao preTemplateDao;

    @Resource
    private PreTemplateBaseDao preTemplateBaseDao;

    public List<PreTemplate> queryList(Page page){
        return preTemplateDao.queryList(page);
    }

    @Override
    public Integer queryCount() {
        return preTemplateDao.queryCount();
    }

    @Override
    public PreTemplateBase queryPreTemplateBase() {
        return preTemplateBaseDao.queryPreTemplateBase();
    }

    @Override
    public void savePreTemplateBase(PreTemplateBase preTemplateBase) {
        preTemplateBaseDao.savePreTemplateBase(preTemplateBase);
    }

    @Override
    public void updatePreTemplateBase(PreTemplateBase preTemplateBase) {
        preTemplateBaseDao.updatePreTemplateBase(preTemplateBase);
    }

    @Override
    public void savePreTemplate(PreTemplate preTemplate) {
        preTemplateDao.savePreTemplate(preTemplate);
    }

    @Override
    public void updatePreTemplate(PreTemplate preTemplate) {
        preTemplateDao.updatePreTemplate(preTemplate);
    }

    @Override
    public void delPreTemplate(String lastModifyUserId, Long id) {
        preTemplateDao.delPreTemplate(lastModifyUserId, id);
    }

    @Override
    public List<PreTemplate> getPreTemplateByClassify(Integer templateClassify) {
        return preTemplateDao.getPreTemplateByClassify(templateClassify);
    }

    @Override
    public PreTemplate getPreTemplate(Long id) {
        return preTemplateDao.getPreTemplate(id);
    }
}
