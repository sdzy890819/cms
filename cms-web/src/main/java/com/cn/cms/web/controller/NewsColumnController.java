package com.cn.cms.web.controller;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zhangyang on 16/12/11.
 */

@Controller
@RequestMapping(value="/newscolumn/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class NewsColumnController extends BaseController {

    @Resource
    private NewsBiz newsBiz;

    /**
     * 栏目列表
     * @param channelId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:read" )
    @RequestMapping(value = "/newscolumnlist",method = RequestMethod.GET)
    public String list(@RequestParam(value = "channelId") Long channelId){
        List<NewsColumn> list = newsBiz.listNewsColumn(channelId);
        return ApiResponse.returnSuccess(list);
    }


    /**
     * 创建栏目
     * @param request
     * @param columnName
     * @param channelId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:write" )
    @RequestMapping(value = "/createNewsColumn",method = RequestMethod.POST)
    public String createNewsColumn(HttpServletRequest request,
                                   @RequestPart(value = "columnName") String columnName,
                                   @RequestPart(value = "channelId") Long channelId
                                   ){
        NewsColumn newsColumn = new NewsColumn();
        newsColumn.setChannelId(channelId);
        newsColumn.setLastModifyUserId(getCurrentUserId(request));
        newsColumn.setColumnName(columnName);
        newsBiz.saveNewsColumn(newsColumn);
        return ApiResponse.returnSuccess();
    }


    /**
     * 删除栏目
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:delete" )
    @RequestMapping(value = "/delNewsColumn",method = RequestMethod.GET)
    public String delNewsColumn(HttpServletRequest request, @RequestParam(value = "id") Long id){
        newsBiz.delNewsColumn(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }
}
