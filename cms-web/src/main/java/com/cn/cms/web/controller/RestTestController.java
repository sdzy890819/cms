package com.cn.cms.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.biz.ChannelBiz;
import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.DelTagEnum;
import com.cn.cms.enums.MQQueueKeyEnum;
import com.cn.cms.message.BuildSendMessage;
import com.cn.cms.middleware.ESearchClient;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Channel;
import com.cn.cms.po.News;
import com.cn.cms.po.NewsColumn;
import com.cn.cms.po.User;
import com.cn.cms.service.NewsService;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.RunnableFuture;

/**
 * Created by ADMIN on 16/12/24.
 */
@Controller
@RequestMapping(value="/webapi/test/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class RestTestController extends BaseController{

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

    @Resource(name="threadTaskExecutor")
    private ThreadPoolTaskExecutor threadPoolTaskExecutor;

    private final static int PAGE_SIZE = 1000 ;

    /**
     * 测试发送MQ
     * @return
     */
//    @RequestMapping(value = "/sendMQ", method = RequestMethod.GET)
//    public String sendMQ(){
//        String sendText = "Hello, World!!";
//        buildSendMessage.sendTest(sendText, CommonMessageSourceEnum.OTHER, MQQueueKeyEnum.BUILD);
//        return ApiResponse.returnSuccess();
//    }

    @RequestMapping(value = "/a", method = RequestMethod.POST)
    public String a(@RequestParam("c") String c){
        return ApiResponse.returnSuccess(c);
    }

    /**
     * 修改
     * @return
     */
    @RequestMapping(value = "/reBuildES", method = RequestMethod.POST)
    public String reBuildES(@RequestParam(value = "p", required = false) final Integer p){
        Page page = new Page();
        page.setPage(1);
        if(p >= PAGE_SIZE) {
            page.setPage(PAGE_SIZE);
            page.setCount(p);
        } else {
            page.setPage(p);
        }

        Runnable runnable = () -> {
            do {
                log.info("开始执行查询操作..当前页：{" + page.getPage() + "},总条数：{" + page.getCount() + "}.");
                List<News> list = newsBiz.listNews(page);
                if (StringUtils.isNotEmpty(list)) {
                    for (News news : list) {
                        News tmp = newsBiz.findNewsAndDetailManage(news.getId());
                        if (tmp != null) {
                            tmp.setNewsStocks(newsBiz.findNewsStockList(news.getId()));
                            eSearchClient.updateNews(tmp);
                        }
                        log.info("执行更新索引完毕.当前页：{" + page.getPage() + "},总条数：{" + page.getCount() + "}.");
                    }
                }else {
                    log.info("查询结果为空，结束本次更新.当前页：{" + page.getPage() + "},总条数：{" + page.getCount() + "}.");
                    break;
                }
                page.setPage(page.getPage() + 1);
            } while (page.hasNextPage());
            log.info("任务更新完成。");

        };
        threadPoolTaskExecutor.execute(runnable);

        return ApiResponse.returnSuccess();
    }

    @RequestMapping(value = "/reBuildRedis", method = RequestMethod.POST)
    public String reBuildRedis(@RequestParam(value = "key", required = false) String key){
        if(StringUtils.isNotBlank(key) && "CMSP5WC".equals(key)){
            List<Channel> channels = channelBiz.listChannel();
            if(StringUtils.isNotEmpty(channels)) {
                for (int i = 0; i < channels.size(); i++) {
                    if (channels.get(i) != null) {
                        jedisClient.set(RedisKeyContants.getRedisChannelDetailKey(channels.get(i).getId()), JSONObject.toJSONString(channels.get(i)));
                    }
                }
            }

            Integer countNewsColumn = newsService.queryListCount(null, DelTagEnum.NORMAL.getType());
            int pageSize = 5000;
            if(countNewsColumn!=null && countNewsColumn > 0){
                pageSize = countNewsColumn;
            }
            Page page = new Page(1, pageSize);
            List<NewsColumn> newsColumns = newsService.queryListForPage(null, DelTagEnum.NORMAL.getType(), page);
            if(StringUtils.isNotEmpty(newsColumns)){
                for(int i=0;i<newsColumns.size();i++){
                    if(newsColumns.get(i)!=null){
                        this.jedisClient.set(RedisKeyContants.getRedisNewcolumnId(newsColumns.get(i).getId()), JSONObject.toJSONString(newsColumns.get(i)));
                    }
                }
            }
            Integer count = userService.queryUserCount();
            pageSize = 10000;
            if(count!=null && count > 0){
                pageSize = count;
            }
            Page page2 = new Page(1, pageSize);
            List<User> users = userService.queryUserList(page2);
            if(StringUtils.isNotEmpty(users)){
                for(int i=0;i<users.size();i++){
                    if(users.get(i)!=null){
                        userBiz.refreshUserCache(users.get(i));
                    }
                }
            }
        }
        return ApiResponse.returnSuccess();
    }



}
