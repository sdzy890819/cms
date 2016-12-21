package com.cn.cms.service.impl;

import com.cn.cms.dao.CategoryDao;
import com.cn.cms.po.Category;
import com.cn.cms.service.CategoryService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/18.
 */
@Repository
public class CategoryServiceImpl implements CategoryService {


    @Resource
    private CategoryDao categoryDao;

    public List<Category> findCategoryAll() {
        return categoryDao.findCategoryAll();
    }

    public void saveCategory(Category category) {
        categoryDao.saveCategory(category);
    }

    public void updateCategory(Category category) {
        categoryDao.updateCategory(category);
    }

    public void delCategory(String lastModifyUserId, Long id) {
        categoryDao.delCategory(lastModifyUserId, id);
    }

    public Category findCategory(Long id) {
        return categoryDao.findCategory(id);
    }
}
