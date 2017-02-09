package com.cn.cms.biz;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cn.cms.bo.UserBean;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PlatformEnum;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.middleware.bo.UserSearch;
import com.cn.cms.po.User;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.CookieUtil;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * 组装包。
 * Created by zhangyang on 16/11/18.
 */
@Component
public class UserBiz extends BaseBiz{

    @Resource
    private UserService userService;

    @Resource
    private PermissionBiz permissionBiz;

    @Resource
    private JedisClient jedisClient;



    public UserBean test(){
        return null;
    }


    public List<UserBean> searchUsers(UserSearch userSearch, Page page){
        Integer count = userService.searchUsersCount(userSearch);
        page.setCount(count);
        if(page.isQuery()){
            List<User> users =  userService.searchUsers(userSearch, page);
            return toBean(users);
        }
        return null;
    }


    /**
     * 分页获取用户列表
     * @param page
     * @return
     */
    public List<UserBean> listUser(Page page){
        Integer count = userService.queryUserCount();
        page.setCount(count);
        List<User>  userList = null;
        if(page.isQuery()){
            userList = userService.queryUserList(page);
        }
        List<UserBean> userBeanList = toBean(userList);
        return userBeanList;
    }

    /**
     * 根据UserId获取用户基础信息
     * @param userId
     * @return
     */
    public UserBean getUserBean(String userId){
        User user = this.getUserCache(userId);
        UserBean userBean = new UserBean(user);
        return userBean;
    }

    /**
     * 根据UserId获取用户基础信息
     * @param userIds
     * @return
     */
    public List<UserBean> getUserBean(List<String> userIds){
        return toBean(getUserCacheList(userIds));
    }

    /**
     * 返回Map
     * @param userIds
     * @return
     */
    public Map<String, UserBean> getUserBeanMap(List<String> userIds){
        return toBeanMap(getUserCacheList(userIds));
    }


    /**
     * 缓存中获取用户信息
     * @param userIds
     * @return
     */
    public List<User> getUserCacheList(List<String> userIds){
        Map<String, String> map = new HashMap<>();
        for(int i=0;i<userIds.size();i++){
            if(StringUtils.isNotBlank(userIds.get(i))) {
                map.put(userIds.get(i), RedisKeyContants.getUserKey(userIds.get(i)));
            }
        }
        List<String> list = jedisClient.mget(map.values().toArray(new String[map.size()]));
        List<User> result = new ArrayList<>();
        for(int i=0; i <list.size();i++){
            if(StringUtils.isNotBlank(list.get(i))) {
                result.add(JSONObject.parseObject(list.get(i), User.class));
            }
        }
        return result;
    }

    public User getUserCache(String userId){
        String str = jedisClient.get(RedisKeyContants.getUserKey(userId));
        if(StringUtils.isNotBlank(str)){
            return JSONObject.parseObject(str, User.class);
        }
        return null;
    }

    /**
     * 创建用户。
     * @param userName
     * @param pwd
     * @param headImage
     * @param realName
     */
    public void createUser(String lastModifyUserId,String userName,String pwd,String headImage,String realName, String idfa){
        User user = new User();
        user.setUserName(userName);
        user.setUserId(EncryptUtil.buildUserId());
        user.setPwd(EncryptUtil.encryptPwd(user.getUserName(),pwd));
        user.setHeadImage(headImage);
        user.setRealName(realName);
        user.setLastModifyUserId(lastModifyUserId);
        user.setIdfa(idfa);
        userService.createUser(user);
        refreshUserCache(user);
    }

    /**
     * refresh用户缓存
     * @param user
     */
    public void refreshUserCache(User user){
        this.jedisClient.set(RedisKeyContants.getUserKey(user.getUserId()), JSONObject.toJSONString(user));
    }

    public void delUserCache(String userId){
        this.jedisClient.del(RedisKeyContants.getUserKey(userId));
    }

    /**
     * 用户名是否存在。
     * @param userName
     * @return
     */
    public Integer queryUserName(String userName){
        return userService.queryUserName(userName);
    }

    /**
     * 逻辑删除用户
     * @param lastModifyUserId
     * @param userId
     */
    public void delUser(String lastModifyUserId, String userId){
        userService.delUser(lastModifyUserId, userId);
        delUserCache(userId);
    }

    /**
     * 修改用户信息
     * @param lastModifyUserId
     * @param userId
     * @param realName
     * @param headImage
     * @param pwd
     */
    public void updateUser(String lastModifyUserId, String userId, String realName, String headImage, String pwd, String idfa){
        User user = new User();
        user.setUserId(userId);
        user.setLastModifyUserId(lastModifyUserId);
        user.setRealName(realName);
        user.setHeadImage(headImage);
        user.setIdfa(idfa);
        User old = userService.findUser(userId);
        user.setPwd(EncryptUtil.encryptPwd(old.getUserName(),pwd));
        userService.updateUser(user);
        refreshUserCache(user);
    }

    /**
     * 根据用户名和密码查询是否有此用户。
     * @param userName
     * @param pwd
     * @return
     */
    public User findUserForLogin(String userName,String pwd){
        User user = userService.findUserName(userName);
        return user;
    }

    /**
     * 清理Cookie信息
     * @param request
     * @param response
     */
    public void clearAppCookie(HttpServletRequest request, HttpServletResponse response){
        String userId = CookieUtil.getCookieVal(request,StaticContants.APP_COOKIE_USER_ID);
        CookieUtil.delCookieVal(request,response,StaticContants.APP_COOKIE_USER_ID);
        CookieUtil.delCookieVal(request,response,StaticContants.APP_COOKIE_USER_TOKEN);
        CookieUtil.delCookieVal(request,response,StaticContants.APP_COOKIE_USER_KEY);
        CookieUtil.delCookieVal(request,response,StaticContants.APP_COOKIE_TIME);
        CookieUtil.delCookieVal(request,response,StaticContants.APP_COOKIE_REAL_NAME);
        jedisClient.del(RedisKeyContants.getAppToken(userId));
        permissionBiz.delAppPermissionRedis(userId);
    }

    /**
     * 清理Cookie信息
     * @param request
     * @param response
     */
    public void clearCookie(HttpServletRequest request, HttpServletResponse response){
        String userId = CookieUtil.getCookieVal(request,StaticContants.COOKIE_USER_ID);
        CookieUtil.delCookieVal(request,response,StaticContants.COOKIE_USER_ID);
        CookieUtil.delCookieVal(request,response,StaticContants.COOKIE_USER_TOKEN);
        CookieUtil.delCookieVal(request,response,StaticContants.COOKIE_USER_KEY);
        CookieUtil.delCookieVal(request,response,StaticContants.COOKIE_TIME);
        CookieUtil.delCookieVal(request,response,StaticContants.COOKIE_REAL_NAME);
        jedisClient.del(RedisKeyContants.getToken(userId));
        permissionBiz.delPermissionRedis(userId);

    }


    /**
     * 检测用户登录状态
     * @param request
     * @return
     */
    public boolean checkUserToken(HttpServletRequest request){
        String userId = CookieUtil.getCookieVal(request,StaticContants.COOKIE_USER_ID);
        String userKey = CookieUtil.getCookieVal(request,StaticContants.COOKIE_USER_KEY);
        String time = CookieUtil.getCookieVal(request,StaticContants.COOKIE_TIME);
        String token = CookieUtil.getCookieVal(request,StaticContants.COOKIE_USER_TOKEN);
        if(StringUtils.isNotBlank(token) && StringUtils.isNotBlank(time) && StringUtils.isNotBlank(userId) && StringUtils.isNotBlank(userKey)){
            String currentToken = EncryptUtil.token(userId, userKey, time);
            String redisToken= jedisClient.get(RedisKeyContants.getToken(userId));
            if(StringUtils.isNotBlank(currentToken) && StringUtils.isNotBlank(redisToken) &&
                    currentToken.equals(redisToken) && currentToken.equals(token)){
                return true;
            }
        }
        return false;
    }

    /**
     * 检测用户登录状态
     * @param request
     * @return
     */
    public boolean checkAppUserToken(HttpServletRequest request){
        String userId = CookieUtil.getCookieVal(request,StaticContants.APP_COOKIE_USER_ID);
        String userKey = CookieUtil.getCookieVal(request,StaticContants.APP_COOKIE_USER_KEY);
        String time = CookieUtil.getCookieVal(request,StaticContants.APP_COOKIE_TIME);
        String token = CookieUtil.getCookieVal(request,StaticContants.APP_COOKIE_USER_TOKEN);
        String idfa = CookieUtil.getCookieVal(request, StaticContants.APP_COOKIE_DEVICE_IDFA);
        if(StringUtils.isNotBlank(token) && StringUtils.isNotBlank(time) &&
                StringUtils.isNotBlank(userId) && StringUtils.isNotBlank(userKey)){
            String currentToken = EncryptUtil.token(userId, userKey, time);
            String redisToken= jedisClient.get(RedisKeyContants.getAppToken(userId));
            if(StringUtils.isNotBlank(currentToken) && StringUtils.isNotBlank(redisToken) &&
                    currentToken.equals(redisToken) && currentToken.equals(token)){
                User user = this.getUserCache(userId);
                if(user.getIdfa().indexOf(idfa) > -1) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * WEB
     * 检查用户是否登录。如果登录后则写入Token
     * @param response
     * @param userName
     * @param pwd
     * @return
     */
    public String checkUserAndSetCookie(HttpServletResponse response, String userName, String pwd){
        User user = userService.findUserName(userName);
        pwd = EncryptUtil.encryptPwd(userName,pwd);
        if( user != null ){
            if(user.getPwd().equals(pwd)){
                setCookie(response,user);
                refreshUserCache(user);
                return ApiResponse.returnSuccess(StaticContants.SUCCESS_LOGIN);
            }else{
                return ApiResponse.returnFail(StaticContants.ERROR_PWD);
            }
        }else{
            return ApiResponse.returnFail(StaticContants.ERROR_NO_USER);
        }
    }

    public String checkUserAndSetCookieForApp(HttpServletResponse response, String userName, String pwd,
                                              String time, String tt, String idfa) throws IOException {
        User user = userService.findUserName(userName);
        String tmp = new String(EncryptUtil.decode64(tt), StaticContants.UTF8);
        String reEncryptCode = tmp.substring(0, tmp.length() - 32);
        String rekey = tmp.substring(tmp.length() - 32);
        String rett = EncryptUtil.decryptAEC(rekey, reEncryptCode);
        pwd = EncryptUtil.decryptAEC(rett, pwd);
        pwd = pwd.replace(userName ,"");
        pwd = pwd.replace(time, "");
        pwd = EncryptUtil.encryptPwd(userName, pwd);
        if( user != null ){
            if(user.getPwd().equals(pwd) && StringUtils.isNotBlank(user.getIdfa()) &&
                    StringUtils.isNotBlank(idfa) && user.getIdfa().indexOf(idfa) > -1){
                setAppCookie(response,user);
                refreshUserCache(user);
                return ApiResponse.returnSuccess(StaticContants.SUCCESS_LOGIN);
            }else{
                return ApiResponse.returnFail(StaticContants.ERROR_PWD);
            }
        }else{
            return ApiResponse.returnFail(StaticContants.ERROR_NO_USER);
        }
    }

    public void setAppCookie(HttpServletResponse response, User user){
        String time = String.valueOf(new Date().getTime());
        String key = EncryptUtil.token(user.getUserName(),user.getPwd(),user.getRealName(),time);
        String token = EncryptUtil.token(user.getUserId(),key,time);
        CookieUtil.addCookie(response,StaticContants.APP_COOKIE_USER_ID,user.getUserId(),0);
        CookieUtil.addCookie(response,StaticContants.APP_COOKIE_TIME,String.valueOf(time),0);
        CookieUtil.addCookie(response,StaticContants.APP_COOKIE_USER_KEY,key,0);
        CookieUtil.addCookie(response,StaticContants.APP_COOKIE_USER_TOKEN,token,0);
        CookieUtil.addCookie(response,StaticContants.APP_COOKIE_REAL_NAME,user.getRealName(),0);
        jedisClient.set(RedisKeyContants.getAppToken(user.getUserId()), token, StaticContants.DEFAULT_SECONDS);
        permissionBiz.setPermissionRedis(user.getUserId(), PlatformEnum.APP);
    }

    /**
     * 设置Cookie && 设置Redis存储
     * 使用方式生成KEY
     * 按照USERID、KEY、time生成token
     * @param response
     * @param user
     */
    public void setCookie(HttpServletResponse response, User user){
        String time = String.valueOf(new Date().getTime());
        String key = EncryptUtil.token(user.getUserName(),user.getPwd(),user.getRealName(),time);
        String token = EncryptUtil.token(user.getUserId(),key,time);
        CookieUtil.addCookie(response,StaticContants.COOKIE_USER_ID,user.getUserId(),0);
        CookieUtil.addCookie(response,StaticContants.COOKIE_TIME,String.valueOf(time),0);
        CookieUtil.addCookie(response,StaticContants.COOKIE_USER_KEY,key,0);
        CookieUtil.addCookie(response,StaticContants.COOKIE_USER_TOKEN,token,0);
        CookieUtil.addCookie(response,StaticContants.COOKIE_REAL_NAME,user.getRealName(),0);
        jedisClient.set(RedisKeyContants.getToken(user.getUserId()), token, StaticContants.DEFAULT_SECONDS);
        permissionBiz.setPermissionRedis(user.getUserId(), PlatformEnum.CMS);
    }

    /**
     * PO 转 BO
     * @param users
     * @return
     */
    public List<UserBean> toBean(List<User> users){
        List<UserBean> userBeanList = new ArrayList<UserBean>();
        if(users!=null && users.size()>0) {
            for (int i = 0; i < users.size(); i++) {
                UserBean userBean = new UserBean(users.get(i));
                userBeanList.add(userBean);
            }
        }
        return userBeanList;
    }


    public Map<String, UserBean> toBeanMap(List<User> users){
        Map<String, UserBean> map = new HashMap<String, UserBean>();
        if(users!=null && users.size()>0) {
            for (int i = 0; i < users.size(); i++) {
                UserBean userBean = new UserBean(users.get(i));
                map.put(userBean.getUserId(),userBean);
            }
        }
        return map;
    }



}
