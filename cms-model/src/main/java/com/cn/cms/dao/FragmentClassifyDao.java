package com.cn.cms.dao;

import com.cn.cms.po.FragmentClassify;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
public interface FragmentClassifyDao {

    List<FragmentClassify> queryFragmentClassify();

    void updateFragmentClassify(@Param(value = "p1") FragmentClassify fragmentClassify);

    void saveFragmentClassify(@Param(value = "p1") FragmentClassify fragmentClassify);

    void delClassify(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);
}
