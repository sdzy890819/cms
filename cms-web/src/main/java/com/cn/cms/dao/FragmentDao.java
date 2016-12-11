package com.cn.cms.dao;

import com.cn.cms.po.Fragment;
import com.cn.cms.utils.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by zhangyang on 16/11/17.
 */
public interface FragmentDao {

    Integer queryFragmentCount();

    List<Fragment> queryFragmentList(@Param(value = "page") Page page);

    Fragment findFragment(@Param(value = "id") Long id);

    void delFragment(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    void editFragment(@Param(value = "p1") Fragment fragment);

    void updateFragment(@Param(value = "p1") Fragment fragment);

    void saveFragment(@Param(value = "p1") Fragment fragment);
}
