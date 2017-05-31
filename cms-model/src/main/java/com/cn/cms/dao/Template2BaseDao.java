package com.cn.cms.dao;

import com.cn.cms.po.Template2Base;
import org.apache.ibatis.annotations.Param;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface Template2BaseDao {

    Template2Base queryTemplate2Base();

    void saveTemplate2Base(@Param(value = "p1") Template2Base template2Base);

    void updateTemplate2Base(@Param(value = "p1") Template2Base template2Base);

}
