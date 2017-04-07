package com.cn.cms.web.controller;

import com.cn.cms.biz.CategoryBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.contants.StaticContants;
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
 * Created by 华盛信息科技有限公司(HS) on 16/12/7.
 */
@Controller
@RequestMapping(value="/webapi/category/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class CategoryController extends BaseController {

    @Resource
    private CategoryBiz categoryBiz;

    @Resource
    private UserBiz userBiz;

    /**
     * 获取部门分类列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "category:read")
    @RequestMapping(value = "/listCategory", method = RequestMethod.GET)
    public String listCategory(@RequestParam(value = "info", defaultValue = "0") Integer p){
        List<Category> list = categoryBiz.listCategory();
        if(p != 0) {
            userBiz.dataInitBase(list);
        }
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
                                 @RequestParam(value = "categoryName") String categoryName,
                                 @RequestParam(value = "categoryDesc") String categoryDesc){
        Integer count = categoryBiz.findCategoryNameCount(categoryName);
        if( count > 0 ){
            return ApiResponse.returnFail(StaticContants.ERROR_CATEGORY_NAME_EXIST);
        }
        Category category = new Category();
        category.setLastModifyUserId(getCurrentUserId(request));
        category.setCreateUserId(getCurrentUserId(request));
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
                                 @RequestParam(value = "id") Long id,
                                 @RequestParam(value = "categoryName",required = false) String categoryName,
                                 @RequestParam(value = "categoryDesc",required = false) String categoryDesc){
        Category oldCategory = categoryBiz.getCategory(id);
        if( !oldCategory.getCategoryName().equals(categoryName) ){
            Integer count = categoryBiz.findCategoryNameCount(categoryName);
            if( count > 0 ){
                return ApiResponse.returnFail(StaticContants.ERROR_CATEGORY_NAME_EXIST);
            }
        }
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
