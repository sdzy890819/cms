package com.cn.cms.job;

import com.alibaba.fastjson.JSONObject;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.middleware.ESearchClient;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.middleware.po.ESearchJobList;
import com.cn.cms.po.Base;
import com.cn.cms.utils.ContextUtil;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Resource;
import java.util.Date;

/**
 * Created by zhangyang on 17/1/11.
 */
@Getter
@Setter
public class IndexThread extends BaseTask {

    private ESearchClient eSearchClient = ContextUtil.getContextUtil().getBean("esearchClient", ESearchClient.class);

    private JedisClient jedisClient = ContextUtil.getContextUtil().getBean(JedisClient.class);

    private Base base;

    private ESSearchTypeEnum esSearchTypeEnum;

    private IndexOperEnum indexOperEnum;

    @Override
    protected void execute() {
        boolean bool = false;
        switch (indexOperEnum){
            case update:{
                bool = eSearchClient.update(base, esSearchTypeEnum);
                break;
            }
            case delete:{
                bool = eSearchClient.delete(base.getId(), esSearchTypeEnum);
                break;
            }
            default:{
                break;
            }
        }
        if(!bool){
            ESearchJobList eSearchJobList = new ESearchJobList();
            eSearchJobList.setBase(base);
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
