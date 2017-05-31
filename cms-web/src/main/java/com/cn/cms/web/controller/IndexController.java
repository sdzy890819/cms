package com.cn.cms.web.controller;

import com.cn.cms.biz.IndexBiz;
import com.cn.cms.middleware.TongjiClient;
import com.cn.cms.middleware.bean.TongjiData;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Created by ADMIN on 16/12/20.
 */
@RestController
@RequestMapping(value="/webapi/",produces = "application/json; charset=UTF-8")
public class IndexController extends BaseController {

    @Resource
    private TongjiClient tongjiClient;

    @CheckToken
    @RequestMapping(value="/index",method = RequestMethod.GET)
    public String index(){
        TongjiData data = indexData();
        return ApiResponse.returnSuccess(data);
    }


    public TongjiData indexData() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Calendar calendar = Calendar.getInstance();
        String endDate = sdf.format(calendar.getTime());
        calendar.add(Calendar.DAY_OF_MONTH, -14);
        String startDate = sdf.format(calendar.getTime());
        try {
            return tongjiClient.getDate(startDate, endDate);
        } catch (Exception e) {
            log.error("获取统计数据失败. ", e);
        }
        return null;
    }
}
