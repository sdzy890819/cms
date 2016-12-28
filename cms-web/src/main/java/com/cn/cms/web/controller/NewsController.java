package com.cn.cms.web.controller;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.PublishBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.message.BuildSendMessage;
import com.cn.cms.message.bean.Body;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsDetail;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created by zhangyang on 16/12/11.
 */

@Controller
@RequestMapping(value="/news/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class NewsController extends BaseController {

    @Resource
    private NewsBiz newsBiz;

    @Resource
    private UserBiz userBiz;

    @Resource
    private PublishBiz publishBiz;


    /**
     * 新闻列表
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:read" )
    @RequestMapping(value = "/newslist",method = RequestMethod.GET)
    public String list(@RequestParam(value = "page",required = false) Integer page,
                       @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page page1 = new Page(page, pageSize);
        List<News> list = newsBiz.listNews(page1);

        List<String> userIds = new ArrayList<String>();
        for( int i = 0; i < list.size(); i++ ){
            userIds.add(list.get(i).getWriteUserId());
        }
        Map<String, UserBean> map = userBiz.getUserBeanMap(userIds);
        for( int i = 0; i < list.size(); i++ ){
            list.get(i).setWriteUserName(map.get(list.get(i).getWriteUserId()).getRealName());
        }
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("page", page1);
        result.put("list", list);
        return ApiResponse.returnSuccess(result);
    }

    /**
     * 获取新闻详细信息
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:read" )
    @RequestMapping(value = "/newsdetail",method = RequestMethod.GET)
    public String newsdetail(@RequestParam(value = "id") Long id){
        News news = newsBiz.findNewsAndDetail(id);
        return ApiResponse.returnSuccess(news);
    }

    /**
     * 删除新闻
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:delete" )
    @RequestMapping(value = "/delNews",method = RequestMethod.GET)
    public String delNews(HttpServletRequest request, @RequestParam(value = "id") Long id){
        newsBiz.delNews(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }


    /**
     * 创建新闻
     * @param request
     * @param title
     * @param subTitle
     * @param keyword
     * @param description
     * @param source
     * @param author
     * @param channelId
     * @param columnId
     * @param content
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:write" )
    @RequestMapping(value = "/createNews",method = RequestMethod.POST)
    public String createNews(HttpServletRequest request,
                             @RequestPart(value = "title") String title,
                             @RequestPart(value = "subTitle") String subTitle,
                             @RequestPart(value = "keyword") String keyword,
                             @RequestPart(value = "description") String description,
                             @RequestPart(value = "source") String source,
                             @RequestPart(value = "author") String author,
                             @RequestPart(value = "channelId") Long channelId,
                             @RequestPart(value = "columnId") Long columnId,
                             @RequestPart(value = "content") String content
                             ){
        String userID = getCurrentUserId(request);
        News news = new News();
        news.setTitle(title);
        news.setSubTitle(subTitle);
        news.setChannelId(channelId);
        news.setColumnId(columnId);
        news.setAuthor(author);
        news.setKeyword(keyword);
        news.setDescription(description);
        news.setSource(source);
        NewsDetail newsDetail = new NewsDetail();
        newsDetail.setLastModifyUserId(userID);
        newsDetail.setContent(content);
        news.setNewsDetail(newsDetail);
        news.setLastModifyUserId(userID);
        news.setWriteTime(new Date());
        news.setWriteUserId(userID);
        newsBiz.saveNews(news);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改新闻
     * @param request
     * @param id
     * @param title
     * @param subTitle
     * @param keyword
     * @param description
     * @param source
     * @param author
     * @param channelId
     * @param columnId
     * @param content
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:update" )
    @RequestMapping(value = "/updateNews",method = RequestMethod.POST)
    public String updateNews(HttpServletRequest request,
                             @RequestPart(value = "id",required = false) Long id,
                             @RequestPart(value = "title",required = false) String title,
                             @RequestPart(value = "subTitle",required = false) String subTitle,
                             @RequestPart(value = "keyword",required = false) String keyword,
                             @RequestPart(value = "description",required = false) String description,
                             @RequestPart(value = "source",required = false) String source,
                             @RequestPart(value = "author",required = false) String author,
                             @RequestPart(value = "channelId",required = false) Long channelId,
                             @RequestPart(value = "columnId",required = false) Long columnId,
                             @RequestPart(value = "content",required = false) String content){
        String userID = getCurrentUserId(request);
        News news = new News();
        news.setTitle(title);
        news.setSubTitle(subTitle);
        news.setChannelId(channelId);
        news.setColumnId(columnId);
        news.setAuthor(author);
        news.setKeyword(keyword);
        news.setDescription(description);
        news.setSource(source);
        NewsDetail newsDetail = new NewsDetail();
        newsDetail.setLastModifyUserId(userID);
        newsDetail.setContent(content);
        newsDetail.setNewsId(id);
        news.setNewsDetail(newsDetail);
        news.setLastModifyUserId(userID);
        newsBiz.updateNews(news);
        return ApiResponse.returnSuccess();
    }


    /**
     * 新闻发布
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:publish" )
    @RequestMapping(value = "/publish", method = RequestMethod.GET)
    public String publish(HttpServletRequest request, @RequestParam(value = "id") Long id){
        publishBiz.publish(id, getCurrentUserId(request), CommonMessageSourceEnum.NEWS);
        return ApiResponse.returnSuccess();
    }

}
