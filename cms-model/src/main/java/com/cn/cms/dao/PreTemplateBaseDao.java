package com.cn.cms.dao;

import com.cn.cms.po.PreTemplate;
import com.cn.cms.po.PreTemplateBase;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface PreTemplateBaseDao {

    PreTemplateBase queryPreTemplateBase();

    void savePreTemplateBase(@Param(value = "p1") PreTemplateBase preTemplateBase);

    void updatePreTemplateBase(@Param(value = "p1") PreTemplateBase preTemplateBase);

}
