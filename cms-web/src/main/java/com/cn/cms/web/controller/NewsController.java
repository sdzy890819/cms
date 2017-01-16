package com.cn.cms.web.controller;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.PermissionBiz;
import com.cn.cms.biz.PublishBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.enums.RecommendEnum;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsDetail;
import com.cn.cms.po.NewsRecommend;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zhangyang on 16/12/11.
 */

@Controller
@RequestMapping(value="/webapi/news/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class NewsController extends BaseController {

    @Resource
    private NewsBiz newsBiz;

    @Resource
    private UserBiz userBiz;

    @Resource
    private PublishBiz publishBiz;

    @Resource
    private PermissionBiz permissionBiz;


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
                       @RequestParam(value="pageSize",required = false) Integer pageSize){
        Page page1 = new Page(page, pageSize);
        List<News> list = newsBiz.listNews(page1);

        List<String> userIds = new ArrayList<>();
        if(StringUtils.isNotEmpty(list)) {
            for (int i = 0; i < list.size(); i++) {
                userIds.add(list.get(i).getWriteUserId());
            }
            Map<String, UserBean> map = userBiz.getUserBeanMap(userIds);
            for (int i = 0; i < list.size(); i++) {
                list.get(i).setWriteUserName(map.get(list.get(i).getWriteUserId()).getRealName());
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("page", page1);
        result.put("list", list);
        return ApiResponse.returnSuccess(result);
    }

    /**
     * 我的新闻列表
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:read" )
    @RequestMapping(value = "/mynewslist",method = RequestMethod.GET)
    public String mynewslist(HttpServletRequest request,
                             @RequestParam(value = "publish" ,required = false) Integer publish,
                             @RequestParam(value = "page" ,required = false) Integer page,
                             @RequestParam(value="pageSize" ,required = false) Integer pageSize){
        Page page1 = new Page(page, pageSize);
        List<News> list = newsBiz.myNewsList(getCurrentUserId(request), publish, page1);
        if(StringUtils.isNotEmpty(list)) {
            UserBean userBean = userBiz.getUserBean(getCurrentUserId(request));
            for (int i = 0; i < list.size(); i++) {
                list.get(i).setWriteUserName(userBean.getRealName());
            }
        }
        Map<String, Object> result = new HashMap<>();
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
     * 创建新闻 保存草稿。
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
     * @param field1
     * @param field2
     * @param field3
     * @param field4
     * @param field5
     * @param autoPublish
     * @param timer
     * @return
     */
    @CheckToken
    @CheckAuth( name = "news:write" )
    @RequestMapping(value = "/createNews",method = RequestMethod.POST)
    public String createNews(HttpServletRequest request,
                             @RequestParam(value = "title") String title,
                             @RequestParam(value = "subTitle") String subTitle,
                             @RequestParam(value = "keyword") String keyword,
                             @RequestParam(value = "description") String description,
                             @RequestParam(value = "source") String source,
                             @RequestParam(value = "author") String author,
                             @RequestParam(value = "categoryId") Long categoryId,
                             @RequestParam(value = "channelId") Long channelId,
                             @RequestParam(value = "columnId") Long columnId,
                             @RequestParam(value = "content") String content,
                             @RequestParam(value = "field1", required = false) String field1,
                             @RequestParam(value = "field2", required = false) String field2,
                             @RequestParam(value = "field3", required = false) String field3,
                             @RequestParam(value = "field4", required = false) String field4,
                             @RequestParam(value = "field5", required = false) String field5,
                             @RequestParam(value = "autoPublish") Integer autoPublish,
                             @RequestParam(value = "timer", required = false) String timer,
                             @RequestParam(value = "publish", required = false, defaultValue = "0") Integer publish){
        String userID = getCurrentUserId(request);
        News news = new News();
        news.setTitle(title);
        news.setSubTitle(subTitle);
        news.setCategoryId(categoryId);
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
        news.setField1(field1);
        news.setField2(field2);
        news.setField3(field3);
        news.setField4(field4);
        news.setField5(field5);
        news.setPublish(publish);
        news.setAutoPublish(autoPublish);
        if(StringUtils.isNotBlank(timer)) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            try {
                news.setTimer(sdf.parse(timer));
                news.setBuildUserId(userID);
            } catch (ParseException e) {
                log.error(StaticContants.ERROR_DATE_PARSE, e);
                return ApiResponse.returnFail(StaticContants.ERROR_DATE_PARSE);
            }
        }
        newsBiz.saveNews(news);
        if(autoPublish!=null && autoPublish == AutoPublishEnum.YES.getType() && news.getTimer() == null && publish != PublishEnum.draft.getType()){

            if(permissionBiz.checkPermission(userID, "news:publish")) {
                publish(request, news.getId());
            }
        }
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
                             @RequestParam(value = "id",required = false) Long id,
                             @RequestParam(value = "title",required = false) String title,
                             @RequestParam(value = "subTitle",required = false) String subTitle,
                             @RequestParam(value = "keyword",required = false) String keyword,
                             @RequestParam(value = "description",required = false) String description,
                             @RequestParam(value = "source",required = false) String source,
                             @RequestParam(value = "author",required = false) String author,
                             @RequestParam(value = "categoryId", required = false) Long categoryId,
                             @RequestParam(value = "channelId",required = false) Long channelId,
                             @RequestParam(value = "columnId",required = false) Long columnId,
                             @RequestParam(value = "content",required = false) String content,
                             @RequestParam(value = "field1",required = false) String field1,
                             @RequestParam(value = "field2",required = false) String field2,
                             @RequestParam(value = "field3",required = false) String field3,
                             @RequestParam(value = "field4",required = false) String field4,
                             @RequestParam(value = "field5",required = false) String field5,
                             @RequestParam(value = "autoPublish",required = false) Integer autoPublish,
                             @RequestParam(value = "timer",required = false) String timer,
                             @RequestParam(value = "publish", required = false, defaultValue = "0") Integer publish){
        String userID = getCurrentUserId(request);
        News news = new News();
        news.setTitle(title);
        news.setSubTitle(subTitle);
        news.setCategoryId(categoryId);
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
        news.setField1(field1);
        news.setField2(field2);
        news.setField3(field3);
        news.setField4(field4);
        news.setField5(field5);
        news.setAutoPublish(autoPublish);
        news.setPublish(publish);
        if(StringUtils.isNotBlank(timer)) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM);
            try {
                news.setTimer(simpleDateFormat.parse(timer));
                news.setBuildUserId(userID);
            } catch (ParseException e) {
                log.error("timer参数错误", e);
                return ApiResponse.returnFail(StaticContants.ERROR_DATE_PARSE);
            }
        }
        newsBiz.updateNews(news);
        if(autoPublish!=null && autoPublish == AutoPublishEnum.YES.getType() && news.getTimer() == null && publish != PublishEnum.draft.getType()){
            if(permissionBiz.checkPermission(userID, "news:publish")) {
                publish(request, id);
            }
        }
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
    public String publish(HttpServletRequest request,
                          @RequestParam(value = "id") Long id){
        publishBiz.publish(id, getCurrentUserId(request), CommonMessageSourceEnum.NEWS);
        return ApiResponse.returnSuccess();
    }

    /**
     * 获取推荐信息
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newsrecommend:read" )
    @RequestMapping(value = "/recommendNewsInfo", method = RequestMethod.GET)
    public String recommendInfo(@RequestParam(value = "id") Long id){
        NewsRecommend newsRecommend = newsBiz.findNewsRecommend(id);
        if(newsRecommend.getRecommend() == RecommendEnum.NO.getType()){
            newsRecommend.setRecommendDescription(newsRecommend.getDescription());
            newsRecommend.setRecommendTitle(newsRecommend.getTitle());
        }
        return ApiResponse.returnSuccess(newsRecommend);
    }


    /**
     * 推荐
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newsrecommend:write" )
    @RequestMapping(value = "/recommend", method = RequestMethod.GET)
    public String recommend(HttpServletRequest request ,
                            @RequestParam(value = "id") Long id,
                            @RequestParam(value = "recommendTitle") String recommendTitle,
                            @RequestParam(value = "recommendDescription") String recommendDescription,
                            @RequestParam(value = "recommendImages") String recommendImages,
                            @RequestParam(value = "recommendColumnId") Long recommendColumnId,
                            @RequestParam(value = "sort") Integer sort){
        NewsRecommend newsRecommend = new NewsRecommend();
        newsRecommend.setId(id);
        newsRecommend.setRecommendTitle(recommendTitle);
        newsRecommend.setRecommend(RecommendEnum.YES.getType());
        newsRecommend.setRecommendDescription(recommendDescription);
        newsRecommend.setRecommendColumnId(recommendColumnId);
        newsRecommend.setRecommendImages(recommendImages);
        newsRecommend.setRecommendUserId(getCurrentUserId(request));
        newsRecommend.setSort(sort);
        newsBiz.recommendNews(newsRecommend);
        return ApiResponse.returnSuccess();
    }

}