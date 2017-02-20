package com.cn.cms.web.controller;

import com.cn.cms.biz.*;
import com.cn.cms.bo.FragmentSearch;
import com.cn.cms.bo.Template2Search;
import com.cn.cms.bo.TemplateSearch;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.middleware.ESearchClient;
import com.cn.cms.middleware.bo.*;
import com.cn.cms.middleware.po.QueryResult;
import com.cn.cms.po.*;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 17/1/7.
 */
@Controller
@RequestMapping(value="/webapi/search/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class SearchController extends BaseController {


    @Resource
    private ESearchClient eSearchClient;

    @Resource
    private FragmentBiz fragmentBiz;

    @Resource
    private TemplateBiz templateBiz;

    @Resource
    private Template2Biz template2Biz;

    @Resource
    private UserBiz userBiz;

    @Resource
    private ChannelBiz channelBiz;

    @Resource
    private NewsBiz newsBiz;

    /**
     * 全文检索新闻
     * @param condition
     * @param author
     * @param source
     * @param categoryId
     * @param channelId
     * @param columnId
     * @param platform
     * @param startTime
     * @param endTime
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "news:search")
    @RequestMapping(value = "/searchNew", method = RequestMethod.POST)
    public String searchNews(@RequestParam(value = "condition", required = false) String condition,
                           @RequestParam(value = "author", required = false) String author,
                           @RequestParam(value = "source", required = false) String source,
                           @RequestParam(value = "categoryId", required = false) Long categoryId,
                           @RequestParam(value = "channelId", required = false) Long channelId,
                           @RequestParam(value = "columnId", required = false) Long columnId,
                           @RequestParam(value = "platform", required = false) Integer platform,
                           @RequestParam(value = "startTime", required = false) String startTime,
                           @RequestParam(value = "endTime", required = false) String endTime,
                             @RequestParam(value = "sort", required = false) Integer sort,
                             @RequestParam(value = "publishUserName", required = false) String publishUserName,
                             @RequestParam(value = "updateUserName", required = false) String updateUserName,
                             @RequestParam(value = "id", required = false) Integer id,
                           @RequestParam(value = "page", required = false) Integer page,
                           @RequestParam(value = "pageSize", required = false) Integer pageSize){

        SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM);
        NewsSearch newsSearch = new NewsSearch();
        newsSearch.setCondition(condition);
        newsSearch.setAuthor(author);
        newsSearch.setSource(source);
        newsSearch.setCategoryId(categoryId);
        newsSearch.setChannelId(channelId);
        newsSearch.setColumnId(columnId);
        newsSearch.setPlatform(platform);
        newsSearch.setSort(sort);
        List<String> realNames = new ArrayList<>();
        if(StringUtils.isNotBlank(publishUserName)){
            realNames.add(publishUserName);
        }
        if(StringUtils.isNotBlank(updateUserName)){
            realNames.add(updateUserName);
        }
        if(realNames.size() > 0){
            Map<String ,UserBean> map = userBiz.getUserForRealName(realNames);
            if(StringUtils.isNotBlank(publishUserName)){
                newsSearch.setBuildUserId(map.get(publishUserName)!=null?map.get(publishUserName).getUserId():null);
            }
            if(StringUtils.isNotBlank(updateUserName)){
                newsSearch.setLastModifyUserId(map.get(updateUserName)!=null?map.get(updateUserName).getUserId():null);
            }
        }
        newsSearch.setId(id);
        try {
            if (StringUtils.isNotBlank(startTime)) {
                newsSearch.setStartTimeMillis(sdf.parse(startTime).getTime());
            }
            if (StringUtils.isNotBlank(endTime)) {
                newsSearch.setEndTimeMillis(sdf.parse(endTime).getTime());
            }
        }catch (ParseException e){
            log.error(e);
            return ApiResponse.returnFail(StaticContants.ERROR_TIME_PARSE);
        }
        Page pageObj = new Page(page, pageSize);
        QueryResult<News> queryResult = eSearchClient.searchNews(newsSearch,pageObj);
        List<News> list = queryResult.getList();
        newsBiz.dataInit(list);
        return ApiResponse.returnSuccess(queryResult);
    }




    /**
     * 搜索专题。
     * @param condition
     * @param topicClassifyId
     * @param categoryId
     * @param channelId
     * @param releaseTime
     * @param topicColumnId
     * @param startTime
     * @param endTime
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "topic:search")
    @RequestMapping(value = "/searchTopic", method = RequestMethod.POST)
    public String searchTopic(@RequestParam(value = "condition", required = false) String condition,
                             @RequestParam(value = "topicClassifyId", required = false) Long topicClassifyId,
                             @RequestParam(value = "categoryId", required = false) Long categoryId,
                             @RequestParam(value = "channelId", required = false) Long channelId,
                             @RequestParam(value = "releaseTime", required = false) String releaseTime,
                             @RequestParam(value = "topicColumnId", required = false) Long topicColumnId,
                             @RequestParam(value = "startTime", required = false) String startTime,
                             @RequestParam(value = "endTime", required = false) String endTime,
                             @RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize){

        SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM);
        SimpleDateFormat sdf2 = new SimpleDateFormat(StaticContants.YYYY_MM_DD);
        TopicSearch topicSearch = new TopicSearch();
        topicSearch.setCondition(condition);
        topicSearch.setTopicClassifyId(topicClassifyId);
        topicSearch.setCategoryId(categoryId);
        topicSearch.setChannelId(channelId);
        topicSearch.setTopicColumnId(topicColumnId);
        try {
            if (StringUtils.isNotBlank(releaseTime)) {
                topicSearch.setReleaseTimeMillis(sdf2.parse(releaseTime).getTime());
            }
            if (StringUtils.isNotBlank(startTime)) {
                topicSearch.setStartTimeMillis(sdf.parse(startTime).getTime());
            }
            if (StringUtils.isNotBlank(endTime)) {
                topicSearch.setEndTimeMillis(sdf.parse(endTime).getTime());
            }
        }catch (ParseException e){
            log.error(e);
            return ApiResponse.returnFail(StaticContants.ERROR_TIME_PARSE);
        }
        Page pageObj = new Page(page, pageSize);
        QueryResult<Topic> queryResult = eSearchClient.searchTopic(topicSearch,pageObj);
        return ApiResponse.returnSuccess(queryResult);
    }


    /**
     * 图片检索
     * @param condition
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "images:search")
    @RequestMapping(value = "/searchImages", method = RequestMethod.POST)
    public String searchImages(@RequestParam(value = "condition", required = false) String condition,
                              @RequestParam(value = "page", required = false) Integer page,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize){

        ImagesSearch imagesSearch = new ImagesSearch();
        imagesSearch.setCondition(condition);
        Page pageObj = new Page(page, pageSize);
        QueryResult<Images> queryResult = eSearchClient.searchImages(imagesSearch,pageObj);
        return ApiResponse.returnSuccess(queryResult);
    }

    /**
     * 视频检索
     * @param condition
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "video:search")
    @RequestMapping(value = "/searchVideo", method = RequestMethod.POST)
    public String searchVideo(@RequestParam(value = "condition", required = false) String condition,
                               @RequestParam(value = "page", required = false) Integer page,
                               @RequestParam(value = "pageSize", required = false) Integer pageSize){

        VideoSearch videoSearch = new VideoSearch();
        videoSearch.setCondition(condition);
        Page pageObj = new Page(page, pageSize);
        QueryResult<Video> queryResult = eSearchClient.searchVideo(videoSearch,pageObj);
        return ApiResponse.returnSuccess(queryResult);
    }

    /**
     * 搜索碎片
     * @param condition
     * @param fragmentClassifyId
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "fragment:search")
    @RequestMapping(value = "/searchFragment", method = RequestMethod.POST)
    public String searchVideo(@RequestParam(value = "condition", required = false) String condition,
                              @RequestParam(value = "fragmentClassifyId", required = false) Long fragmentClassifyId,
                              @RequestParam(value = "channelId", required = false) Long channelId,
                              @RequestParam(value = "page", required = false) Integer page,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        FragmentSearch fragmentSearch = new FragmentSearch();
        fragmentSearch.setCondition(condition);
        fragmentSearch.setChannelId(channelId);
        fragmentSearch.setFragmentClassifyId(fragmentClassifyId);
        List<Fragment> result = fragmentBiz.searchFragement(fragmentSearch, pageObj);
        QueryResult<Fragment> queryResult = new QueryResult<>();
        queryResult.setPage(pageObj);
        queryResult.setList(result);
        return ApiResponse.returnSuccess(queryResult);
    }

    /**
     * 搜索模版
     * @param condition
     * @param channelId
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "template:search")
    @RequestMapping(value = "/searchTemplate", method = RequestMethod.POST)
    public String searchTemplate(@RequestParam(value = "condition", required = false) String condition,
                              @RequestParam(value = "channelId", required = false) Long channelId,
                              @RequestParam(value = "page", required = false) Integer page,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        TemplateSearch templateSearch = new TemplateSearch();
        templateSearch.setCondition(condition);
        templateSearch.setChannelId(channelId);
        List<Template> result = templateBiz.searchTemplate(templateSearch, pageObj);
        QueryResult<Template> queryResult = new QueryResult<>();
        queryResult.setPage(pageObj);
        queryResult.setList(result);
        return ApiResponse.returnSuccess(queryResult);
    }


    /**
     * 搜索模版
     * @param condition
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "template2:search")
    @RequestMapping(value = "/searchTemplate2", method = RequestMethod.POST)
    public String searchTemplate2(@RequestParam(value = "condition", required = false) String condition,
                                 @RequestParam(value = "page", required = false) Integer page,
                                 @RequestParam(value = "pageSize", required = false) Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        Template2Search template2Search = new Template2Search();
        template2Search.setCondition(condition);
        List<Template2> result = template2Biz.searchTemplate2(template2Search, pageObj);
        QueryResult<Template2> queryResult = new QueryResult<>();
        queryResult.setPage(pageObj);
        queryResult.setList(result);
        return ApiResponse.returnSuccess(queryResult);
    }

    /**
     * 搜索用户
     * @param condition
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth(name = "user:search")
    @RequestMapping(value = "/searchUser", method = RequestMethod.POST)
    public String searchUser(@RequestParam(value = "condition", required = false) String condition,
                             @RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "pageSize", required = false) Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        UserSearch userSearch = new UserSearch();
        userSearch.setCondition(condition);
        List<UserBean> list = userBiz.searchUsers(userSearch, pageObj);
        QueryResult<UserBean> queryResult = new QueryResult<>();
        queryResult.setPage(pageObj);
        queryResult.setList(list);
        return ApiResponse.returnSuccess(queryResult);
    }
}
