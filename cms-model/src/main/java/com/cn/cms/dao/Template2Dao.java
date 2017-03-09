package com.cn.cms.dao;

import com.cn.cms.bo.Template2Search;
import com.cn.cms.po.Template2;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface Template2Dao {

    Integer queryTemplate2Count();

    List<Template2> queryTemplate2List(@Param(value = "page") Page page);

    List<Template2> queryTemplate2ByClassify(@Param(value = "templateClassify") Integer templateClassify);

    Integer searchTemplate2Count(@Param(value = "p1") Template2Search templateSearch);

    List<Template2> searchTemplate2(@Param(value = "p1") Template2Search templateSearch, @Param(value = "page") Page page);

    void delTemplate2(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void saveTemplate2(@Param(value = "p1") Template2 template);

    void updateTemplate2(@Param(value = "p1") Template2 template);

    Template2 getTemplate2(@Param(value = "id") Long id);

    void uploadTemplate(@Param(value = "lastModifyUserId") String lastModifyUserId,
                        @Param(value = "id") Long id,
                        @Param(value = "upload") Integer upload);

    Integer queryFilenameAndPathCount(@Param(value = "p1") Template2 template);
}
