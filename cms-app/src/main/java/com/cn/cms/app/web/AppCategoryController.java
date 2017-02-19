package com.cn.cms.app.web;

import com.cn.cms.biz.CategoryBiz;
import com.cn.cms.po.Category;
import com.cn.cms.web.ann.CheckAppAuth;
import com.cn.cms.web.ann.CheckAppToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 17/2/19.
 */
@Controller
@RequestMapping(value="/app/category/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class AppCategoryController extends AppBaseController {

    @Resource
    private CategoryBiz categoryBiz;

    /**
     * 获取部门分类列表
     * @return
     */
    @CheckAppToken
    @RequestMapping(value = "/listCategory", method = RequestMethod.GET)
    public String listCategory(){
        List<Category> list = categoryBiz.listCategory();
        return ApiResponse.returnSuccess(list);
    }
}
