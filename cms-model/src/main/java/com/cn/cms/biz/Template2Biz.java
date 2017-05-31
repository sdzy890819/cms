package com.cn.cms.biz;

import com.cn.cms.bo.Template2Search;
import com.cn.cms.po.Template2;
import com.cn.cms.po.Template2Base;
import com.cn.cms.service.Template2Service;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ADMIN on 17/1/8.
 */
@Component
public class Template2Biz extends BaseBiz {

    @Resource
    private Template2Service template2Service;


    public List<Template2> listTemplate2(Page page){
        Integer count = template2Service.queryTemplate2Count();
        page.setCount(count);
        if(page.isQuery()) {
            List<Template2> list = template2Service.queryTemplate2List(page);
            return list;
        }
        return null;
    }

    public List<Template2> queryTemplate2ByClassify(Integer templateClassify){
        return template2Service.queryTemplate2ByClassify(templateClassify);
    }

    public List<Template2> searchTemplate2(Template2Search template2Search, Page page){
        Integer count = template2Service.searchTemplate2Count(template2Search);
        page.setCount(count);
        if(page.isQuery()) {
            List<Template2> list = template2Service.searchTemplate2(template2Search, page);
            return list;
        }
        return null;
    }

    public List<Template2> findTemplate2ByNewsIds(Long newsIds){
        return template2Service.findTemplate2ByNewsIds(newsIds);
    }

    public Template2 getTemplate2(Long id){
        return template2Service.getTemplate2(id);
    }


    /**
     * 删除模版
     * @param lastModifyUserId
     * @param id
     */
    public void delTemplate2(String lastModifyUserId, Long id){
        template2Service.delTemplate2(lastModifyUserId, id);
    }

    /**
     * 保存模版。
     * @param template2
     */
    public void saveTemplate2(Template2 template2){
        if(template2.getId()!=null && template2.getId() > 0) {
            template2Service.updateTemplate2(template2);
        }else {
            template2Service.saveTemplate2(template2);
        }
    }

    public Template2Base getTemplate2Base(){
        return template2Service.queryTemplate2Base();
    }

    /**
     * 保存
     * @param p
     */
    public void saveTemplate2Base(Template2Base p){
        if(p.getId()==null || p.getId() == 0){
            Template2Base template2Base = getTemplate2Base();
            if(template2Base!=null){
                template2Base.setLastModifyUserId(p.getLastModifyUserId());
                template2Base.setBasePath(p.getBasePath());
                template2Service.updateTemplate2Base(template2Base);
            }else{
                template2Service.saveTemplate2Base(p);
            }
        }else{
            template2Service.updateTemplate2Base(p);
        }
    }

    public void uploadTemplate(String lastModifyUserId,
                               Long id,
                               Integer upload){
        template2Service.uploadTemplate(lastModifyUserId, id, upload);
    }


    public Integer queryFilenameAndPathCount(Template2 template2){
        return template2Service.queryFilenameAndPathCount(template2);
    }
}
