package com.cn.cms.web.controller;

import com.cn.cms.biz.PublishInfoBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.po.PublishInfo;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 17/5/10.
 */
@Controller
@RequestMapping(value="/webapi/publishInfo/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class PublishInfoController extends BaseController {


    @Resource
    private PublishInfoBiz publishInfoBiz;
    @Resource
    private UserBiz userBiz;

    /**
     * 列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "publishinfo:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(
                       @RequestParam(value = "triggerType", required = false) Integer triggerType,
                       @RequestParam(value = "triggerId", required = false) Long triggerId,
                       @RequestParam(value = "status", required = false) Integer status,
                       @RequestParam(value = "page", required = false) Integer page,
                       @RequestParam(value="pageSize", required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        PublishInfo publishInfo = new PublishInfo();
        publishInfo.setTriggerType(triggerType);
        publishInfo.setTriggerId(triggerId);
        publishInfo.setStatus(status);
        List<PublishInfo> list = publishInfoBiz.findPublishInfoList(publishInfo, pageObj);
        if(StringUtils.isNotEmpty(list)){
            Map<String, String> map = new HashMap<>();
            for(int i=0;i<list.size();i++){
                if(StringUtils.isNotBlank(list.get(i).getCreateUserId())){
                    map.put(list.get(i).getCreateUserId(),list.get(i).getCreateUserId());
                }
            }
            if(map.size() > 0){
                Map<String, UserBean> userMap = userBiz.getUserBeanMap(new ArrayList<>(map.values()));
                for(int i=0;i<list.size();i++){
                    if(StringUtils.isNotBlank(list.get(i).getCreateUserId()) && userMap!=null && userMap.get(list.get(i).getCreateUserId())!=null){
                        list.get(i).setCreateUserName(userMap.get(list.get(i).getCreateUserId()).getRealName());
                    }
                }
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("page",pageObj);
        result.put("list",list);
        return ApiResponse.returnSuccess(result);
    }


    /**
     * 详情页
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "publishinfo:read")
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail(@RequestParam(value = "id") Long id){
        PublishInfo publishInfo = publishInfoBiz.getPublishInfo(id);
        return ApiResponse.returnSuccess(publishInfo);
    }


}
