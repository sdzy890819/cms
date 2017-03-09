package com.cn.cms.contants;

import com.cn.cms.utils.StringUtils;

/**
 * 所有Redis的Key保存在这里
 * Created by 华盛信息科技有限公司(HS) on 16/11/15.
 */
public class RedisKeyContants {


    public static final String REDIS_TOKEN_KEY = "CMS_TOKEN_KEY_";

    public static final String REDIS_APP_TOKEN_KEY = "CMS_APP_TOKEN_KEY_";

    public static final String REDIS_POSITION_PERMISSION_KEY = "CMS_PERMISSION_USERID_";

    public static final String REDIS_APP_POSITION_PERMISSION_KEY = "CMS_APP_PERMISSION_USERID_";

    public static final String REDIS_POSITION_PERMISSION_MENU_KEY = "CMS_PERMISSION_MENU_USERID_";

    public static final String REDIS_APP_POSITION_PERMISSION_MENU_KEY = "CMS_APP_PERMISSION_MENU_USERID_";

    public static final String REDIS_POSITION_PERMISSION_BUTTON_KEY = "CMS_PERMISSION_BUTTON_USERID_";

    public static final String REDIS_PARENT_KEY = "_PARENT_";

    public static final String REDIS_RECORD_KEY = "CMS_RECORD_KEY";

    public static final String REDIS_CHANNEL_DETAIL = "CMS_CHANNEL_DETAIL_";

    public static final String REDIS_USER_KEY = "CMS_USER_";

    public static final String REDIS_CATEGORY_KEY = "CMS_CATEGORY_KEY";

    public static final String REDIS_CHANNEL_LIST_KEY = "CMS_CHANNEL_LIST_KEY";

    public static final String REDIS_LOCK_KEY = "CMS_LOCK_";

    public static final String REDIS_BAIDU_SITE_KEY = "CMS_BAIDU_SITE";

    public static final String REDIS_BAIDU_TONGJI_DATA_KEY = "CMS_BAIDU_INDEX_TONGJI";

    public static final String REDIS_NEWCOLUMN_ID = "CMS_NEWCOLUMN_";

    public static final String REDIS_ADD_NEW_PREVIOUS_COLUMN_INFO = "CMS_PREVIOUS_COLUMN_INFO_";

    /**
     * 获取上一次发布新闻选择的频道栏目。
     * @param userId
     * @return
     */
    public static String getRedisAddNewPreviousColumnInfo(String userId){
        return REDIS_ADD_NEW_PREVIOUS_COLUMN_INFO + userId;
    }

    public static String getRedisNewcolumnId(Long columnId){
        return REDIS_NEWCOLUMN_ID.concat(String.valueOf(columnId));
    }

    public static String getRedisLockKey(String key){
        return REDIS_LOCK_KEY + key;
    }

    public static String getUserKey(String userId){
        return REDIS_USER_KEY + userId;
    }

    public static String getToken(String userId){
        return REDIS_TOKEN_KEY + userId;
    }

    public static String getAppToken(String userId) {
        return REDIS_APP_TOKEN_KEY + userId;
    }

    public static String getPermission(String userId){
        return REDIS_POSITION_PERMISSION_KEY + userId;
    }

    public static String getAppPermission(String userId){
        return REDIS_APP_POSITION_PERMISSION_KEY + userId;
    }

    public static String getMenuPermission(String userId){
        return REDIS_POSITION_PERMISSION_MENU_KEY +  userId;
    }

    public static String getAppMenuPermission(String userId){
        return REDIS_APP_POSITION_PERMISSION_MENU_KEY +  userId;
    }

    public static String getButtonPermission(String userId){
        return REDIS_POSITION_PERMISSION_BUTTON_KEY + userId ;
    }

    public static String getButtonParentPermission(String userId ,Long parentId){
        return REDIS_POSITION_PERMISSION_BUTTON_KEY  + userId + REDIS_PARENT_KEY + String.valueOf(parentId);
    }

    public static String getRedisChannelDetailKey(Long id){
        return REDIS_CHANNEL_DETAIL + String.valueOf(id);
    }
}
