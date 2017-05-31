package com.cn.cms.service;

import com.cn.cms.po.PreTemplate;
import com.cn.cms.po.PreTemplateBase;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by ADMIN on 17/1/3.
 */
public interface PreTemplateService {

    List<PreTemplate> queryList(Page page);

    Integer queryCount();

    PreTemplateBase queryPreTemplateBase();

    void savePreTemplateBase(PreTemplateBase preTemplateBase);

    void updatePreTemplateBase(PreTemplateBase preTemplateBase);

    void savePreTemplate(PreTemplate preTemplate);

    void updatePreTemplate(PreTemplate preTemplate);

    void delPreTemplate(String lastModifyUserId, Long id);

    List<PreTemplate> getPreTemplateByClassify(Integer templateClassify);

    PreTemplate getPreTemplate(Long id);
}
