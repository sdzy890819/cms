package com.cn.cms.bo;

import com.cn.cms.po.User;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 16/11/18.
 */
@Getter
@Setter
public class UserBean {

    protected Long id ;

    /**
     * 头像
     */
    private String headImage;

    /**
     * 真实名字
     */
    private String realName;


    /**
     * 用户ID 18位串
     */
    private String userId;


    /**
     * 最后修改人ID
     */
    protected String lastModifyUserId;

    public UserBean(User user){
        if(user!=null) {
            this.id = user.getId();
            this.headImage = user.getHeadImage();
            this.realName = user.getRealName();
            this.userId = user.getUserId();
            this.lastModifyUserId = user.getLastModifyUserId();
        }
    }

}