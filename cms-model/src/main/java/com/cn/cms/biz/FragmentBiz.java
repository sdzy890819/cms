package com.cn.cms.biz;

import com.cn.cms.bo.FragmentSearch;
import com.cn.cms.po.Fragment;
import com.cn.cms.po.FragmentClassify;
import com.cn.cms.po.FragmentHistory;
import com.cn.cms.service.FragmentService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ADMIN on 16/12/2.
 */
@Component
public class FragmentBiz extends BaseBiz {

    @Resource
    private FragmentService fragmentService;

    /**
     * 分页查询listFragment
     * @param page
     * @return
     */
    public List<Fragment> listFragment(Page page){
        Integer count = fragmentService.queryFragmentCount();
        page.setCount(count);
        if(page.isQuery()) {
            List<Fragment> list = fragmentService.queryFragmentList(page);
            return list;
        }
        return null;
    }

    public List<Fragment> findAll(){
        return fragmentService.findAll();
    }

    public List<Fragment> searchFragement(FragmentSearch fragmentSearch, Page page){
        Integer count = fragmentService.searchFragementCount(fragmentSearch);
        page.setCount(count);
        if(page.isQuery()) {
            List<Fragment> list = fragmentService.searchFragement(fragmentSearch, page);
            return list;
        }
        return null;
    }

    /**
     * 获取碎片信息
     * @param id
     * @return
     */
    public Fragment findFragment(Long id){
        return fragmentService.findFragment(id);
    }

    /**
     * 删除碎片
     * @param lastModifyUserId
     * @param id
     */
    public void delFragment(String lastModifyUserId, Long id){
        fragmentService.delFragment(lastModifyUserId, id);
    }

    /**
     * 编辑碎片。存入历史库。
     * @param fragment
     */
    public void editFragment(Fragment fragment){
        fragmentService.editFragment(fragment);
    }

    /**
     * 修改碎片内容
     * @param fragment
     */
    public void updateFragment(Fragment fragment){
        if(fragment.getId()!=null && fragment.getId() > 0 ){
            fragmentService.updateFragment(fragment);
        }else{
            fragmentService.saveFragment(fragment);
        }
    }

    /**
     * 历史碎片编辑纪录。
     * @param fid
     * @param page
     * @return
     */
    public List<FragmentHistory> listHistory(Long fid, Page page){
        Integer count = fragmentService.queryHistoryCount(fid);
        page.setCount(count);
        if(page.isQuery()){
            List<FragmentHistory> list = fragmentService.queryHistoryList(fid, page);
            return list;
        }
        return null;
    }

    /**
     * 碎片分类纪录
     * @return
     */
    public List<FragmentClassify> listClassify(){
        return fragmentService.queryFragmentClassify();
    }

    /**
     * 保存碎片分类
     * @param fragmentClassify
     */
    public void saveClassify(FragmentClassify fragmentClassify){
        if(fragmentClassify.getId()!=null && fragmentClassify.getId() > 0){
            fragmentService.updateFragmentClassify(fragmentClassify);
        }else{
            fragmentService.saveFragmentClassify(fragmentClassify);
        }
    }

    public void delClassify(String lastModifyUserId, Long id){
        fragmentService.delClassify(lastModifyUserId, id);
    }
}
