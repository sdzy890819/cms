package com.cn.cms.web.controller;

import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhangyang on 16/11/14.
 */
@Controller
@RequestMapping(value="/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class TestController {

    @Resource
    private UserBiz userBiz;

    @RequestMapping(value = "/")
    public String index(HttpServletRequest request,Model model){
        UserBean ub = userBiz.test();
        return ApiResponse.returnSuccess(ub);
    }

    @RequestMapping("/v2")
    public String indexV2(HttpServletRequest request,Model model){
        model.addAttribute("a","Hello,zhangyang");
        return "index";
    }
}
