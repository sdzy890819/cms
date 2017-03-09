package com.cn.cms.service;

import com.cn.cms.bo.Template2Search;
import com.cn.cms.po.Template2;
import com.cn.cms.po.Template2Base;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/8.
 */
public interface Template2Service {


    Integer queryTemplate2Count();

    List<Template2> queryTemplate2List(Page page);

    List<Template2> queryTemplate2ByClassify(Integer templateClassify);

    Integer searchTemplate2Count(Template2Search template2Search);

    List<Template2> searchTemplate2(Template2Search template2Search, Page page);

    void delTemplate2(String lastModifyUserId, Long id);

    void saveTemplate2(Template2 template);

    void updateTemplate2(Template2 template);

    Template2 getTemplate2(Long id);

    Template2Base queryTemplate2Base();

    void saveTemplate2Base(Template2Base template2Base);

    void updateTemplate2Base(Template2Base template2Base);

    void uploadTemplate(String lastModifyUserId, Long id, Integer upload);

    Integer queryFilenameAndPathCount(Template2 template);
}
