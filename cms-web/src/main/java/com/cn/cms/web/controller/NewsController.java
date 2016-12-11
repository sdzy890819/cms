package com.cn.cms.web.controller;

import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by zhangyang on 16/12/11.
 */

@Controller
@RequestMapping(value="/news/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class NewsController extends BaseController {


    @CheckToken
    @CheckAuth( name = "news:read" )
    @RequestMapping(value = "/newslist",method = RequestMethod.GET)
    public String list(@RequestParam(value = "page",required = false) Integer page,
                       @RequestParam(value="pageSize",required = false)Integer pageSize){

        return ApiResponse.returnSuccess();
    }

}
