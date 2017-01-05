package com.cn.cms.web.controller;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.PreTemplateBiz;
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

    @Resource
    private PreTemplateBiz preTemplateBiz;

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
                                   @RequestParam(value = "columnName") String columnName,
                                   @RequestParam(value = "channelId") Long channelId,
                                   @RequestParam(value = "listId", required = false) Long listId,
                                   @RequestParam(value = "detailId", required = false) Long detailId,
                                   @RequestParam(value = "keywords", required = false) String keywords,
                                   @RequestParam(value = "description", required = false) String description){
        NewsColumn newsColumn = new NewsColumn();
        newsColumn.setChannelId(channelId);
        newsColumn.setLastModifyUserId(getCurrentUserId(request));
        newsColumn.setColumnName(columnName);
        newsColumn.setDetailId(detailId);
        newsColumn.setListId(listId);
        newsColumn.setKeywords(keywords);
        newsColumn.setDescription(description);
        newsBiz.saveNewsColumn(newsColumn);
        return ApiResponse.returnSuccess();
    }

    @CheckToken
    @CheckAuth( name = "newscolumn:update" )
    @RequestMapping(value = "/updateNewsColumn",method = RequestMethod.POST)
    public String updateNewsColumn(HttpServletRequest request,
                                   @RequestParam(value = "id") Long id,
                                   @RequestParam(value = "columnName") String columnName,
                                   @RequestParam(value = "channelId") Long channelId,
                                   @RequestParam(value = "listId", required = false) Long listId,
                                   @RequestParam(value = "detailId", required = false) Long detailId,
                                   @RequestParam(value = "keywords", required = false) String keywords,
                                   @RequestParam(value = "description", required = false) String description){
        NewsColumn newsColumn = new NewsColumn();
        newsColumn.setId(id);
        newsColumn.setChannelId(channelId);
        newsColumn.setLastModifyUserId(getCurrentUserId(request));
        newsColumn.setColumnName(columnName);
        newsColumn.setDetailId(detailId);
        newsColumn.setListId(listId);
        newsColumn.setKeywords(keywords);
        newsColumn.setDescription(description);
        newsBiz.updateNewsColumn(newsColumn);
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
