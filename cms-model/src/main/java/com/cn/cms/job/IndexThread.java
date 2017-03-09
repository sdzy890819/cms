package com.cn.cms.job;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.biz.NewsBiz;
import com.cn.cms.biz.ResourceBiz;
import com.cn.cms.biz.TopicBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.middleware.ESearchClient;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.middleware.po.ESearchJobList;
import com.cn.cms.po.*;
import com.cn.cms.utils.ContextUtil;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Resource;
import java.util.Date;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/11.
 */
@Getter
@Setter
public class IndexThread extends BaseTask {

    private ESearchClient eSearchClient = ContextUtil.getContextUtil().getBean("esearchClient", ESearchClient.class);

    private NewsBiz newsBiz = ContextUtil.getContextUtil().getBean(NewsBiz.class);

    private TopicBiz topicBiz = ContextUtil.getContextUtil().getBean(TopicBiz.class);

    private ResourceBiz resourceBiz = ContextUtil.getContextUtil().getBean(ResourceBiz.class);

    private JedisClient jedisClient = ContextUtil.getContextUtil().getBean(JedisClient.class);

    private Long id;

    private ESSearchTypeEnum esSearchTypeEnum;

    private IndexOperEnum indexOperEnum;

    @Override
    protected void execute() {
        boolean bool = false;
        switch (esSearchTypeEnum){
            case news:{
                News news = newsBiz.findNewsAndDetailManage(id);
                news.setNewsStocks(newsBiz.findNewsStockList(news.getId()));
                bool = eSearchClient.update(news, esSearchTypeEnum);
                break;
            }
            case topic:{
                Base base = topicBiz.getTopicManage(id);
                bool = eSearchClient.update(base, esSearchTypeEnum);
                break;
            }
            case images:{
                Base base = resourceBiz.getImagesManage(id);
                bool = eSearchClient.update(base, esSearchTypeEnum);
                break;
            }
            case video:{
                Base base = resourceBiz.getVideoManage(id);
                bool = eSearchClient.update(base, esSearchTypeEnum);
                break;
            }
            default:{
                break;
            }
        }
        if(!bool){
            ESearchJobList eSearchJobList = new ESearchJobList();
            eSearchJobList.setId(id);
            eSearchJobList.setEsSearchTypeEnum(esSearchTypeEnum);
            eSearchJobList.setIndexOperEnum(indexOperEnum);
            jedisClient.zadd(StaticContants.ESSEARCH_JOB_LIST, JSONObject.toJSONString(eSearchJobList), new Date().getTime());
        }
    }

    @Override
    protected String getJobName() {
        return "索引操作";
    }
}
