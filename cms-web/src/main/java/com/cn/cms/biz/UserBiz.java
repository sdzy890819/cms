package com.cn.cms.biz;

import com.cn.cms.bo.UserBean;
import com.cn.cms.po.User;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.EncryptUtil;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 组装包。
 * Created by zhangyang on 16/11/18.
 */
@Component
public class UserBiz extends BaseBiz{

    @Resource
    private UserService userService;


    public UserBean test(){
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
        if(count>0){
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
        User user = userService.findUser(userId);
        UserBean userBean = new UserBean(user);
        return userBean;
    }


    /**
     * 创建用户。
     * @param userName
     * @param pwd
     * @param headImage
     * @param realName
     */
    public void createUser(String lastModifyUserId,String userName,String pwd,String headImage,String realName){
        User user = new User();
        user.setUserName(userName);
        user.setUserId(EncryptUtil.buildUserId());
        user.setPwd(EncryptUtil.encryptPwd(user.getUserId(),pwd));
        user.setHeadImage(headImage);
        user.setRealName(realName);
        user.setLastModifyUserId(lastModifyUserId);
        userService.createUser(user);
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

}
