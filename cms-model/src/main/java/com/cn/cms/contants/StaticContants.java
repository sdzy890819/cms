package com.cn.cms.contants;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.cn.cms.enums.*;
import com.cn.cms.enums.serializer.JSONEnumSerializer;
import com.cn.cms.utils.PropertyManager;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 所有静态类的变量定义。都在这个类里
 * Created by ADMIN on 16/11/15.
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

    public static final String ERROR_NEWS_LIST_NOT_FOUND = "没有新闻被选择";

    public static final String ERROR_NEWS_CAN_NOT_RESCIND = "当前新闻不在发布状态，无法撤销";

    public static final String ERROR_NEWS_NOT_NEED_RECOVER = "此新闻已被恢复";

    public static final String ERROR_TOPIC_NOT_FOUND = "找不到此模版";

    public static final String ERROR_TEMPLATE_PATH_FILENAME_DUP = "模版文件已存在，模版文件位置：";

    public static final String ERROR_CHANNEL_NAME_EXIST = "频道已经存在!";

    public static final String ERROR_COLUMN_NAME_EXIST = "栏目已经存在!";

    public static final String ERROR_NEWSCOLUMN_NOT_FOUND = "新闻栏目找不到!";

    public static final String ERROR_CATEGORY_NAME_EXIST = "部门已经存在!";

    public static final String ERROR_NOT_PUBLISH_NEWS = "用户没有发布权限!";

    public static final String ERROR_BASE_CODE = "文件不可以为空";

    public static final String ERROR_KEY_API = "无访问权限";

    public static final String ERROR_URL_ERROR = "无访问的方法";

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

    public static final String CMS_SPIDER_USER_ID = "100000000000000010";

    public static final Map<String, String> CMSMAP = new HashMap<>();

    static {
        CMSMAP.put(CMS_OPERATION_USER_ID, CMS_OPERATION_USER_ID);
        CMSMAP.put(CMS_SPIDER_USER_ID, CMS_SPIDER_USER_ID);
    }

    public static final String CMS_INSIDE_USER_KEY = "CMS_INSIDE_USER_KEY";

    public static final int CMS_NUM = 100;

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
        config.put(PublishStatusEnum.class, new JSONEnumSerializer());
        config.put(TriggerTypeEnum.class, new JSONEnumSerializer());
        config.put(TemplateTypeEnum.class, new JSONEnumSerializer());

    }

    public static final String TAG_LIST = "TAGLIST";

    public static final String TAG_DETAIL = "TAGDETAIL";

    public static final String PUBLISH_TMP_TEMPLATE_NAME = "text parse";

    public static final String HTML_SUFFIX = ".shtml";


    public static final String TEMPLATE_KEY_PAGE = "pageNumber";

    public static final String TEMPLATE_KEY_DATA = "data";

    public static final String TEMPLATE_KEY_TEMPLATE = "template";

    public static final String TEMPLATE_TEST_TAG = "testTag";

    public static final String TEMPLATE_KEY_CHANNELID = "channelId";

    public static final String TEMPLATE_KEY_PUBLISH_JOB_TYPE = "publishJobType";

    public static final String TEMPLATE_KEY_COLUMN = "column";

    public static final String TEMPLATE_KEY_PAGE_DETAIL = "pageDetail";

    public static final String TEMPLATE_KEY_PAGE_LIST = "page";

    public static final String TEMPLATE_KEY_CURRENT_FILE_NAME = "currentFileName";

    public static final String TEMPLATE_KEY_CURRENT_FILE_SUFFIX = "currentFileSuffix";

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

    public static String REGEX_SPLIT_PAGE = "(_ueditor_page_break_tag_)+";

    public static String LOCALIZED_KEY = "4667ssvcGpEaAqLwQdDU2VIAorwBrbT06VrXBfE";

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

    /**
     * image.test
     */
    public static final Integer IMAGESON = Integer.parseInt(PropertyManager.getRB("config", "image.test"));

    /**
     *
     */
    public static final Integer RSYNC_TEMPLATE_ON = Integer.parseInt(PropertyManager.getRB("config", "rsync.template.root"));

    /**
     *
     */
    public static final String RSYNC_TEMPLATE_FILE = PropertyManager.getRB("config", "rsync.template.shFileName");

    public static final Map<String, Integer> mapping = new HashMap() {
        {
            this.put("config", Integer.valueOf(0));
            this.put("uploadimage", Integer.valueOf(1));
            this.put("uploadscrawl", Integer.valueOf(2));
            this.put("uploadvideo", Integer.valueOf(3));
            this.put("uploadfile", Integer.valueOf(4));
            this.put("catchimage", Integer.valueOf(5));
            this.put("listfile", Integer.valueOf(6));
            this.put("listimage", Integer.valueOf(7));
        }
    };

    public static final int CONFIG = 0;
    public static final int UPLOAD_IMAGE = 1;
    public static final int UPLOAD_SCRAWL = 2;
    public static final int UPLOAD_VIDEO = 3;
    public static final int UPLOAD_FILE = 4;
    public static final int CATCH_IMAGE = 5;
    public static final int LIST_FILE = 6;
    public static final int LIST_IMAGE = 7;



    public static JSONObject configObject = new JSONObject();
    static {
        /* 上传图片配置项 */
        configObject.put("imageActionName", "uploadimage");/* 执行上传图片的action名称 */
        configObject.put("imageFieldName", "upfile");/* 提交的图片表单名称 */
        configObject.put("imageMaxSize", 3072000);/* 上传大小限制，单位B */
        JSONArray arr1 = new JSONArray();
        arr1.add(".png");
        arr1.add(".jpg");
        arr1.add(".jpeg");
        arr1.add(".gif");
        arr1.add(".bmp");
        configObject.put("imageAllowFiles", arr1);/* 上传图片格式显示 */
        configObject.put("imageCompressEnable", true);/* 是否压缩图片,默认是true */
        configObject.put("imageCompressBorder", 1600);/* 图片压缩最长边限制 */
        configObject.put("imageInsertAlign", "none");/* 插入的图片浮动方式 */
        configObject.put("imageUrlPrefix", "");/* 图片访问路径前缀 */
        configObject.put("imagePathFormat", "/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}");/* 上传保存路径,可以自定义保存路径和文件名格式 */
                                /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
                                /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
                                /* {time} 会替换成时间戳 */
                                /* {yyyy} 会替换成四位年份 */
                                /* {yy} 会替换成两位年份 */
                                /* {mm} 会替换成两位月份 */
                                /* {dd} 会替换成两位日期 */
                                /* {hh} 会替换成两位小时 */
                                /* {ii} 会替换成两位分钟 */
                                /* {ss} 会替换成两位秒 */
                                /* 非法字符 \ : * ? " < > | */
                                /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */
        /* 涂鸦图片上传配置项 */
        configObject.put("scrawlActionName", "uploadscrawl");
        configObject.put("scrawlFieldName", "upfileCode");
        configObject.put("scrawlPathFormat", "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"); /* 上传保存路径,可以自定义保存路径和文件名格式 */
        configObject.put("scrawlMaxSize", 3072000);/* 上传大小限制，单位B */
        configObject.put("scrawlUrlPrefix", "");/* 图片访问路径前缀 */
        configObject.put("scrawlInsertAlign", "none");

        /* 截图工具上传 */
        configObject.put("snapscreenActionName", "uploadimage");/* 执行上传截图的action名称 */
        configObject.put("snapscreenPathFormat", "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}");
        configObject.put("snapscreenUrlPrefix", "");
        configObject.put("snapscreenInsertAlign", "none");

        /* 抓取远程图片配置 */
        configObject.put("catcherLocalDomain", "");
        configObject.put("catcherActionName", "catchimage");/* 执行抓取远程图片的action名称 */
        configObject.put("catcherFieldName", "source");/* 提交的图片列表表单名称 */
        configObject.put("catcherPathFormat", "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}");
        configObject.put("catcherUrlPrefix", "");
        configObject.put("catcherMaxSize", 3072000);
        configObject.put("catcherAllowFiles", arr1);

        /* 上传视频配置 */
        configObject.put("videoActionName", "uploadvideo");/* 执行上传视频的action名称 */
        configObject.put("videoFieldName", "upfile");
        configObject.put("videoPathFormat", "/ueditor/jsp/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}");
        configObject.put("videoUrlPrefix", "");
        configObject.put("videoMaxSize", 102400000);
        JSONArray arr2 = new JSONArray();
        arr2.add(".flv");
        arr2.add(".swf");
        arr2.add(".mkv");
        arr2.add(".avi");
        arr2.add(".rm");
        arr2.add(".rmvb");
        arr2.add(".mpeg");
        arr2.add(".mpg");
        arr2.add(".ogg");
        arr2.add(".ogv");
        arr2.add(".mov");
        arr2.add(".wmv");
        arr2.add(".mp4");
        arr2.add(".mp3");
        arr2.add(".wav");
        configObject.put("videoAllowFiles", arr2);

        /* 上传文件配置 */

        configObject.put("fileActionName", "uploadfile");
        configObject.put("fileFieldName", "upfile");
        configObject.put("filePathFormat", "/ueditor/jsp/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}");
        configObject.put("fileUrlPrefix", "");
        configObject.put("fileMaxSize", 51200000);
        JSONArray array3 = new JSONArray();
        array3.add(".png");
        array3.add(".jpg");
        array3.add(".jpeg");
        array3.add(".gif");
        array3.add(".bmp");
        array3.add(".flv");
        array3.add(".swf");
        array3.add(".mkv");
        array3.add(".avi");
        array3.add(".rm");
        array3.add(".rmvb");
        array3.add(".mpeg");
        array3.add(".mpg");
        array3.add(".ogg");
        array3.add(".ogv");
        array3.add(".mov");
        array3.add(".wmv");
        array3.add(".mp4");
        array3.add(".webm");
        array3.add(".mp3");
        array3.add(".wav");
        array3.add(".mid");
        array3.add(".rar");
        array3.add(".zip");
        array3.add(".tar");
        array3.add(".gz");
        array3.add(".7z");
        array3.add(".bz2");
        array3.add(".cab");
        array3.add(".iso");
        array3.add(".doc");
        array3.add(".docx");
        array3.add(".xls");
        array3.add(".xlsx");
        array3.add(".ppt");
        array3.add(".pptx");
        array3.add(".pdf");
        array3.add(".txt");
        array3.add(".md");
        array3.add(".xml");
        configObject.put("fileAllowFiles", array3);


        /* 列出指定目录下的图片 */
        configObject.put("imageManagerActionName", "listimage");
        configObject.put("imageManagerListPath", "/ueditor/jsp/upload/image/");
        configObject.put("imageManagerListSize", 20);
        configObject.put("imageManagerUrlPrefix", "");
        configObject.put("imageManagerInsertAlign", "none");
        configObject.put("imageManagerAllowFiles", arr1);

        /* 列出指定目录下的文件 */
        configObject.put("fileManagerActionName", "listfile");
        configObject.put("fileManagerListPath", "/ueditor/jsp/upload/file/");
        configObject.put("fileManagerUrlPrefix", "");
        configObject.put("fileManagerListSize", 20);
        configObject.put("fileManagerAllowFiles", array3);
    }


}
