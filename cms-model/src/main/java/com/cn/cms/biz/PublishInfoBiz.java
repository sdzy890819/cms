package com.cn.cms.biz;

import com.cn.cms.enums.PublishStatusEnum;
import com.cn.cms.enums.TemplateTypeEnum;
import com.cn.cms.enums.TriggerTypeEnum;
import com.cn.cms.po.PublishInfo;
import com.cn.cms.service.PublishInfoService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by zhangyang on 17/5/9.
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
        publishInfoService.savePublishInfo(publishInfo);
        return publishInfo;
    }

    public void update(PublishInfo publishInfo){
        publishInfoService.updatePublishInfo(publishInfo);
    }
}
