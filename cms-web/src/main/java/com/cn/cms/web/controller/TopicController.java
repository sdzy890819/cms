package com.cn.cms.web.controller;

import com.cn.cms.biz.PublishBiz;
import com.cn.cms.biz.Template2Biz;
import com.cn.cms.biz.TemplateBiz;
import com.cn.cms.biz.TopicBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.po.*;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 专题操作
 * Created by ADMIN on 16/12/3.
 */
@Controller
@RequestMapping(value="/webapi/topic/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class TopicController extends BaseController {

    @Resource
    private TopicBiz topicBiz;

    @Resource
    private PublishBiz publishBiz;

    @Resource
    private TemplateBiz templateBiz;

    @Resource
    private Template2Biz template2Biz;

    /**
     * 分页专题列表。
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topic:read" )
    @RequestMapping(value = "/listTopic", method = RequestMethod.GET)
    public String listTopic(@RequestParam(value = "page",defaultValue = "1") Integer page,
                               @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        List<Topic> topics = topicBiz.listTopic(pageObj);
        Map<String, Object> map = new HashMap<>();
        map.put("page", pageObj);
        map.put("list", topics);
        return ApiResponse.returnSuccess(map);
    }

    /**
     * 专题详情
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topic:read" )
    @RequestMapping(value = "/topicInfo", method = RequestMethod.GET)
    public String topicInfo(@RequestParam(value = "id") Long id){
        Topic topic = topicBiz.getTopic(id);
        return ApiResponse.returnSuccess(topic);
    }

    /**
     * 专题删除
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topic:delete" )
    @RequestMapping(value = "/delTopic", method = RequestMethod.GET)
    public String delTopic(HttpServletRequest request, @RequestParam(value = "id") Long id){
        topicBiz.delTopic(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }


    /**
     * 发布。
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topic:publish" )
    @RequestMapping(value = "/publish", method = RequestMethod.GET)
    public String publish(HttpServletRequest request, @RequestParam(value = "id") Long id){
        publishBiz.publish(id, getCurrentUserId(request), CommonMessageSourceEnum.TOPIC);
        return ApiResponse.returnSuccess();
    }

    /**
     * 创建专题 --没有发布。单纯保存
     * @param request
     * @param topicTitle
     * @param topicContent
     * @param topicPath
     * @param topicFilename
     * @param topicClassifyId
     * @param categoryId
     * @param channelId
     * @param releaseTime
     * @param keyword
     * @param description
     * @param topicColumnId
     * @return
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "topic:write" )
    @RequestMapping(value = "/createTopic", method = RequestMethod.POST)
    public String createTopic(HttpServletRequest request,
                             @RequestParam(value = "topicTitle") String topicTitle,
                             @RequestParam(value = "topicContent") String topicContent,
                             @RequestParam(value = "topicPath") String topicPath,
                             @RequestParam(value = "topicFilename") String topicFilename,
                             @RequestParam(value = "topicClassifyId") Long topicClassifyId,
                             @RequestParam(value = "categoryId") Long categoryId,
                             @RequestParam(value = "channelId") Long channelId,
                             @RequestParam(value = "releaseTime") String releaseTime,
                             @RequestParam(value = "keyword") String keyword,
                             @RequestParam(value = "description") String description,
                             @RequestParam(value = "topicColumnId", required = false) Long topicColumnId
                             ) throws BizException {
        SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD);
        Topic topic = new Topic();
        topic.setLastModifyUserId(getCurrentUserId(request));
        topic.setCreateUserId(getCurrentUserId(request));
        topic.setTopicClassifyId(topicClassifyId);
        topic.setCategoryId(categoryId);
        topic.setChannelId(channelId);
        topic.setDescription(description);
        topic.setKeyword(keyword);
        try {
            topic.setReleaseTime(sdf.parse(releaseTime));
        } catch (ParseException e) {
            throw new BizException(StaticContants.getTimeParseErrorYYYYMMDD(),e);
        }
        topic.setTopicColumnId(topicColumnId);
        topic.setTopicContent(topicContent);
        topic.setTopicFilename(topicFilename);
        topic.setTopicPath(FileUtil.delPrefix(topicPath));
        topic.setTopicTitle(topicTitle);

//        Integer c = topicBiz.queryFilenameAndPathCount(topic);
//        if(c != null && c > 0){
//            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//        }
//
//        Template template = new Template();
//        template.setFilename(topicFilename);
//        template.setPath(topicPath);
//        Integer a = templateBiz.queryFilenameAndPathCount(template);
//        if( a != null && a > 0){
//            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//        }
//
//        Template2 tmp = new Template2();
//        tmp.setFilename(topicFilename);
//        tmp.setPath(topicPath);
//        Integer b = template2Biz.queryFilenameAndPathCount(tmp);
//        if(b != null && b > 0){
//            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//        }




        topicBiz.saveTopic(topic);
        publish(request, topic.getId());
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改专题
     * @param request
     * @param id
     * @param topicTitle
     * @param topicContent
     * @param topicPath
     * @param topicFilename
     * @param topicClassifyId
     * @param categoryId
     * @param channelId
     * @param releaseTime
     * @param keyword
     * @param description
     * @param topicColumnId
     * @return
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "topic:update" )
    @RequestMapping(value = "/updateTopic", method = RequestMethod.POST)
    public String updateTopic(HttpServletRequest request,
                              @RequestParam(value = "id") Long id,
                             @RequestParam(value = "topicTitle",required = false) String topicTitle,
                             @RequestParam(value = "topicContent",required = false) String topicContent,
                             @RequestParam(value = "topicPath",required = false) String topicPath,
                             @RequestParam(value = "topicFilename",required = false) String topicFilename,
                             @RequestParam(value = "topicClassifyId",required = false) Long topicClassifyId,
                             @RequestParam(value = "categoryId",required = false) Long categoryId,
                             @RequestParam(value = "channelId",required = false) Long channelId,
                             @RequestParam(value = "releaseTime",required = false) String releaseTime,
                             @RequestParam(value = "keyword",required = false) String keyword,
                             @RequestParam(value = "description",required = false) String description,
                             @RequestParam(value = "topicColumnId",required = false) Long topicColumnId) throws BizException {
        SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD);
        Topic oldTopic = topicBiz.getTopic(id);
        Topic topic = new Topic();
        topic.setId(id);
        topic.setLastModifyUserId(getCurrentUserId(request));
        topic.setTopicClassifyId(topicClassifyId);
        topic.setCategoryId(categoryId);
        topic.setChannelId(channelId);
        topic.setDescription(description);
        topic.setKeyword(keyword);
        try {
            topic.setReleaseTime(sdf.parse(releaseTime));
        } catch (ParseException e) {
            throw new BizException(StaticContants.getTimeParseErrorYYYYMMDD(),e);
        }
        topic.setTopicColumnId(topicColumnId);
        topic.setTopicContent(topicContent);
        topic.setTopicFilename(topicFilename);
        topic.setTopicPath(FileUtil.delPrefix(topicPath));
        topic.setTopicTitle(topicTitle);
//        if(!oldTopic.getTopicPath().equals(topicPath) || !oldTopic.getTopicFilename().equals(topicFilename)) {
//            Integer c = topicBiz.queryFilenameAndPathCount(topic);
//            if (c != null && c > 0) {
//                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//            }
//
//            Template template = new Template();
//            template.setFilename(topicFilename);
//            template.setPath(topicPath);
//            Integer a = templateBiz.queryFilenameAndPathCount(template);
//            if (a != null && a > 0) {
//                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//            }
//
//            Template2 tmp = new Template2();
//            tmp.setFilename(topicFilename);
//            tmp.setPath(topicPath);
//            Integer b = template2Biz.queryFilenameAndPathCount(tmp);
//            if (b != null && b > 0) {
//                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//            }
//        }

        topicBiz.saveTopic(topic);
        publish(request, topic.getId());
        return ApiResponse.returnSuccess();
    }

    /**
     * 专题分类列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topicclassify:read" )
    @RequestMapping(value = "/topicClassifyList", method = RequestMethod.GET)
    public String topicClassifyList(){
        List<TopicClassify> list = topicBiz.findTopicClassifyAll();
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 新建专题分类
     * @param request
     * @param name
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topicclassify:write" )
    @RequestMapping(value = "/createTopicClassify", method = RequestMethod.POST)
    public String createTopicClassify(HttpServletRequest request,
                                      @RequestParam(value = "name") String name){
        TopicClassify topicClassify = new TopicClassify();
        topicClassify.setClassifyName(name);
        topicClassify.setLastModifyUserId(getCurrentUserId(request));
        topicClassify.setCreateUserId(getCurrentUserId(request));
        topicBiz.saveTopicClassify(topicClassify);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改专题分类
     * @param request
     * @param id
     * @param name
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topicclassify:update" )
    @RequestMapping(value = "/updateTopicClassify", method = RequestMethod.POST)
    public String updateTopicClassify(HttpServletRequest request,
                                      @RequestParam(value = "id") Long id,
                                      @RequestParam(value = "name") String name){
        TopicClassify topicClassify = new TopicClassify();
        topicClassify.setId(id);
        topicClassify.setClassifyName(name);
        topicClassify.setLastModifyUserId(getCurrentUserId(request));
        topicBiz.updateTopicClassify(topicClassify);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除专题分类
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topicclassify:delete" )
    @RequestMapping(value = "/delTopicClassify", method = RequestMethod.GET)
    public String delTopicClassify(HttpServletRequest request, @RequestParam(value = "id") Long id){
        topicBiz.delTopicClassify(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }


    /**
     * 专题分类列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topiccolumn:read" )
    @RequestMapping(value = "/topicColumnList", method = RequestMethod.GET)
    public String topicColumnList(){
        List<TopicColumn> list = topicBiz.findTopicColumnAll();
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 新建专题分类
     * @param request
     * @param name
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topiccolumn:write" )
    @RequestMapping(value = "/createTopicColumn", method = RequestMethod.POST)
    public String createTopicColumn(HttpServletRequest request,
                                      @RequestParam(value = "name") String name){
        TopicColumn topicColumn = new TopicColumn();
        topicColumn.setColumnName(name);
        topicColumn.setLastModifyUserId(getCurrentUserId(request));
        topicColumn.setCreateUserId(getCurrentUserId(request));
        topicBiz.saveTopicColumn(topicColumn);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改专题分类
     * @param request
     * @param id
     * @param name
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topiccolumn:update" )
    @RequestMapping(value = "/updateTopicColumn", method = RequestMethod.POST)
    public String updateTopicColumn(HttpServletRequest request,
                                      @RequestParam(value = "id") Long id,
                                      @RequestParam(value = "name") String name){
        TopicColumn topicColumn = new TopicColumn();
        topicColumn.setColumnName(name);
        topicColumn.setLastModifyUserId(getCurrentUserId(request));
        topicColumn.setId(id);
        topicBiz.updateTopicColumn(topicColumn);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除专题分类
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topiccolumn:delete" )
    @RequestMapping(value = "/delTopicColumn", method = RequestMethod.GET)
    public String delTopicColumn(HttpServletRequest request, @RequestParam(value = "id") Long id){
        topicBiz.delTopicColumn(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }





}
