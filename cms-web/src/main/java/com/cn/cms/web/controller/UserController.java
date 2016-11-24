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
 * Created by zhangyang on 16/11/23.
 */
@Controller
@RequestMapping(value="/user/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class UserController {


    @Resource
    private UserBiz userBiz;


    @RequestMapping(value = "/list")
    public String index(HttpServletRequest request, Model model){

        return ApiResponse.returnSuccess();
    }

}
