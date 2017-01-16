package com.cn.cms.service.impl;

import com.cn.cms.bo.FragmentSearch;
import com.cn.cms.dao.FragmentClassifyDao;
import com.cn.cms.dao.FragmentDao;
import com.cn.cms.dao.FragmentHistoryDao;
import com.cn.cms.po.Fragment;
import com.cn.cms.po.FragmentClassify;
import com.cn.cms.po.FragmentHistory;
import com.cn.cms.service.FragmentService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class FragmentServiceImpl implements FragmentService {

    @Resource
    private FragmentDao fragmentDao;

    @Resource
    private FragmentHistoryDao fragmentHistoryDao;

    @Resource
    private FragmentClassifyDao fragmentClassifyDao;


    public Integer queryFragmentCount() {
        return fragmentDao.queryFragmentCount();
    }

    public List<Fragment> queryFragmentList(Page page) {
        return fragmentDao.queryFragmentList(page);
    }

    @Override
    public List<Fragment> findAll() {
        return fragmentDao.findAll();
    }

    @Override
    public Integer searchFragementCount(FragmentSearch fragmentSearch) {
        return fragmentDao.searchFragementCount(fragmentSearch);
    }

    @Override
    public List<Fragment> searchFragement(FragmentSearch fragmentSearch, Page page) {
        return fragmentDao.searchFragement(fragmentSearch, page);
    }

    public Fragment findFragment(Long id) {
        return fragmentDao.findFragment(id);
    }

    public void delFragment(String lastModifyUserId, Long id) {
        fragmentDao.delFragment(lastModifyUserId, id);
    }

    public void editFragment(Fragment fragment) {
        fragmentDao.editFragment(fragment);
        FragmentHistory fragmentHistory = new FragmentHistory();
        fragmentHistory.setLastModifyUserId(fragment.getLastModifyUserId());
        fragmentHistory.setFragmentContent(fragment.getFragmentContent());
        fragmentHistory.setUserId(fragment.getLastModifyUserId());
        fragmentHistory.setCurrTime(new Date());
        fragmentHistory.setChannelId(fragment.getChannelId());
        fragmentHistory.setFragmentClassifyId(fragment.getFragmentClassifyId());
        fragmentHistory.setFragmentName(fragment.getFragmentName());
        fragmentHistory.setFragmentId(fragment.getId());
        fragmentHistoryDao.saveFragmentHistory(fragmentHistory);
    }

    public void updateFragment(Fragment fragment) {
        this.fragmentDao.updateFragment(fragment);
    }

    public void saveFragment(Fragment fragment) {
        this.fragmentDao.saveFragment(fragment);
    }

    public Integer queryHistoryCount(Long fid) {
        return this.fragmentHistoryDao.queryHistoryCount(fid);
    }

    public List<FragmentHistory> queryHistoryList(Long fid, Page page) {
        return this.fragmentHistoryDao.queryHistoryList(fid, page);
    }

    public List<FragmentClassify> queryFragmentClassify() {
        return this.fragmentClassifyDao.queryFragmentClassify();
    }

    public void updateFragmentClassify(FragmentClassify fragmentClassify) {
        this.fragmentClassifyDao.updateFragmentClassify(fragmentClassify);
    }

    public void saveFragmentClassify(FragmentClassify fragmentClassify) {
        this.fragmentClassifyDao.saveFragmentClassify(fragmentClassify);
    }

    public void delClassify(String lastModifyUserId, Long id) {
        this.fragmentClassifyDao.delClassify(lastModifyUserId, id);
    }
}
