package com.cn.cms.web.controller;

import com.cn.cms.biz.NewsBiz;
import com.cn.cms.enums.CommonMessageSourceEnum;
import com.cn.cms.enums.MQQueueKeyEnum;
import com.cn.cms.message.BuildSendMessage;
import com.cn.cms.middleware.ESearchClient;
import com.cn.cms.po.News;
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
 * Created by zhangyang on 16/12/24.
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
    private ESearchClient eSearchClient;

    @Resource(name="threadTaskExecutor")
    private ThreadPoolTaskExecutor threadPoolTaskExecutor;

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
    public String reBuildES(@RequestParam(value = "p", required = false) Integer p){
        Page page = new Page(1, p);

        Runnable runnable = () -> {
            List<News> list = newsBiz.listNews(page);
            if(StringUtils.isNotEmpty(list)){
                for(News news : list){
                    News tmp = newsBiz.findNewsAndDetail(news.getId());
                    tmp.setNewsStocks(newsBiz.findNewsStockList(news.getId()));
                    eSearchClient.updateNews(tmp);
                }
            }
        };
        threadPoolTaskExecutor.execute(runnable);

        return ApiResponse.returnSuccess();
    }


}
