package com.cn.cms.biz;

import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.job.IndexThread;
import com.cn.cms.po.*;
import com.cn.cms.service.TopicService;
import com.cn.cms.utils.Page;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ADMIN on 16/12/3.
 */
@Component
public class TopicBiz extends BaseBiz {

    @Resource
    private TopicService topicService;

    @Resource(name = "threadTaskExecutor")
    private ThreadPoolTaskExecutor threadTaskExecutor;

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


    public Topic getTopicManage(Long id){
        return topicService.getTopicManage(id);
    }

    public Topic doGetTopicManage(Long id){
        return topicService.doGetTopicManage(id);
    }

    /**
     * 删除专题
     * @param lastModifyUserId
     * @param id
     */
    public void delTopic(String lastModifyUserId, Long id){
        topicService.delTopic(lastModifyUserId, id);
        delIndex(id);
    }

    /**
     * 保存专题
     * @param topic
     */
    public void saveTopic(Topic topic){
        if(topic.getId()!=null && topic.getId()>0){
            topicService.updateTopic(topic);
            sendIndex(topic);
        }else{
            topicService.saveTopic(topic);
            sendIndex(topic);
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
        Integer count = topicService.findTopicByClassifyCount(topicClassifyId);
        page.setCount(count);
        if(page.isQuery()) {
            return topicService.findTopicByClassify(topicClassifyId, page);
        }
        return null;
    }

    /**
     * 根据系列专题获取列表
     * @param topicColumnId
     * @param page
     * @return
     */
    public List<Topic> findTopicByColumn(Long topicColumnId, Page page){
        Integer count = topicService.findTopicByColumnCount(topicColumnId);
        page.setCount(count);
        if(page.isQuery()) {
            return topicService.findTopicByColumn(topicColumnId, page);
        }
        return null;
    }

    /**
     * 发布topic
     * @param topic
     */
    public void publishTopic(Topic topic){
        topicService.publishTopic(topic);
        sendIndex(topic);
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

    public List<Topic> queryFilenameAndPath(Topic topic) {
        return topicService.queryFilenameAndPath(topic);
    }

    private void sendIndex(Base base){
        IndexThread indexThread = new IndexThread();
        indexThread.setId(base.getId());
        indexThread.setIndexOperEnum(IndexOperEnum.update);
        indexThread.setEsSearchTypeEnum(ESSearchTypeEnum.topic);
        threadTaskExecutor.execute(indexThread);
    }


    private void delIndex(Long id){
        IndexThread indexThread = new IndexThread();
        indexThread.setId(id);
        indexThread.setIndexOperEnum(IndexOperEnum.delete);
        indexThread.setEsSearchTypeEnum(ESSearchTypeEnum.topic);
        threadTaskExecutor.execute(indexThread);
    }

}
