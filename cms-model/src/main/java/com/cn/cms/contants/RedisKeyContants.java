package com.cn.cms.contants;

/**
 * 所有Redis的Key保存在这里
 * Created by zhangyang on 16/11/15.
 */
public class RedisKeyContants {


    public static final String REDIS_TOKEN_KEY = "CMS_TOKEN_KEY_";

    public static final String REDIS_POSITION_PERMISSION_KEY = "CMS_PERMISSION_USERID_";

    public static final String REDIS_POSITION_PERMISSION_MENU_KEY = "CMS_PERMISSION_MENU_USERID_";

    public static final String REDIS_POSITION_PERMISSION_BUTTON_KEY = "CMS_PERMISSION_BUTTON_USERID_";

    public static final String REDIS_PARENT_KEY = "_PARENT_";

    public static final String REDIS_RECORD_KEY = "CMS_RECORD_KEY";

    public static final String REDIS_CHANNEL_DETAIL = "CMS_CHANNEL_DETAIL_";

    public static final String REDIS_USER_KEY = "CMS_USER_";

    public static final String REDIS_CATEGORY_KEY = "CMS_CATEGORY_KEY";

    public static final String REDIS_CHANNEL_LIST_KEY = "CMS_CHANNEL_LIST_KEY";

    public static final String REDIS_LOCK_KEY = "CMS_LOCK_";

    public static String getRedisLockKey(String key){
        return REDIS_LOCK_KEY.concat(key);
    }

    public static String getUserKey(String userId){
        return REDIS_USER_KEY.concat(userId);
    }

    public static String getToken(String userId){
        return REDIS_TOKEN_KEY.concat(userId);
    }

    public static String getPermission(String userId){
        return REDIS_POSITION_PERMISSION_KEY.concat(userId);
    }

    public static String getMenuPermission(String userId){
        return REDIS_POSITION_PERMISSION_MENU_KEY.concat(userId);
    }

    public static String getButtonPermission(String userId){
        return REDIS_POSITION_PERMISSION_BUTTON_KEY.concat(userId);
    }

    public static String getButtonParentPermission(String userId ,Long parentId){
        return REDIS_POSITION_PERMISSION_BUTTON_KEY.concat(userId).concat(REDIS_PARENT_KEY).concat(String.valueOf(parentId));
    }

    public static String getRedisChannelDetailKey(Long id){
        return REDIS_CHANNEL_DETAIL.concat(String.valueOf(id));
    }
}
