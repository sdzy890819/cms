package com.cn.cms.contants;

/**
 * 所有Redis的Key保存在这里
 * Created by zhangyang on 16/11/15.
 */
public class RedisKeyContants {


    public static final String REDIS_TOKEN_KEY = "CMS_TOKEN_KEY_";

    public static final String REDIS_POSITION_PERMISSION_KEY = "CMS_PERMISSION_USERID_";

    public static final String REDIS_KEY_SP = "_";

    public static final String REDIS_RECORD_KEY = "CMS_RECORD_KEY";

    public static String getToken(String userId){
        return REDIS_TOKEN_KEY.concat(userId);
    }

    public static String getPermission(String userId){
        return REDIS_POSITION_PERMISSION_KEY.concat(userId);
    }
}
