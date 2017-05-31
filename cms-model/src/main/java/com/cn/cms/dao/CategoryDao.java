package com.cn.cms.dao;

import com.cn.cms.po.Category;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface CategoryDao {

    List<Category> findCategoryAll();

    void saveCategory(@Param(value = "p1") Category category);

    void updateCategory(@Param(value = "p1") Category category);

    void delCategory(@Param(value = "lastModifyUserId") String lastModifyUserId, @Param(value = "id") Long id);

    Category findCategory(@Param(value = "id") Long id);

    Integer findCategoryNameCount(@Param(value = "categoryName") String categoryName);
}
