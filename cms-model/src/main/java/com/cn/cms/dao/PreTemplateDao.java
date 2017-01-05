package com.cn.cms.dao;

import com.cn.cms.po.Category;
import com.cn.cms.po.PreTemplate;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface PreTemplateDao {

    Integer queryCount();

    List<PreTemplate> queryList(@Param(value = "page") Page page);

    void savePreTemplate(@Param(value = "p1") PreTemplate preTemplate);

    void updatePreTemplate(@Param(value = "p1") PreTemplate preTemplate);

    void delPreTemplate(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    List<PreTemplate> getPreTemplateByClassify(@Param(value = "templateClassify") Integer templateClassify);

    PreTemplate getPreTemplate(@Param(value = "id") Long id);
}
