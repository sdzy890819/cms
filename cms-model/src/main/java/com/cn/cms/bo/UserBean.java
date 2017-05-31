package com.cn.cms.bo;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.po.User;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by ADMIN on 16/11/18.
 */
@Getter
@Setter
public class UserBean {

    protected Long id ;

    /**
     * 用户名
     */
    private String userName;

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
     * idfa
     */
    private String idfa;


    /**
     * 最后修改人ID
     */
    protected String lastModifyUserId;


    /**
     * 创建时间 系统会自动默认当前时间为创建时间
     */
    protected Date createTime;

    /**
     * 创建人ID
     */
    protected String createUserId;

    /**
     * 创建人名称
     */
    protected String createUserName;

    /**
     * 最后修改人名称
     */
    protected String lastModifyUserName;

    /**
     * 修改时间－每次修改都会改变。Table内自动变更
     */
    protected Date updateTime;


    /**
     * 创建时间
     */
    protected String createTimeStr;

    /**
     * 修改时间
     */
    protected String updateTimeStr;


    public String getCreateTimeStr(){
        if(createTime!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(createTime);
        }
        return createTimeStr;
    }

    public String getUpdateTimeStr(){
        if(updateTime!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(updateTime);
        }
        return updateTimeStr;
    }


    public UserBean(User user){
        if(user!=null) {
            this.id = user.getId();
            this.userName = user.getUserName();
            this.headImage = user.getHeadImage();
            this.realName = user.getRealName();
            this.userId = user.getUserId();
            this.lastModifyUserId = user.getLastModifyUserId();
            this.idfa = user.getIdfa();
            this.createTime = user.getCreateTime();
            this.updateTime = user.getUpdateTime();
            this.createUserId = user.getCreateUserId();
        }
    }

}
