package com.cn.cms.biz;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PublishStatusEnum;
import com.cn.cms.enums.TemplateTypeEnum;
import com.cn.cms.enums.TriggerTypeEnum;
import com.cn.cms.po.PublishInfo;
import com.cn.cms.service.PublishInfoService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ADMIN on 17/5/9.
 */
@Component
public class PublishInfoBiz extends BaseBiz {

    @Resource
    private PublishInfoService publishInfoService;

    /**
     *
     * @param publishStatusEnum
     * @param triggerId
     * @param triggerTypeEnum
     * @param templateTypeEnum
     * @param templateId
     * @param errorMessage
     * @return
     */
    public PublishInfo recordInfo(PublishStatusEnum publishStatusEnum,
                                  Long triggerId, TriggerTypeEnum triggerTypeEnum,
                                  TemplateTypeEnum templateTypeEnum, Long templateId,
                                  String errorMessage){
        PublishInfo publishInfo = new PublishInfo();
        publishInfo.setStatus(publishStatusEnum.getType());
        publishInfo.setMessage(publishStatusEnum.getMessage());
        publishInfo.setTemplateType(templateTypeEnum.getType());
        publishInfo.setTemplateId(templateId);
        publishInfo.setTriggerId(triggerId);
        publishInfo.setTriggerType(triggerTypeEnum.getType());
        publishInfo.setErrorMessage(errorMessage);
        publishInfo.setCreateUserId(StaticContants.CMS_OPERATION_USER_ID);
        publishInfo.setLastModifyUserId(StaticContants.CMS_OPERATION_USER_ID);
        publishInfoService.savePublishInfo(publishInfo);
        return publishInfo;
    }


    /**
     * 初始创建
     * @param publishStatusEnum
     * @param triggerId
     * @param triggerTypeEnum
     * @return
     */
    public PublishInfo createInfo(PublishStatusEnum publishStatusEnum, Long triggerId, TriggerTypeEnum triggerTypeEnum){
        PublishInfo publishInfo = new PublishInfo();
        publishInfo.setStatus(publishStatusEnum.getType());
        publishInfo.setMessage(publishStatusEnum.getMessage());
        publishInfo.setTriggerType(triggerTypeEnum.getType());
        publishInfo.setTriggerId(triggerId);
        publishInfoService.savePublishInfo(publishInfo);
        return publishInfo;

    }

    /**
     * 更新现有状态
     * @param publishInfo
     * @param publishStatusEnum
     * @param errorMessage
     */
    public void renewInfo(PublishInfo publishInfo, PublishStatusEnum publishStatusEnum, String errorMessage){
        if(publishInfo != null){
            publishInfo.setErrorMessage(errorMessage);
            publishInfo.setMessage(publishStatusEnum.getMessage());
            publishInfo.setStatus(publishStatusEnum.getType());
        }
    }


    /**
     * 修改信息
     * @param publishInfo
     */
    public void update(PublishInfo publishInfo){
        if(publishInfo != null) {
            publishInfoService.updatePublishInfo(publishInfo);
        }
    }

    /**
     * 查询列表
     * @param publishInfo
     * @param page
     * @return
     */
    public List<PublishInfo> findPublishInfoList(PublishInfo publishInfo, Page page){
        Integer count = publishInfoService.findPublishInfoCount(publishInfo);
        page.setCount(count);
        if(page.isQuery()){
            return publishInfoService.findPublishInfoList(publishInfo, page);
        }
        return null;
    }

    public PublishInfo getPublishInfo(Long id){
        return publishInfoService.getPublishInfo(id);
    }


}
