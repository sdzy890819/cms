package com.cn.cms.biz;

import com.cn.cms.bo.TemplateSearch;
import com.cn.cms.enums.RelationTypeEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.po.Channel;
import com.cn.cms.po.Template;
import com.cn.cms.po.TemplateRelation;
import com.cn.cms.po.Topic;
import com.cn.cms.service.TemplateService;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import org.jboss.netty.util.internal.StringUtil;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 16/12/7.
 */
@Component
public class TemplateBiz extends BaseBiz {

    @Resource
    private TemplateService templateService;

    @Resource
    private ChannelBiz channelBiz;


    /**
     * 分页展示模版列表
     * @param page
     * @return
     */
    public List<Template> listTemplate(Page page){
        Integer count = templateService.queryTemplateCount();
        page.setCount(count);
        if(page.isQuery()) {
            List<Template> list = templateService.queryTemplateList(page);
            return list;
        }
        return null;
    }

    public List<Template> searchTemplate(TemplateSearch templateSearch, Page page){
        Integer count = templateService.searchTemplateCount(templateSearch);
        page.setCount(count);
        if(page.isQuery()) {
            List<Template> list = templateService.searchTemplate(templateSearch, page);
            return list;
        }
        return null;
    }

    public Template getTemplate(Long id){
        return templateService.getTemplate(id);
    }


    /**
     * 删除模版
     * @param lastModifyUserId
     * @param id
     */
    public void delTemplate(String lastModifyUserId, Long id){
        templateService.delTemplate(lastModifyUserId, id);
    }

    /**
     * 保存模版。
     * @param template
     */
    public void saveTemplate(Template template){
        if(template.getId()!=null && template.getId() > 0) {
            templateService.updateTemplate(template);
        }else {
            templateService.saveTemplate(template);
        }
    }

    public Integer queryFilenameAndPathCount(Template template){
        return templateService.queryFilenameAndPathCount(template);
    }

    public List<Template> queryFilenameAndPath(Template template){
        return templateService.queryFilenameAndPath(template);
    }

    /**
     * 查询关系
     * @param templateId
     * @param relationType
     * @return
     */
    public List<TemplateRelation> listRelation(Long templateId, Integer relationType){
        if(relationType > 0){
            return templateService.queryTemplateRelationList(templateId, relationType);
        }
        return  templateService.queryListForTemplateId(templateId);
    }

    /**
     * 修改模版关系
     * @param templateId
     * @param relationTypes
     * @param list
     */
    public void updateRelation(Long templateId, Integer[] relationTypes, List<TemplateRelation> list){
        templateService.updateRelation(templateId, relationTypes, list);
    }

    /**
     * 新增模版关系
     * @param templateRelation
     */
    public void saveRelation(TemplateRelation templateRelation){
        templateService.saveRelation(templateRelation);
    }

    /**
     * 取消模版关系
     * @param templateId
     * @param relationId
     * @param relationType
     */
    public void delRelation(Long templateId, Long relationId, Integer relationType){
        templateService.delRelation(templateId, relationId, relationType);
    }

    /**
     * 取消模版关系
     * @param templateId
     */
    public void delRelation(Long templateId){
        templateService.delRelation(templateId);
    }

    /**
     * 根据对应关系查询需要更新的模版列表
     * @param relationId
     * @param relationType
     * @return
     */
    public List<Template> findTemplateListByRelation(Long relationId, Integer relationType){
        return templateService.findTemplateListByRelation(relationId, relationType);
    }

    /**
     * 根据对应关系查询需要更新的模版列表［不包含详情页］
     * @param relationId
     * @param relationType
     * @return
     */
    public List<Template> findTemplateListByRelationNotDetail(Long relationId, Integer relationType){
        return templateService.findTemplateListByRelationNotDetail(relationId, relationType);
    }


    public List<Template> findTemplateListByNewsPushColumnAndNotDetail(Long newsId){
        return templateService.findTemplateListByNewsPushColumnAndNotDetail(newsId, RelationTypeEnum.column.getType());
    }


    public void publishTemplate(List<Long> list){
        templateService.publishTemplate(list);
    }


    public void publishTemplates(List<Template> list){
        templateService.publishTemplates(list);
    }

    public List<Template> findTemplateListByAuto(){
        return templateService.findTemplateListByAuto();
    }

    /**
     * 查询频道下栏目触发的详情页模版.
     * @param channelId
     * @param templateClassify
     * @param relationId
     * @param relationType
     * @param job
     * @return
     */
    public Template findTemplateByChannel(Long channelId,
                                          Integer templateClassify,
                                          Long relationId,
                                          Integer relationType,
                                          int job){
        return templateService.findTemplateByChannel(channelId, templateClassify, relationId, relationType, job);
    }

    public void uploadTemplate(String lastModifyUserId,
                               Long id,
                               Integer upload){
        templateService.uploadTemplate(lastModifyUserId, id, upload);
    }

    /**
     * 是否重复
     * @param newTemplate
     * @param templates
     * @return
     */
    public boolean repeat(Template newTemplate, List<Template> templates){
        boolean bool = false;
        if(templates!=null && templates.size() > 0){
            List<Long> ids = new ArrayList<>();
            ids.add(newTemplate.getChannelId());
            for( int i=0; i<templates.size(); i ++ ) {
                Template template = templates.get(i);
                ids.add(template.getChannelId());
            }
            Map<Long, Channel> map = channelBiz.getChannelMap(ids);
            String templatePath = map.get(newTemplate.getChannelId()).getTemplatePath();
            for( int i=0; i<templates.size(); i ++ ) {
                if(StringUtils.isNotBlank(templatePath) && templatePath.equals(map.get(templates.get(i).getChannelId()).getTemplatePath())){
                    bool = true;
                    break;
                }
            }
        }

        return bool;
    }

}
