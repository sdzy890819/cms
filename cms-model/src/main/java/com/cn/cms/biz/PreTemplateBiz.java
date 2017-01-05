package com.cn.cms.biz;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.*;
import com.cn.cms.po.*;
import com.cn.cms.service.PreTemplateService;
import com.cn.cms.service.TemplateService;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.FragmentUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

/**
 * Created by zhangyang on 17/1/3.
 */
@Component
public class PreTemplateBiz extends BaseBiz {

    @Resource
    private PreTemplateService preTemplateService;

    @Resource
    private TemplateService templateService;

    @Resource
    private ChannelBiz channelBiz;

    public List<PreTemplate> listPreTemplate(Page page){
        Integer count = preTemplateService.queryCount();
        page.setCount(count);
        if(page.isQuery()){
            return preTemplateService.queryList(page);
        }
        return null;
    }

    public List<PreTemplate> getPreTemplate(Integer templateClassify){
        return preTemplateService.getPreTemplateByClassify(templateClassify);
    }

    public void savePreTemplate(PreTemplate preTemplate){
        if(preTemplate.getId() == null) {
            preTemplateService.savePreTemplate(preTemplate);
        }else{
            preTemplateService.updatePreTemplate(preTemplate);
        }
    }

    public void delPreTemplate(String lastModifyUserId, Long id){
        preTemplateService.delPreTemplate(lastModifyUserId, id);
    }

    public PreTemplateBase getPreTemplateBase(){
        return preTemplateService.queryPreTemplateBase();
    }

    /**
     * 保存
     * @param p
     */
    public void savePreTemplateBase(PreTemplateBase p){
        if(p.getId()==null){
            PreTemplateBase preTemplateBase = getPreTemplateBase();
            if(preTemplateBase!=null){
                preTemplateBase.setLastModifyUserId(p.getLastModifyUserId());
                preTemplateBase.setBasePath(p.getBasePath());
                preTemplateService.updatePreTemplateBase(preTemplateBase);
            }else{
                preTemplateService.savePreTemplateBase(p);
            }
        }else{
            preTemplateService.updatePreTemplateBase(p);
        }
    }

    /**
     * 编译预模版。生成模版文件
     * @param newsColumn
     * @param listId
     * @param classifyEnum
     */
    public void buildTemplate(NewsColumn newsColumn , Long listId, TemplateClassifyEnum classifyEnum){
        PreTemplate preTemplate = preTemplateService.getPreTemplate(listId);
        Channel channel = channelBiz.getChannel(newsColumn.getChannelId());
        PreTemplateBase preTemplateBase = this.getPreTemplateBase();
        if(preTemplate!=null){
            Template template = new Template();
            String fileName = "";
            if(preTemplate.getBuildMode() == BuildModeEnum.COLUMN.getType()){
                if(classifyEnum == TemplateClassifyEnum.detail) {
                    fileName = StaticContants.TEMPLATE_DETAIL.concat(String.valueOf(newsColumn.getId())).concat(".").concat(preTemplate.getFilenameSuffix());
                }else{
                    fileName = StaticContants.TEMPLATE_LIST.concat(String.valueOf(newsColumn.getId())).concat(".").concat(preTemplate.getFilenameSuffix());
                }
            }else if(preTemplate.getBuildMode() == BuildModeEnum.RANDOM.getType()){
                if(classifyEnum == TemplateClassifyEnum.detail) {
                    fileName = StaticContants.TEMPLATE_DETAIL.concat(String.valueOf(new Date().getTime() / 1000)).concat(".").concat(preTemplate.getFilenameSuffix());
                }else {
                    fileName = StaticContants.TEMPLATE_LIST.concat(String.valueOf(new Date().getTime() / 1000)).concat(".").concat(preTemplate.getFilenameSuffix());
                }
            }
            template.setTemplateName(StaticContants.TEMPLATE_DETAIL_DESCRIPTION.concat(preTemplate.getName()).concat(fileName));
            template.setTemplateDesc(StaticContants.TEMPLATE_DETAIL_DESCRIPTION);
            template.setLastModifyUserId(newsColumn.getLastModifyUserId());
            template.setPath(preTemplate.getPublishPath());
            template.setChannelId(newsColumn.getChannelId());
            template.setEncoded(EncodedEnum.utf8.getName());
            template.setJob(JobEnum.trigger.getType());
            template.setFilename(fileName);
            template.setSortNum(StaticContants.SORT_DETAIL_NUM);
            template.setTemplateClassify(classifyEnum.getType());
            template.setUserId(newsColumn.getLastModifyUserId());
            TemplateRelation templateRelation = new TemplateRelation();
            templateRelation.setRelationId(newsColumn.getId());
            templateRelation.setRelationType(RelationTypeEnum.column.getType());
            templateRelation.setLastModifyUserId(newsColumn.getLastModifyUserId());
            templateService.saveTemplateAndRelationAndNewsColumn(template,templateRelation,newsColumn);
            String content = FileUtil.readFile(StringUtils.concatUrl(preTemplateBase.getBasePath(), preTemplate.getTemplatePath()));
            List<String> keys = FragmentUtil.getKey(content,RegexNumEnum.REGEX_ALL);
            List<String> keys2 = FragmentUtil.getKey(content,RegexNumEnum.REGEX_MATCHER_1);
            for(int i=0;i<keys.size();i++){
                try {

                    Object object = NewsColumn.class.getMethod("get".concat(keys2.get(i).substring(0,1).toUpperCase()).concat(keys2.get(i).substring(1))).invoke(newsColumn);
                    content = content.replaceAll(keys.get(i), object!=null?object.toString():"");
                } catch (IllegalAccessException e) {
                    log.error(e);
                } catch (InvocationTargetException e) {
                    log.error(e);
                } catch (NoSuchMethodException e) {
                    log.error(e);
                }

            }
            FileUtil.writeFile(content, StringUtils.concatUrl(channel.getTemplatePath(),template.getPath(),template.getFilename()));
        }

    }

}
