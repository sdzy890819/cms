package com.cn.cms.biz;

import com.cn.cms.po.Template;
import com.cn.cms.po.Topic;
import com.cn.cms.po.TopicClassify;
import com.cn.cms.po.TopicColumn;
import com.cn.cms.service.TopicService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/3.
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
        if(page.isQuery()) {
            return topicService.queryTopicList(page);
        }
        return null;
    }

    /**
     * 根据ID获取Topic信息
     * @param id
     * @return
     */
    public Topic getTopic(Long id){
        return topicService.getTopic(id);
    }

    /**
     * 删除专题
     * @param lastModifyUserId
     * @param id
     */
    public void delTopic(String lastModifyUserId, Long id){
        topicService.delTopic(lastModifyUserId, id);
    }

    /**
     * 保存专题
     * @param topic
     */
    public void saveTopic(Topic topic){
        if(topic.getId()!=null && topic.getId()>0){
            topicService.updateTopic(topic);
        }else{
            topicService.saveTopic(topic);
        }
    }


    /**
     * 获取所有的系列专题列表
     * @return
     */
    public List<TopicColumn> findTopicColumnAll() {
        return topicService.findTopicColumnAll();
    }

    /**
     * 新增系列专题
     * @param topicColumn
     */
    public void saveTopicColumn(TopicColumn topicColumn) {
        topicService.saveTopicColumn(topicColumn);
    }

    /**
     * 删除系列专题
     * @param lastModifyUserId
     * @param id
     */
    public void delTopicColumn(String lastModifyUserId, Long id) {
        topicService.delTopicColumn(lastModifyUserId, id);
    }

    /**
     * 修改系列专题名
     * @param topicColumn
     */
    public void updateTopicColumn(TopicColumn topicColumn) {
        topicService.updateTopicColumn(topicColumn);
    }

    /**
     * 获取所有的专题分类列表
     * @return
     */
    public List<TopicClassify> findTopicClassifyAll() {
        return topicService.findTopicClassifyAll();
    }

    /**
     * 新增专题分类
     * @param topicClassify
     */
    public void saveTopicClassify(TopicClassify topicClassify) {
        topicService.saveTopicClassify(topicClassify);
    }

    /**
     * 删除专题分类
     * @param lastModifyUserId
     * @param id
     */
    public void delTopicClassify(String lastModifyUserId, Long id) {
        topicService.delTopicClassify(lastModifyUserId, id);
    }

    /**
     * 修改专题分类
     * @param topicClassify
     */
    public void updateTopicClassify(TopicClassify topicClassify) {
        topicService.updateTopicClassify(topicClassify);
    }

    /**
     * 根据专题分类获取列表
     * @param topicClassifyId
     * @param page
     * @return
     */
    public List<Topic> findTopicByClassify(Long topicClassifyId, Page page){
        return topicService.findTopicByClassify(topicClassifyId, page);
    }

    /**
     * 根据系列专题获取列表
     * @param topicColumnId
     * @param page
     * @return
     */
    public List<Topic> findTopicByColumn(Long topicColumnId, Page page){
        return topicService.findTopicByColumn(topicColumnId, page);
    }

    /**
     * 发布topic
     * @param topic
     */
    public void publishTopic(Topic topic){
        topicService.publishTopic(topic);
    }

    public TopicClassify getTopicClassify(Long id){
        return topicService.getTopicClassify(id);
    }

    public TopicColumn getTopicColumn(Long id){
        return topicService.getTopicColumn(id);
    }

    public Integer queryFilenameAndPathCount(Topic topic){
        return topicService.queryFilenameAndPathCount(topic);
    }

}
