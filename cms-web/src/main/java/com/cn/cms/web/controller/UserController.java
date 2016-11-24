package com.cn.cms.web.controller;

import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.web.result.ApiResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zhangyang on 16/11/23.
 */
@Controller
@RequestMapping(value="/user/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class UserController extends BaseController{


    @Resource
    private UserBiz userBiz;


    /**
     * 获取用户列表
     * @param request
     * @param page
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "/list")
    public String index(HttpServletRequest request, @RequestParam(value = "page",required = true) Integer page,
                        @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<UserBean> users= userBiz.listUser(pageObj);
        return ApiResponse.returnSuccess(users);
    }

    /**
     * 获取当前登录用户信息
     * @param request
     * @return
     */
    @RequestMapping(value = "/currentUser")
    public String currentUser(HttpServletRequest request){
        String userID = getCurrentUserId(request);
        if(StringUtils.isBlank(userID)){
            return ApiResponse.returnFail(ErrorCodeEnum.ERROR_LOGIN_FAIL.getType(),ErrorCodeEnum.ERROR_LOGIN_FAIL.getMessage());
        }
        UserBean userBean = userBiz.getUserBean(userID);
        return ApiResponse.returnSuccess(userBean);
    }

    @RequestMapping(value = "/createUser",method = RequestMethod.POST)
    public String createUser(HttpServletRequest request, @RequestPart(value="userName")String userName,
                             @RequestPart(value="realName")String realName,
                             @RequestPart(value="pwd")String pwd,
                             @RequestPart(value="headImage")String headImage){
        String userID = getCurrentUserId(request);
        Integer a = userBiz.queryUserName(userName);
        if(a>0){
            return ApiResponse.returnFail(ErrorCodeEnum.ERROR_USERNAME_RE.getType(),ErrorCodeEnum.ERROR_USERNAME_RE.getMessage());
        }
        userBiz.createUser(userID,userName,pwd,headImage,realName);
        return ApiResponse.returnSuccess();
    }

}
