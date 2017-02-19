package com.cn.cms.app.web;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.web.ann.CheckAppAuth;
import com.cn.cms.web.ann.CheckAppToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 17/2/19.
 */
@Controller
@RequestMapping(value="/app/newscolumn/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class AppNewsColumnController extends AppBaseController {

    @Resource
    private NewsBiz newsBiz;

    /**
     * 栏目列表
     * @param channelId
     * @return
     */
    @CheckAppToken
    @RequestMapping(value = "/newscolumnlist",method = RequestMethod.GET)
    public String list(@RequestParam(value = "channelId") Long channelId){
        List<NewsColumn> list = newsBiz.listNewsColumn(channelId);
        return ApiResponse.returnSuccess(list);
    }
}
