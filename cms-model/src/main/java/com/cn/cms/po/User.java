package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 用户PO
 * Created by ADMIN on 16/11/15.
 */
@Getter
@Setter
public class User extends Base{

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
     * 密码串
     */
    private String pwd;

    /**
     * 用户ID 18位串
     */
    private String userId;

    /**
     * IDFA。如果IDFA为空，则使用MAC地址。
     */
    private String idfa;


}
