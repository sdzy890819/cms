package com.cn.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhangyang on 16/11/14.
 */
@Controller
@RequestMapping("/")
public class TestController {


    @RequestMapping("index")
    public String index(HttpServletRequest request,Model model){
        model.addAttribute("a","Hello,zhangyang");
        return "index";
    }
}
