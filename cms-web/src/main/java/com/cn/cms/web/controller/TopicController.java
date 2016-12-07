package com.cn.cms.web.controller;

import com.cn.cms.biz.TopicBiz;
import com.cn.cms.po.Topic;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by zhangyang on 16/12/3.
 */
@Controller
@RequestMapping(value="/topic/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class TopicController extends BaseController {

    @Resource
    private TopicBiz topicBiz;

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
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", pageObj);
        map.put("list", topics);
        return ApiResponse.returnSuccess(map);
    }

    /**
     *
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "topic:read" )
    @RequestMapping(value = "/topicInfo", method = RequestMethod.GET)
    public String topicInfo(@RequestParam(value = "page",defaultValue = "1") Integer page,
                            @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        List<Topic> topics = topicBiz.listTopic(pageObj);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", pageObj);
        map.put("list", topics);
        return ApiResponse.returnSuccess(map);
    }



}
