package com.cn.cms.service;

import com.cn.cms.bo.FragmentSearch;
import com.cn.cms.po.Fragment;
import com.cn.cms.po.FragmentClassify;
import com.cn.cms.po.FragmentHistory;
import com.cn.cms.utils.Page;

import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/18.
 */
public interface FragmentService {

    Integer queryFragmentCount();

    List<Fragment> queryFragmentList(Page page);

    List<Fragment> findAll();

    Integer searchFragementCount(FragmentSearch fragmentSearch);

    List<Fragment> searchFragement(FragmentSearch fragmentSearch, Page page);

    Fragment findFragment(Long id);

    void delFragment(String lastModifyUserId, Long id);

    void editFragment(Fragment fragment);

    void updateFragment(Fragment fragment);

    void saveFragment(Fragment fragment);

    Integer queryHistoryCount(Long fid);

    List<FragmentHistory> queryHistoryList(Long fid, Page page);

    List<FragmentClassify> queryFragmentClassify();

    void updateFragmentClassify(FragmentClassify fragmentClassify);

    void saveFragmentClassify(FragmentClassify fragmentClassify);

    void delClassify(String lastModifyUserId, Long id);
}
