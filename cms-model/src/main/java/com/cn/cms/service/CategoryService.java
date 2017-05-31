package com.cn.cms.service;

import com.cn.cms.po.Category;

import java.util.List;

/**
 * Created by ADMIN on 16/11/18.
 */
public interface CategoryService {

    List<Category> findCategoryAll();

    void saveCategory(Category category);

    void updateCategory(Category category);

    void delCategory(String lastModifyUserId, Long id);

    Category findCategory(Long id);

    Integer findCategoryNameCount(String categoryName);
}
