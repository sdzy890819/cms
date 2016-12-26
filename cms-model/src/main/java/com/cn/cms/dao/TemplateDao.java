package com.cn.cms.dao;

import com.cn.cms.po.Template;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface TemplateDao {

    Integer queryTemplateCount();

    List<Template> queryTemplateList(@Param(value = "page") Page page);

    void delTemplate(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void saveTemplate(@Param(value = "p1") Template template);

    void updateTemplate(@Param(value = "p1") Template template);

    Template getTemplate(@Param(value = "id") Long id);

    List<Template> findTemplateListByRelation(@Param(value = "relationId") Long relationId,
                                              @Param(value = "relationType") Integer relationType);
    void publishTemplate(@Param(value = "list") List<Long> list);
}
