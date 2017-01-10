package com.cn.cms.web.controller;

import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhangyang on 16/12/20.
 */
@RestController
@RequestMapping(value="/webapi",produces = "application/json; charset=UTF-8")
public class IndexController extends BaseController {

    @RequestMapping(value="/",method = RequestMethod.GET)
    public String index(){
        return ApiResponse.returnSuccess("这位仁兄,有什么问题吗？");
    }
}
