package com.cn.cms.biz;

import com.cn.cms.bo.UserBean;
import com.cn.cms.po.User;
import com.cn.cms.service.UserService;
import com.sun.tools.javac.util.List;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 组装包。
 * Created by zhangyang on 16/11/18.
 */
@Component
public class UserBiz {

    @Resource
    private UserService userService;


    public UserBean test(){
        User user = userService.test();
        UserBean userBean = new UserBean();
        userBean.setHeadImages(user.getHeadImage());
        userBean.setUserName(user.getUserName());
        return userBean;
    }


    public List<User>

}
