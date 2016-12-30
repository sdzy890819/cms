package com.cn.cms.contants;

import com.alibaba.fastjson.serializer.SerializeConfig;
import com.cn.cms.enums.*;
import com.cn.cms.enums.serializer.JSONEnumSerializer;

/**
 * 所有静态类的变量定义。都在这个类里
 * Created by zhangyang on 16/11/15.
 */
public class StaticContants {


    public static final String HEADER_CONTENT_TYPE = "Content-Type";

    public static final String JSON_UTF8 = "application/json;charset=UTF-8";

    public static final String DOWN_LOAD_CONTENT_TYPE = "multipart/form-data";

    public static final String HEADER_CONTENT_DISPOSITION = "Content-Disposition";

    public static final String HEADER_ATTACHMENT = "attachment;fileName=";

    public static String getHEADER_ATTACHMENT(String fileName){
        return  HEADER_ATTACHMENT.concat(fileName);
    }

    public static final String UTF8 = "UTF-8";

    //---默认分页数  start
    public static final int PAGE_SIZE = 20 ;
    public static final int PAGE = 1 ;

    //---默认分页书  end

    public static final String COOKIE_USER_ID = "CMS_QUANJING_USER_ID";

    public static final String COOKIE_USER_TOKEN = "CMS_QUANJING_USER_TOKEN";

    public static final String COOKIE_TIME = "CMS_QUANJING_TIME";

    public static final String COOKIE_USER_KEY = "CMS_QUANJING_USER_KEY";

    public static final String COOKIE_REAL_NAME = "CMS_QUANJING_NAME";

    //----自定义错误码

    public static final String ERROR_NO_POSITION = "找不到此用户组! ";

    public static final String ERROR_PWD = "密码错误! ";

    public static final String ERROR_NO_USER = "找不到此用户! ";

    public static final String ERROR_POSITION_RE = "用户组已经存在! ";

    public static final String ERROR_PERMISSION_NOT_FOUND = "找不到此权限! ";

    public static final String ERROR_FRAGMENT_NOT_FOUND = "找不到此碎片!";

    public static final String ERROR_FRAGMENT_LENGTH = "模版编辑参数不对称!";

    public static final String ERROR_FRAGMENT_MODEL = "碎片模版错误。";

    public static final String ERROR_TIME_PARSE = "时间格式不对，格式为：";

    public static final String ERROR_TEMPLATE_UPLOAD_OPEN = "文件上传-打开文件流失败!" ;

    public static final String ERROR_TEMPLATE_UPLOAD_WRITE = "文件上传-写入失败!" ;

    public static final String ERROR_TEMPLATE_DOWNLOAD_NOT_FOUND = "文件下载-找不到文件!";

    public static final String ERROR_TEMPLATE_DOWNLOAD_FILE_EX = "文件下载-文件读取异常!";

    public static final String ERROR_TEMPLATE_DOWNLOAD = "文件下载失败!";

    public static final String ERROR_DATE_PARSE = "时间格式不对.";

    public static final String ERROR_TEMPLATE_NOT_FOUND = "找不到频道、栏目对应的模版";

    public static final String ERROR_CHANNEL_NOT_FOUND = "找不到新闻对应的频道";

    public static final String ERROR_NEWS_NOT_FOUND = "找不到此篇新闻";

    public static final String ERROR_TOPIC_NOT_FOUND = "找不到此模版";

    public static final String getTimeParseErrorYYYYMMDD(){
        return ERROR_TIME_PARSE.concat(YYYY_MM_DD);
    }

    //----自定义错误码

    //----自定义成功码
    public static final String SUCCESS_LOGIN = "登录成功! ";
    //----自定义成功码

    public static final int DEFAULT_SECONDS = 24*60*60;

    public static final String WATERMARK_TEXT = "全景网";

    /**
     * 全景网资源文件名前缀
     */
    public static final String QUANJING_RESOURCE_FILENAME = "QJ_";

    public static final String FILE_PATH_SP = "/";

    public static final String CMS_OPERATION_USER_ID = "100000000000000001";

    public static final int CMS_NUM = 300;

    public static final String FRAGMENT_REGEX = "\\{#([^#][^\\}]+)#\\}";

    public static final String FRAGMENT_ALL_REGEX = "(.*?)";


    public static final String YYYY_MM_DD = "yyyy-MM-dd";

    public static final String YYYY_MM_DD_HH_MM = "yyyy-MM-dd HH:mm";


    public static final String UNDER_LINE = "_";


    public static final SerializeConfig config = new SerializeConfig();

    static {
        config.put(AuthEnum.class, new JSONEnumSerializer());
        config.put(CompressEnum.class, new JSONEnumSerializer());
        config.put(CompressModeEnum.class, new JSONEnumSerializer());
        config.put(DelTagEnum.class, new JSONEnumSerializer());
        config.put(EncodedEnum.class, new JSONEnumSerializer());
        config.put(ErrorCodeEnum.class, new JSONEnumSerializer());
        config.put(JobEnum.class, new JSONEnumSerializer());
        config.put(PermissionTypeEnum.class, new JSONEnumSerializer());
        config.put(PlatformEnum.class, new JSONEnumSerializer());
        config.put(RegexNumEnum.class, new JSONEnumSerializer());
        config.put(RelationTypeEnum.class, new JSONEnumSerializer());
        config.put(ShowFlagEnum.class, new JSONEnumSerializer());
        config.put(TemplateClassifyEnum.class, new JSONEnumSerializer());
        config.put(WatermarkEnum.class, new JSONEnumSerializer());

    }

    public static final String TAG_LIST = "TAGLIST";

    public static final String TAG_DETAIL = "TAGDETAIL";

    public static final String PUBLISH_TMP_TEMPLATE_NAME = "text parse";

    public static final String HTML_SUFFIX = ".shtml";


    public static final String TEMPLATE_KEY_PAGE = "page";

    public static final String TEMPLATE_KEY_DATA = "data";

    public static final String TEMPLATE_KEY_TEMPLATE = "template";

    public static final int TEMPLATE_SIZE = 100;

    public static final int TEMPLATE_COUNT = 100;

}
