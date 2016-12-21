package com.cn.cms.biz;

import com.cn.cms.po.Template;
import com.cn.cms.po.TemplateRelation;
import com.cn.cms.service.TemplateService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/12/7.
 */
@Component
public class TemplateBiz extends BaseBiz {

    @Resource
    private TemplateService templateService;

    /**
     * 分页展示模版列表
     * @param page
     * @return
     */
    public List<Template> listTemplate(Page page){
        Integer count = templateService.queryTemplateCount();
        page.setCount(count);
        if(count > 0 && page.getPage() <= page.getPageCount()) {
            List<Template> list = templateService.queryTemplateList(page);
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
        if(template.getId() > 0) {
            templateService.updateTemplate(template);
        }else {
            templateService.saveTemplate(template);
        }
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

}
