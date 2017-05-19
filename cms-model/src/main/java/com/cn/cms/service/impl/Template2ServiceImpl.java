package com.cn.cms.service.impl;

import com.cn.cms.bo.Template2Search;
import com.cn.cms.dao.Template2BaseDao;
import com.cn.cms.dao.Template2Dao;
import com.cn.cms.po.Template2;
import com.cn.cms.po.Template2Base;
import com.cn.cms.service.Template2Service;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/8.
 */
@Repository
public class Template2ServiceImpl implements Template2Service {

    @Resource
    private Template2Dao template2Dao;

    @Resource
    private Template2BaseDao template2BaseDao;

    public Integer queryTemplate2Count() {
        return template2Dao.queryTemplate2Count();
    }

    public List<Template2> queryTemplate2List(Page page) {
        return template2Dao.queryTemplate2List(page);
    }

    @Override
    public List<Template2> queryTemplate2ByClassify(Integer templateClassify) {
        return template2Dao.queryTemplate2ByClassify(templateClassify);
    }

    @Override
    public Integer searchTemplate2Count(Template2Search template2Search) {
        return template2Dao.searchTemplate2Count(template2Search);
    }

    @Override
    public List<Template2> searchTemplate2(Template2Search template2Search, Page page) {
        return template2Dao.searchTemplate2(template2Search, page);
    }

    @Override
    public List<Template2> findTemplate2ByNewsIds(Long newsId) {
        return template2Dao.findTemplate2ByNewsIds(newsId);
    }

    public void delTemplate2(String lastModifyUserId, Long id) {
        template2Dao.delTemplate2(lastModifyUserId, id);
    }

    public void saveTemplate2(Template2 template2) {
        template2Dao.saveTemplate2(template2);
    }

    public void updateTemplate2(Template2 template2) {
        template2Dao.updateTemplate2(template2);
    }

    public Template2 getTemplate2(Long id) {
        return template2Dao.getTemplate2(id);
    }

    @Override
    public Template2Base queryTemplate2Base() {
        return template2BaseDao.queryTemplate2Base();
    }

    @Override
    public void saveTemplate2Base(Template2Base template2Base) {
        template2BaseDao.saveTemplate2Base(template2Base);
    }

    @Override
    public void updateTemplate2Base(Template2Base template2Base) {
        template2BaseDao.updateTemplate2Base(template2Base);
    }

    @Override
    public void uploadTemplate(String lastModifyUserId, Long id, Integer upload) {
        template2Dao.uploadTemplate(lastModifyUserId, id, upload);
    }

    @Override
    public Integer queryFilenameAndPathCount(Template2 template) {
        return template2Dao.queryFilenameAndPathCount(template);
    }
}
