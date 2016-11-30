package com.cn.cms.web.controller;

import com.cn.cms.biz.PositionBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.biz.UserPositionBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.po.Position;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户操作接口
 * Created by zhangyang on 16/11/23.
 */

@Controller
@RequestMapping(value="/user/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class UserController extends BaseController{


    @Resource
    private UserBiz userBiz;



    /**
     * 登入
     * @param response
     * @param userName
     * @param pwd
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(HttpServletResponse response,
                        @RequestPart(value="userName")String userName,
                        @RequestPart(value="pwd")String pwd){
        return userBiz.checkUserAndSetCookie(response ,userName ,pwd);
    }


    /**
     * 登出
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/loginOut", method = RequestMethod.POST)
    public String loginOut(HttpServletRequest request ,HttpServletResponse response){
        userBiz.clearCookie(request, response);
        return ApiResponse.returnSuccess();
    }



    /**
     * 获取用户列表
     * @param request
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "user:update" )
    @RequestMapping(value = "/userlist")
    public String userlist(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                        @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<UserBean> users= userBiz.listUser(pageObj);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("page",page);
        result.put("list",users);
        return ApiResponse.returnSuccess(result);
    }

    /**
     * 获取当前登录用户信息
     * @param request
     * @return
     */
    @CheckToken
    @RequestMapping(value = "/currentUser")
    public String currentUser(HttpServletRequest request){
        String userID = getCurrentUserId(request);
        if(StringUtils.isBlank(userID)){
            return ApiResponse.returnFail(ErrorCodeEnum.ERROR_LOGIN_FAIL.getType(),ErrorCodeEnum.ERROR_LOGIN_FAIL.getMessage());
        }
        UserBean userBean = userBiz.getUserBean(userID);
        return ApiResponse.returnSuccess(userBean);
    }

    /**
     * 创建用户
     * @param request
     * @param userName
     * @param realName
     * @param pwd
     * @param headImage
     * @return
     */
    @CheckToken
    @CheckAuth( name = "user:write" )
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

    /**
     * 逻辑删除用户
     * @param request
     * @param userId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "user:delete" )
    @RequestMapping(value = "/delUser",method = RequestMethod.GET)
    public String delUser(HttpServletRequest request,@RequestParam("userId")String userId){
        String userID = getCurrentUserId(request);
        userBiz.delUser(userID, userId);
        return ApiResponse.returnSuccess();
    }

    /**
     * 根据用户ID修改真实姓名、头像、密码
     * @param request
     * @param userId
     * @param realName
     * @param headImage
     * @param pwd
     * @return
     */
    @CheckToken
    @RequestMapping(value = "/updateUser",method = RequestMethod.POST)
    public String updateUser(HttpServletRequest request, @RequestPart("userId")String userId,
                            @RequestPart("realName")String realName,
                            @RequestPart("headImage")String headImage,
                            @RequestPart("pwd")String pwd){
        String userID = getCurrentUserId(request);
        if(!userId.equals(userID)){
            return ApiResponse.returnFail(ErrorCodeEnum.ERROR_NO_PERMISSION.getType(),ErrorCodeEnum.ERROR_NO_PERMISSION.getMessage());
        }
        userBiz.updateUser(userID, userId, realName, headImage, pwd);
        return ApiResponse.returnSuccess();
    }



}
