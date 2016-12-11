package com.cn.cms.web.controller;

import com.cn.cms.biz.CategoryBiz;
import com.cn.cms.po.Category;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zhangyang on 16/12/7.
 */
@Controller
@RequestMapping(value="/category/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class CategoryController extends BaseController {

    @Resource
    private CategoryBiz categoryBiz;

    /**
     * 获取部门分类列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "category:read")
    @RequestMapping(value = "/listCategory", method = RequestMethod.GET)
    public String listCategory(){
        List<Category> list = categoryBiz.listCategory();
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 新增部门分类
     * @param request
     * @param categoryName
     * @param categoryDesc
     * @return
     */
    @CheckToken
    @CheckAuth( name = "category:write" )
    @RequestMapping(value = "/createCategory", method = RequestMethod.POST)
    public String createCategory(HttpServletRequest request,
                                 @RequestPart(value = "categoryName") String categoryName,
                                 @RequestPart(value = "categoryDesc") String categoryDesc){
        Category category = new Category();
        category.setLastModifyUserId(getCurrentUserId(request));
        category.setCategoryDesc(categoryDesc);
        category.setCategoryName(categoryName);
        categoryBiz.saveCategory(category);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改部门分类
     * @param request
     * @param id
     * @param categoryName
     * @param categoryDesc
     * @return
     */
    @CheckToken
    @CheckAuth( name = "category:update" )
    @RequestMapping(value = "/updateCategory", method = RequestMethod.POST)
    public String updateCategory(HttpServletRequest request,
                                 @RequestPart(value = "id") Long id,
                                 @RequestPart(value = "categoryName") String categoryName,
                                 @RequestPart(value = "categoryDesc") String categoryDesc){
        Category category = new Category();
        category.setLastModifyUserId(getCurrentUserId(request));
        category.setCategoryDesc(categoryDesc);
        category.setCategoryName(categoryName);
        category.setId(id);
        categoryBiz.updateCategory(category);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除部门分类
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "category:delete" )
    @RequestMapping(value = "/delCategory", method = RequestMethod.GET)
    public String delCategory(HttpServletRequest request, @RequestParam(value = "id") Long id){
        categoryBiz.delCategory(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }




}
