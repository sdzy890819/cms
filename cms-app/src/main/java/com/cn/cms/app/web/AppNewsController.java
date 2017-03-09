package com.cn.cms.app.web;

import com.cn.cms.app.biz.AppPublishBiz;
import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.PermissionBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.AutoPublishEnum;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.PlatformEnum;
import com.cn.cms.enums.PublishEnum;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsDetail;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAppAuth;
import com.cn.cms.web.ann.CheckAppToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/2/8.
 */
@RestController
@RequestMapping(value="/app/news/", produces = "application/json; charset=UTF-8")
public class AppNewsController extends AppBaseController {

    @Resource
    private NewsBiz newsBiz;

    @Resource
    private UserBiz userBiz;

    @Resource
    private AppPublishBiz appPublishBiz;

    @Resource
    private PermissionBiz permissionBiz;

    @Resource
    private ChannelBiz channelBiz;

    /**
     * App端 新闻列表
     * @param page
     * @param pageSize
     * @return
     */
    @CheckAppToken
    @CheckAppAuth( name = "appnews:read" )
    @RequestMapping(value = "/newslist",method = RequestMethod.GET)
    public String list(@RequestParam(value = "page", required = false) Integer page,
                       @RequestParam(value = "pageSize", required = false) Integer pageSize){
        Page page1 = new Page(page, pageSize);
        List<News> list = newsBiz.listNews(page1);
        newsBiz.dataInit(list);
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
    @CheckAppToken
    @CheckAppAuth( name = "appnews:read" )
    @RequestMapping(value = "/newsdetail",method = RequestMethod.GET)
    public String newsdetail(@RequestParam(value = "id") Long id){
        News news = newsBiz.findNewsAndDetail(id);
        return ApiResponse.returnSuccess(news);
    }

    /**
     * 获取上次发布新闻的部门 频道 栏目信息
     * @param request
     * @return
     */
    @CheckAppToken
    @CheckAppAuth( name = "appnews:write" )
    @RequestMapping(value = "/previousColumn",method = RequestMethod.GET)
    public String previousColumn(HttpServletRequest request){
        return ApiResponse.returnSuccess(newsBiz.getPreviousColumn(getCurrentUserId(request)));
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
    @CheckAppToken
    @CheckAppAuth( name = "appnews:write" )
    @RequestMapping(value = "/createNews",method = RequestMethod.POST)
    public String createNews(HttpServletRequest request,
                             @RequestParam(value = "title") String title,
                             @RequestParam(value = "subTitle", required = false) String subTitle,
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
                             @RequestParam(value = "publish", required = false, defaultValue = "0") Integer publish,
                             @RequestParam(value = "editPublishTime", required = false) String editPublishTime){
        String userID = getCurrentUserId(request);
        News news = new News();
        news.setTitle(title);
        news.setSubTitle(subTitle);
        news.setCategoryId(categoryId);
        news.setChannelId(channelId);
        news.setColumnId(columnId);
        news.setAuthor(author);
        news.setKeyword(keyword);
        if(StringUtils.isNotBlank(news.getDescription())) {
            news.setDescription(description);
        }else {
            news.setDescription(content.replaceAll(StaticContants.REGEX_SPLIT_HTML_CONTENT, "").replaceAll("\"", "“"));
        }
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
        news.setPlatform(PlatformEnum.APP.getType());
        if(StringUtils.isNotBlank(editPublishTime)){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            try {
                news.setEditPublishTime(sdf.parse(editPublishTime));
            } catch (ParseException e) {
                return ApiResponse.returnFail(StaticContants.ERROR_DATE_PARSE);
            }
        }
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
    @CheckAppToken
    @CheckAppAuth( name = "appnews:update" )
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
                             @RequestParam(value = "publish", required = false, defaultValue = "0") Integer publish,
                             @RequestParam(value = "editPublishTime", required = false) String editPublishTime){
        String userID = getCurrentUserId(request);
        News old = this.newsBiz.findNews(id);
        News news = new News();
        news.setTitle(title);
        news.setSubTitle(subTitle);
        news.setCategoryId(categoryId);
        news.setChannelId(channelId);
        news.setColumnId(columnId);
        news.setAuthor(author);
        news.setKeyword(keyword);
        if(StringUtils.isNotBlank(news.getDescription())) {
            news.setDescription(description);
        }else {
            news.setDescription(content.replaceAll(StaticContants.REGEX_SPLIT_HTML_CONTENT, "").replaceAll("\"", "“"));
        }
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
        if(old.getPublish() != PublishEnum.YES.getType()) {
            news.setPublish(publish);
        }
        news.setPlatform(PlatformEnum.APP.getType());
        news.setId(id);
        if(StringUtils.isNotBlank(editPublishTime)){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            try {
                news.setEditPublishTime(sdf.parse(editPublishTime));
            } catch (ParseException e) {
                return ApiResponse.returnFail(StaticContants.ERROR_DATE_PARSE);
            }
        }

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
    @CheckAppToken
    @CheckAppAuth( name = "appnews:publish" )
    @RequestMapping(value = "/publish", method = RequestMethod.GET)
    public String publish(HttpServletRequest request,
                          @RequestParam(value = "id") Long id){
        appPublishBiz.publish(id, getCurrentUserId(request), CommonMessageSourceEnum.NEWS);
        return ApiResponse.returnSuccess();
    }

}
