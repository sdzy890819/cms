package com.cn.cms.biz;

import com.cn.cms.po.Topic;
import com.cn.cms.service.TopicService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/12/3.
 */
@Component
public class TopicBiz extends BaseBiz {

    @Resource
    private TopicService topicService;


    /**
     * 分页获取专题列表
     * @param page
     * @return
     */
    public List<Topic> listTopic(Page page){
        Integer count = topicService.queryTopicCount();
        page.setCount(count);
        if(count > 0 && page.getPageCount() >= page.getPage()) {
            return topicService.queryTopicList(page);
        }
        return null;
    }




}
