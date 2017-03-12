package com.cn.cms.contants;

import com.alibaba.fastjson.serializer.SerializeConfig;
import com.cn.cms.enums.*;
import com.cn.cms.enums.serializer.JSONEnumSerializer;
import com.cn.cms.utils.PropertyManager;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 所有静态类的变量定义。都在这个类里
 * Created by 华盛信息科技有限公司(HS) on 16/11/15.
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

    //----app端内容

    public static final String APP_COOKIE_USER_ID = "APP_QUANJING_USER_ID";

    public static final String APP_COOKIE_USER_TOKEN = "APP_QUANJING_USER_TOKEN";

    public static final String APP_COOKIE_TIME = "APP_QUANJING_TIME";

    public static final String APP_COOKIE_USER_KEY = "APP_QUANJING_USER_KEY";

    public static final String APP_COOKIE_REAL_NAME = "APP_QUANJING_NAME";

    public static final String APP_COOKIE_TT = "APP_QUANJING_TT";

    public static final String APP_COOKIE_DEVICE_IDFA = "APP_DEVICE_IDFA";

    public static final String APP_COOKIE_DEVICE_VERSION = "APP_DEVICE_VERSION";

    public static final String APP_COOKIE_DEVICE_INFO = "APP_DEVICE_INFO";

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

    public static final String ERROR_VIDEO = "视频上传失败!";

    public static final String ERROR_VIDEO_SIZE_0 = "视频不可以为0";

    public static final String ERROR_TEMPLATE_NOT_FOUND = "找不到频道、栏目对应的模版";

    public static final String ERROR_CHANNEL_NOT_FOUND = "找不到新闻对应的频道";

    public static final String ERROR_NEWS_NOT_FOUND = "找不到此篇新闻";

    public static final String ERROR_NEWS_CAN_NOT_RESCIND = "当前新闻不在发布状态，无法撤销";

    public static final String ERROR_NEWS_NOT_NEED_RECOVER = "此新闻已被恢复";

    public static final String ERROR_TOPIC_NOT_FOUND = "找不到此模版";

    public static final String ERROR_TEMPLATE_PATH_FILENAME_DUP = "模版目录或文件名已存在";

    public static final String getTimeParseErrorYYYYMMDD(){
        return ERROR_TIME_PARSE.concat(YYYY_MM_DD);
    }

    //----自定义错误码

    //----自定义成功码
    public static final String SUCCESS_LOGIN = "登录成功! ";
    //----自定义成功码

    public static final int DEFAULT_SECONDS = 24*60*60;

    public static final int BAIDU_DATA_SECONDS = 20*60;

    public static final String WATERMARK_TEXT_EN = "© 全景网";
    public static final String WATERMARK_TEXT_URL = "www.p5w.net";

    /**
     * 全景网资源文件名前缀
     */
    public static final String QUANJING_RESOURCE_FILENAME = "QJ_";

    public static final String FILE_PATH_SP = "/";

    public static final String CMS_OPERATION_USER_ID = "100000000000000001";

    public static final int CMS_NUM = 300;

    public static final String FRAGMENT_REGEX = "\\{#([^#][^\\}]+)#\\}";

    public static final String FRAGMENT_ALL_REGEX = "(.*)";


    public static final String YYYY_MM_DD = "yyyy-MM-dd";

    public static final String YYYY_MM_DD_HH_MM = "yyyy-MM-dd HH:mm";

    public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";


    public static final String UNDER_LINE = "_";

    public static final String CONNECT_LINE = "-";


    public static final String ESSEARCH_JOB_LIST = "ESSEARCH_JOB_LIST_KEY";

    public static final SerializeConfig config = new SerializeConfig();

    static {
        config.put(AuthEnum.class, new JSONEnumSerializer());
        config.put(AutoPublishEnum.class, new JSONEnumSerializer());
        config.put(BuildModeEnum.class, new JSONEnumSerializer());
        config.put(CommonMessageSourceEnum.class, new JSONEnumSerializer());
        config.put(CompressEnum.class, new JSONEnumSerializer());
        config.put(CompressModeEnum.class, new JSONEnumSerializer());
        config.put(DelTagEnum.class, new JSONEnumSerializer());
        config.put(EncodedEnum.class, new JSONEnumSerializer());
        config.put(ErrorCodeEnum.class, new JSONEnumSerializer());
        config.put(JobEnum.class, new JSONEnumSerializer());
        config.put(MQQueueKeyEnum.class, new JSONEnumSerializer());
        config.put(PermissionTypeEnum.class, new JSONEnumSerializer());
        config.put(PlatformEnum.class, new JSONEnumSerializer());
        config.put(PublishEnum.class, new JSONEnumSerializer());
        config.put(RegexNumEnum.class, new JSONEnumSerializer());
        config.put(RelationTypeEnum.class, new JSONEnumSerializer());
        config.put(ShowFlagEnum.class, new JSONEnumSerializer());
        config.put(TAGDetailTypeEnum.class, new JSONEnumSerializer());
        config.put(TAGListTypeEnum.class, new JSONEnumSerializer());
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

    public static final String TEMPLATE_KEY_CHANNELID = "channelId";

    public static final String TEMPLATE_KEY_PUBLISH_JOB_TYPE = "publishJobType";

    public static final String TEMPLATE_KEY_COLUMN = "column";

    public static final int TEMPLATE_SIZE = 100;

    public static final int TEMPLATE_COUNT = 100;

    public static final String TEMPLATE_LIST = "list_";

    public static final String TEMPLATE_DETAIL = "detail_";

    public static final String TEMPLATE_DETAIL_DESCRIPTION = "[预模版生成模版]";

    public static final Integer SORT_DETAIL_NUM = 1000;

    public static String[] CONDITION_FIELD = new String[]{"title","title.pinyin","subTitle","keyword","description","content","recommendTitle","recommendDescription"};

    public static String[] FIELDS_SEARCH_FIELD = new String[]{"field1","field2","field3","field4","field5"};

    public static String FIELD_AUTHOR = "author";

    public static String FIELD_SOURCE = "source";

    public static String FIELD_CHANNELID = "channelId";

    public static String FIELD_COLUMNID = "columnId";

    public static String FIELD_PLATFORM = "platform";

    public static String FIELD_CREATE_TIME = "createTime";

    public static String ES_INDEX = "cmsindex";

    public static String REGEX_IMG = "<(img|IMG)[^>]*(src|SRC)=['\"]{0,1}([^\"'\\s]*)['\"]{0,1}[^>]*>";

    public static String REGEX_STOCK = "<(a|A)[^>]*(stkcode|STKCODE)=['\"]{0,1}([^\"']*)['\"]{0,1}[^>]*>";

    public static String REGEX_SPLIT_STOCK="[,，]";

    public static String REGEX_SPLIT = "[,，\\s]";

    public static String REGEX_SPLIT_HTML_CONTENT = "(<[^>]*>|&lt;|&gt;|&quot;|&amp;|&nbsp;)";

    /**
     * 开关 1 是开启。0是关闭
     */
    public static final Integer rsyncRoot = Integer.parseInt(PropertyManager.getRB("config", "rsync.root"));

    public static final int RSYNC_ON = 1;

    /**
     * 发布文件名
     */
    public static final String rsyncPublishFile = PropertyManager.getRB("config", "rsync.publish.shFileName");

    /**
     * 撤销文件名
     */
    public static final String rsyncRescindFile = PropertyManager.getRB("config", "rsync.rescind.shFileName");

}
