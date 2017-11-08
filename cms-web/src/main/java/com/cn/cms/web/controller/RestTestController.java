package com.cn.cms.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.enums.DelTagEnum;
import com.cn.cms.message.BuildSendMessage;
import com.cn.cms.middleware.ESearchClient;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Channel;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.po.User;
import com.cn.cms.service.NewsService;
import com.cn.cms.service.UserService;
import com.cn.cms.util.JsapiTicketUtil;
import com.cn.cms.util.WeixinUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 16/12/24.
 */
@Controller
@RequestMapping(value = "/webapi/test/", produces = "application/json; charset=UTF-8")
@ResponseBody
public class RestTestController extends BaseController {

    private final static int PAGE_SIZE = 1000;
    @Resource
    private BuildSendMessage buildSendMessage;
    @Resource
    private NewsBiz newsBiz;
    @Resource
    private NewsService newsService;
    @Resource
    private ESearchClient eSearchClient;
    @Resource
    private ChannelBiz channelBiz;
    @Resource
    private UserService userService;
    @Resource
    private UserBiz userBiz;
    @Resource
    private JedisClient jedisClient;
    @Resource(name = "threadTaskExecutor")
    private ThreadPoolTaskExecutor threadPoolTaskExecutor;

    /**
     * 测试发送MQ
     *
     * @return
     */
//    @RequestMapping(value = "/sendMQ", method = RequestMethod.GET)
//    public String sendMQ(){
//        String sendText = "Hello, World!!";
//        buildSendMessage.sendTest(sendText, CommonMessageSourceEnum.OTHER, MQQueueKeyEnum.BUILD);
//        return ApiResponse.returnSuccess();
//    }
    @RequestMapping(value = "/a", method = RequestMethod.POST)
    public String a(@RequestParam("c") String c) {
        return ApiResponse.returnSuccess(c);
    }

    /**
     * 修改
     *
     * @return
     */
    @RequestMapping(value = "/reBuildES", method = RequestMethod.POST)
    public String reBuildES(@RequestParam(value = "p", required = false) final Integer p) {
        Page page = new Page();
        page.setPage(0);
        page.setCount(p);
        if (p >= PAGE_SIZE) {
            page.setPageSize(PAGE_SIZE);
        } else {
            page.setPageSize(p);
        }

        Runnable runnable = () -> {
            do {
                page.setPage(page.getPage() + 1);
                log.info("开始执行查询操作..当前页：{" + page.getPage() + "},总条数：{" + page.getCount() + "}.");
                List<News> list = newsBiz.findAllNewsLimitPage(page);
                if (StringUtils.isNotEmpty(list)) {
                    for (News news : list) {
                        News tmp = newsBiz.findNewsAndDetailManage(news.getId());
                        if (tmp != null) {
                            tmp.setNewsStocks(newsBiz.findNewsStockList(news.getId()));
                            eSearchClient.updateNews(tmp);
                        }
                    }
                    log.info("执行更新索引完毕.当前页：{" + page.getPage() + "},总条数：{" + page.getCount() + "}.");
                } else {
                    log.info("查询结果为空，结束本次更新.当前页：{" + page.getPage() + "},总条数：{" + page.getCount() + "}.");
                    break;
                }
            } while (page.hasNextPage());
            log.info("任务更新完成。");

        };
        threadPoolTaskExecutor.execute(runnable);

        return ApiResponse.returnSuccess();
    }

    @RequestMapping(value = "/reBuildRedis", method = RequestMethod.POST)
    public String reBuildRedis(@RequestParam(value = "key", required = false) String key) {
        if (StringUtils.isNotBlank(key) && "CMSP5WC".equals(key)) {
            List<Channel> channels = channelBiz.listChannel();
            if (StringUtils.isNotEmpty(channels)) {
                for (int i = 0; i < channels.size(); i++) {
                    if (channels.get(i) != null) {
                        jedisClient.set(RedisKeyContants.getRedisChannelDetailKey(channels.get(i).getId()), JSONObject.toJSONString(channels.get(i)));
                    }
                }
            }

            Integer countNewsColumn = newsService.queryListCount(null, DelTagEnum.NORMAL.getType());
            int pageSize = 5000;
            if (countNewsColumn != null && countNewsColumn > 0) {
                pageSize = countNewsColumn;
            }
            Page page = new Page(1, pageSize);
            List<NewsColumn> newsColumns = newsService.queryListForPage(null, DelTagEnum.NORMAL.getType(), page);
            if (StringUtils.isNotEmpty(newsColumns)) {
                for (int i = 0; i < newsColumns.size(); i++) {
                    if (newsColumns.get(i) != null) {
                        this.jedisClient.set(RedisKeyContants.getRedisNewcolumnId(newsColumns.get(i).getId()), JSONObject.toJSONString(newsColumns.get(i)));
                    }
                }
            }
            Integer count = userService.queryUserCount();
            pageSize = 10000;
            if (count != null && count > 0) {
                pageSize = count;
            }
            Page page2 = new Page(1, pageSize);
            List<User> users = userService.queryUserList(page2);
            if (StringUtils.isNotEmpty(users)) {
                for (int i = 0; i < users.size(); i++) {
                    if (users.get(i) != null) {
                        userBiz.refreshUserCache(users.get(i));
                    }
                }
            }
        }
        return ApiResponse.returnSuccess();
    }

    @RequestMapping(value = "/test_wifi", method = RequestMethod.GET, produces = "text/html")
    public String test(HttpServletRequest request, HttpServletResponse response) {
        String queryString = request.getQueryString();
        String url = null;
        System.out.println(queryString);
        if(StringUtils.isNotBlank(queryString)) {
            url = request.getRequestURL() + "?" + request.getQueryString();
        }else {
            url = request.getRequestURL().toString();
        }
        System.out.println("请求地址" + url);

        String jsapiTicket = JsapiTicketUtil.getJSApiTicket();
        Map<String, String> map = WeixinUtil.sign(jsapiTicket, url);
        String content = getHtml().toString();
        content = content.replace("${config.appId}", "wx0bd6e1a989032b4c");
        content = content.replace("${config.nonce}", map.get("nonceStr"));
        content = content.replace("${config.signature}", map.get("signature"));
        content = content.replace("${config.timestamp}", map.get("timestamp"));
        return content;
    }

    public static void main(String[] args){
        System.out.println(getHtml().toString().replace("${config.appId}", "").replace("${config.nonce}", ""));
    }


    public static StringBuffer getHtml() {
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n" +
                "<html>\n" +
                "<head>\n" +
                "\n" +
                "<title>AIRKISS</title>\n" +
                "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n" +
                "  <meta name=\"format-detection\" content=\"telephone=no\">\n" +
                "  <meta name=\"renderer\" content=\"webkit\">\n" +
                "  <meta http-equiv=\"Cache-Control\" content=\"no-siteapp\" />\n" +
                "  <style>\n" +
                "* { margin: 0; padding: 0; }  \n" +
                " html, body { height: 100%; width: 100%; }  \n" +
                "  </style>\n" +
                "  <script>\n" +
                "\n" +
                "</script>\n" +
                "</head>\n" +
                "<body>\n" +
                "<h1>设置设备Wifi</h1>\n" +
                "<br><br>\n" +
                "<div id=\"message\"></div>\n" +
                "</body>\n" +
                "<!--[if (gte IE 9)|!(IE)]><!-->\n" +
                "<script src=\"http://www.w3school.com.cn/jquery/jquery.js\"></script>\n" +
                "<!--<![endif]-->\n" +
                "<script src=\"http://res.wx.qq.com/open/js/jweixin-1.0.0.js\"></script>\n" +
                "<script type=\"text/javascript\">\n" +
                "\n" +
                "    wx.config({\n" +
                "        beta : true, // 开启内测接口调用，注入wx.invoke方法\n" +
                "        debug : false, // 开启调试模式\n" +
                "        appId : '${config.appId}', // 第三方app唯一标识\n" +
                "        timestamp : '${config.timestamp}', // 生成签名的时间戳\n" +
                "        nonceStr : '${config.nonce}', // 生成签名的随机串\n" +
                "        signature : '${config.signature}',// 签名\n" +
                "        jsApiList : ['configWXDeviceWiFi','scanQRCode'] // 需要使用的jsapi列表\n" +
                "    });\n" +
                "\n" +
                "    var second = 5;\n" +
                "    wx.ready(function () {\n" +
                "        wx.checkJsApi({\n" +
                "            jsApiList: ['configWXDeviceWiFi'],\n" +
                "            success: function(res) {\n" +
                "                wx.invoke('configWXDeviceWiFi', {}, function(res){\n" +
                "                    var err_msg = res.err_msg;\n" +
                "                    alert(\"配置成功!\")"+
                "                    if(err_msg == 'configWXDeviceWiFi:ok') {\n" +
                "                        wx.closeWindow();\n" +
                "                    } else {\n" +
                "                        $('#message').html(\"配置 WIFI失败，是否<a href=\\\"/wechat/scan/airkiss\" + window.location.search +  \"\\\">再次扫描</a>。<br>不配置WIFI,<a href=\\\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf1867e87a4eeeb16&redirect_uri=http://letux.xyz/wechat/page/main&response_type=code&scope=snsapi_base&state=1#wechat_redirect\\\">直接进入首页</a>。\");\n" +
                "                    }\n" +
                "                });\n" +
                "            }\n" +
                "        });\n" +
                "    });\n" +
                "\n" +
                "</script>\n" +
                "</html>");
        return stringBuffer;
    }

}
