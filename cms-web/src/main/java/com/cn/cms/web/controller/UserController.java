package com.cn.cms.web.controller;

import com.cn.cms.biz.UserBiz;
import com.cn.cms.bo.UserBean;
import com.cn.cms.enums.ErrorCodeEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.po.User;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户操作接口
 * Created by ADMIN on 16/11/23.
 */

@Controller
@RequestMapping(value="/webapi/user/",produces = "application/json; charset=UTF-8")
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
                        @RequestParam(value="userName")String userName,
                        @RequestParam(value="pwd")String pwd){
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
    @CheckAuth( name = "user:read" )
    @RequestMapping(value = "/userlist")
    public String userlist(HttpServletRequest request, @RequestParam(value = "page",required = false) Integer page,
                        @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<UserBean> users= userBiz.listUser(pageObj);
        userBiz.dataInit(users);
        Map<String, Object> result = new HashMap<>();
        result.put("page",pageObj);
        result.put("list",users);
        return ApiResponse.returnSuccess(result);
    }




    /**
     * 获取当前登录用户信息
     * @param request
     * @return
     */
    @RequestMapping(value = "/currentUser")
    @CheckToken
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
    public String createUser(HttpServletRequest request, @RequestParam(value="userName")String userName,
                             @RequestParam(value="realName")String realName,
                             @RequestParam(value="pwd")String pwd,
                             @RequestParam(value="headImage", required = false, defaultValue = "http://www.p5w.net/images16/p5w_logo.png")String headImage,
                             @RequestParam(value = "idfa", required = false) String idfa,
                             @RequestParam(value = "positionIds", required = false) Long[] positionIds) throws BizException{
        String userID = getCurrentUserId(request);
        Integer a = userBiz.queryUserName(userName);
        if(a>0){
            return ApiResponse.returnFail(ErrorCodeEnum.ERROR_USERNAME_RE.getType(),ErrorCodeEnum.ERROR_USERNAME_RE.getMessage());
        }
        userBiz.createUser(userID,userName,pwd,headImage,realName, idfa, positionIds);
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
    public String updateUser(HttpServletRequest request,
                             @RequestParam("userId") String userId,
                             @RequestParam(value = "realName",required = false) String realName,
                             @RequestParam(value = "headImage",required = false) String headImage,
                             @RequestParam(value = "pwd",required = false) String pwd,
                             @RequestParam(value = "idfa", required = false) String idfa){
        String userID = getCurrentUserId(request);
        if(!userId.equals(userID)){
            return ApiResponse.returnFail(ErrorCodeEnum.ERROR_NO_PERMISSION.getType(),ErrorCodeEnum.ERROR_NO_PERMISSION.getMessage());
        }
        userBiz.updateUser(userID, userId, realName, headImage, pwd, idfa, null);
        return ApiResponse.returnSuccess();
    }

    @CheckToken
    @CheckAuth( name = "user:update" )
    @RequestMapping(value = "/updateUser2",method = RequestMethod.POST)
    public String updateUser2(HttpServletRequest request,
                              @RequestParam("userId") String userId,
                              @RequestParam(value = "realName",required = false) String realName,
                              @RequestParam(value = "headImage",required = false) String headImage,
                              @RequestParam(value = "pwd",required = false) String pwd,
                              @RequestParam(value = "idfa", required = false) String idfa,
                              @RequestParam(value = "userName", required = false) String userName){
        String userID = getCurrentUserId(request);
        userBiz.updateUser(userID, userId, realName, headImage, pwd, idfa, userName);
        return ApiResponse.returnSuccess();
    }

    @CheckToken
    @CheckAuth( name = "user:read" )
    @RequestMapping(value = "/detail",method = RequestMethod.GET)
    public String updateUser2(@RequestParam("userId") String userId){
        UserBean userBean = userBiz.getUserBean(userId);
        return ApiResponse.returnSuccess(userBean);
    }

    /**
     * 随机生成12位密码
     * @return
     */
    @CheckToken
    @RequestMapping(value = "/randomPwd",method = RequestMethod.GET)
    public String randomPwd(){
        Map<String ,Object> map = new HashMap();
        map.put("pwd", EncryptUtil.randomPwd(12));
        return ApiResponse.returnSuccess(map);
    }



}
