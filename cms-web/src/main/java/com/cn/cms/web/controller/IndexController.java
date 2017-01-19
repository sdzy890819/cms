package com.cn.cms.web.controller;

import com.cn.cms.biz.IndexBiz;
import com.cn.cms.middleware.bean.TongjiData;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 16/12/20.
 */
@RestController
@RequestMapping(value="/webapi/",produces = "application/json; charset=UTF-8")
public class IndexController extends BaseController {

    @Resource
    private IndexBiz indexBiz;

    @CheckToken
    @RequestMapping(value="/index",method = RequestMethod.GET)
    public String index(){
        TongjiData data = indexBiz.indexData();
        return ApiResponse.returnSuccess(data);
    }
}
