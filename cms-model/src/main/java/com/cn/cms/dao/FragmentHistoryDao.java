package com.cn.cms.dao;

import com.cn.cms.po.FragmentHistory;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface FragmentHistoryDao {

    void saveFragmentHistory(@Param(value = "p1") FragmentHistory fragmentHistory);

    Integer queryHistoryCount(@Param(value = "fid") Long fid);

    List<FragmentHistory> queryHistoryList(@Param(value = "fid") Long fid, @Param(value = "page") Page page);
}
