package com.cn.cms.web.controller;

import com.cn.cms.biz.*;
import com.cn.cms.bo.RelationColumn;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.DelTagEnum;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 16/12/11.
 */

@Controller
@RequestMapping(value="/webapi/newscolumn/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class NewsColumnController extends BaseController {

    @Resource
    private NewsBiz newsBiz;

    @Resource
    private PreTemplateBiz preTemplateBiz;

    @Resource
    private UserBiz userBiz;

    @Resource
    private ChannelBiz channelBiz;

    @Resource
    private PublishBiz publishBiz;

    /**
     * 栏目列表
     * @param channelId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:read" )
    @RequestMapping(value = "/newscolumnlist", method = RequestMethod.GET)
    public String list(@RequestParam(value = "channelId") Long channelId){
        List<NewsColumn> list = newsBiz.listNewsColumn(channelId);
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 新闻栏目列表分页
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:read" )
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(@RequestParam(value = "channelId", required = false) Long channelId,
                       @RequestParam(value = "page",required = false) Integer page,
                       @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page page1 = new Page(page, pageSize);
        List<NewsColumn> list = newsBiz.listNewsColumn(channelId, DelTagEnum.NORMAL.getType(), page1);
        userBiz.dataInitBase(list);
        channelBiz.dataInitChannel(list);
        newsBiz.dataColumnPublishInfoInit(list);
        Map<String, Object> map = new HashMap<>();
        map.put("page" ,page1);
        map.put("list", list);
        return ApiResponse.returnSuccess(map);
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
    @RequestMapping(value = "/createNewsColumn", method = RequestMethod.POST)
    public String createNewsColumn(HttpServletRequest request,
                                   @RequestParam(value = "columnName") String columnName,
                                   @RequestParam(value = "channelId") Long channelId,
                                   @RequestParam(value = "listId", required = false) Long listId,
                                   @RequestParam(value = "detailId", required = false) Long detailId,
                                   @RequestParam(value = "listTemplate2Id", required = false) Long listTemplate2Id,
                                   @RequestParam(value = "detailTemplate2Id", required = false) Long detailTemplate2Id,
                                   @RequestParam(value = "keywords", required = false) String keywords,
                                   @RequestParam(value = "description", required = false) String description,
                                   @RequestParam(value = "path", required = false) String path,
                                   @RequestParam(value = "fileName", required = false) String fileName){
        Integer count = newsBiz.findColumnNameCount(columnName);
        if ( count > 0 ) {
            return ApiResponse.returnFail(StaticContants.ERROR_COLUMN_NAME_EXIST);
        }
        NewsColumn newsColumn = new NewsColumn();
        newsColumn.setChannelId(channelId);
        newsColumn.setLastModifyUserId(getCurrentUserId(request));
        newsColumn.setCreateUserId(getCurrentUserId(request));
        newsColumn.setColumnName(columnName);
        newsColumn.setDetailId(detailId);
        newsColumn.setListId(listId);
        newsColumn.setListTemplate2Id(listTemplate2Id);
        newsColumn.setDetailTemplate2Id(detailTemplate2Id);
        newsColumn.setKeywords(keywords);
        newsColumn.setDescription(description);
        newsColumn.setPath(path);
        newsColumn.setFileName(fileName);
        newsBiz.saveNewsColumn(newsColumn);
        return ApiResponse.returnSuccess();
    }

    /**
     * 新闻栏目修改。
     * @param request
     * @param id
     * @param columnName
     * @param channelId
     * @param listId
     * @param detailId
     * @param keywords
     * @param description
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:update" )
    @RequestMapping(value = "/updateNewsColumn",method = RequestMethod.POST)
    public String updateNewsColumn(HttpServletRequest request,
                                   @RequestParam(value = "id") Long id,
                                   @RequestParam(value = "columnName", required = false) String columnName,
                                   @RequestParam(value = "channelId", required = false) Long channelId,
                                   @RequestParam(value = "listId", required = false) Long listId,
                                   @RequestParam(value = "detailId", required = false) Long detailId,
                                   @RequestParam(value = "listTemplate2Id", required = false) Long listTemplate2Id,
                                   @RequestParam(value = "detailTemplate2Id", required = false) Long detailTemplate2Id,
                                   @RequestParam(value = "keywords", required = false) String keywords,
                                   @RequestParam(value = "description", required = false) String description,
                                   @RequestParam(value = "path", required = false) String path,
                                   @RequestParam(value = "fileName", required = false) String fileName){
        NewsColumn oldNewsColumn = newsBiz.getNewsColumn(id);
        if( !oldNewsColumn.getColumnName().equals(columnName) ){
            Integer count = newsBiz.findColumnNameCount(columnName);
            if ( count > 0 ) {
                return ApiResponse.returnFail(StaticContants.ERROR_COLUMN_NAME_EXIST);
            }
        }
        NewsColumn newsColumn = new NewsColumn();
        newsColumn.setId(id);
        newsColumn.setChannelId(channelId);
        newsColumn.setLastModifyUserId(getCurrentUserId(request));
        newsColumn.setColumnName(columnName);
        newsColumn.setDetailId(detailId);
        newsColumn.setListId(listId);
        newsColumn.setDetailTemplate2Id(detailTemplate2Id);
        newsColumn.setListTemplate2Id(listTemplate2Id);
        newsColumn.setKeywords(keywords);
        newsColumn.setDescription(description);
        newsColumn.setPath(path);
        newsColumn.setFileName(fileName);
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

    /**
     * 获取栏目信息
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:read" )
    @RequestMapping(value = "/newscolumn",method = RequestMethod.GET)
    public String newscolumn(@RequestParam(value = "id") Long id){
        NewsColumn newsColumn = newsBiz.getNewsColumn(id);
        return ApiResponse.returnSuccess(newsColumn);
    }


    /**
     * 获取所有栏目
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:read" )
    @RequestMapping(value = "/relationColumnList",method = RequestMethod.GET)
    public String relationColumnList(){
        List<RelationColumn> list = newsBiz.getAll();
        return ApiResponse.returnSuccess(list);
    }


    @CheckToken
    @CheckAuth( name = "newscolumn:publish" )
    @RequestMapping(value = "/publish",method = RequestMethod.GET)
    public String publish(HttpServletRequest request, @RequestParam(value = "id") Long id){
        publishBiz.publishColumn(id, getCurrentUserId(request), CommonMessageSourceEnum.OTHER);
        return ApiResponse.returnSuccess();
    }




    /**
     * 新闻栏目列表分页
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:manage" )
    @RequestMapping(value = "/manage", method = RequestMethod.GET)
    public String manage(@RequestParam(value = "channelId", required = false) Long channelId,
                       @RequestParam(value = "page",required = false) Integer page,
                       @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page page1 = new Page(page, pageSize);
        List<NewsColumn> list = newsBiz.listNewsColumn(channelId, DelTagEnum.DEL.getType(),  page1);
        userBiz.dataInitBase(list);
        channelBiz.dataInitChannel(list);
        newsBiz.dataColumnPublishInfoInit(list);
        Map<String, Object> map = new HashMap<>();
        map.put("page" ,page1);
        map.put("list", list);
        return ApiResponse.returnSuccess(map);
    }


    /**
     * 栏目恢复
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:recover" )
    @RequestMapping(value = "/recover",method = RequestMethod.GET)
    public String recover(HttpServletRequest request, @RequestParam(value = "id") Long id){
        newsBiz.recoverNewsColumn(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }


}
