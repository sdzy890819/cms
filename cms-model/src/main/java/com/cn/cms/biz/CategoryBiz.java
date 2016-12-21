package com.cn.cms.biz;

import com.cn.cms.po.Category;
import com.cn.cms.service.CategoryService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/12/7.
 */
@Component
public class CategoryBiz extends BaseBiz {

    @Resource
    private CategoryService categoryService;


    /**
     * 获取部门列表
     * @return
     */
    public List<Category> listCategory(){
        return categoryService.findCategoryAll();
    }

    /**
     * 新增部门
     * @param category
     */
    public void saveCategory(Category category) {
        categoryService.saveCategory(category);
    }

    /**
     * 修改部门
     * @param category
     */
    public void updateCategory(Category category) {
        categoryService.updateCategory(category);
    }

    /**
     * 删除部门
     * @param lastModifyUserId
     * @param id
     */
    public void delCategory(String lastModifyUserId, Long id) {
        categoryService.delCategory(lastModifyUserId, id);
    }

}
