package com.cn.cms.web.controller;

import com.cn.cms.biz.*;
import com.cn.cms.bo.RelationBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.RelationTypeEnum;
import com.cn.cms.enums.UploadEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.po.Channel;
import com.cn.cms.po.Template;
import com.cn.cms.po.TemplateRelation;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.RsyncUtils;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.ann.NotSaveBody;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/7.
 */
@Controller
@RequestMapping(value="/webapi/template/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class TemplateController extends BaseController {

    @Resource
    private TemplateBiz templateBiz;

    @Resource
    private ChannelBiz channelBiz;

    @Resource
    private Template2Biz template2Biz;

    @Resource
    private TopicBiz topicBiz;

    @Resource
    private UserBiz userBiz;

    /**
     * 模版列表［分页］
     * @param request
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template:read")
    @RequestMapping(value = "/listTemplate", method = RequestMethod.GET)
    public String listTemplate(HttpServletRequest request,
                               @RequestParam(value = "page",required = false) Integer page,
                               @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<Template> list = templateBiz.listTemplate(pageObj);
        userBiz.dataInitBase(list);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("page",pageObj);
        result.put("list",list);
        return ApiResponse.returnSuccess(result);
    }


    /**
     * 模版详细信息
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template:read")
    @RequestMapping(value = "/templateInfo", method = RequestMethod.GET)
    public String templateInfo(HttpServletRequest request,
                              @RequestParam(value = "id") Long id){
        Template template = templateBiz.getTemplate(id);
        return ApiResponse.returnSuccess(template);
    }

    /**
     * 删除模版
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template:delete")
    @RequestMapping(value = "/delTemplate", method = RequestMethod.GET)
    public String delTemplate(HttpServletRequest request,
                               @RequestParam(value = "id") Long id){
        templateBiz.delTemplate(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }

    /**
     * 模版修改
     * @param request
     * @param id
     * @param templateName
     * @param templateDesc
     * @param filename
     * @param path
     * @param templateClassify
     * @param job
     * @param encoded
     * @param channelId
     * @param sortNum
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template:update" )
    @RequestMapping(value = "/updateTemplate", method = RequestMethod.POST)
    public String updateTemplate(HttpServletRequest request,
                                 @RequestParam(value = "id") Long id,
                                 @RequestParam(value = "templateName",required = false) String templateName,
                                 @RequestParam(value = "templateDesc",required = false) String templateDesc,
                                 @RequestParam(value = "filename",required = false) String filename,
                                 @RequestParam(value = "path",required = false) String path,
                                 @RequestParam(value = "templateClassify",required = false) Integer templateClassify,
                                 @RequestParam(value = "job",required = false) Integer job,
                                 @RequestParam(value = "encoded",required = false) String encoded,
                                 @RequestParam(value = "channelId",required = false) Long channelId,
                                 @RequestParam(value = "sortNum",required = false) Integer sortNum){
        Template oldTemplate = templateBiz.getTemplate(id);
        Template template = new Template();
        template.setId(id);
        template.setLastModifyUserId(getCurrentUserId(request));
        template.setChannelId(channelId);
        template.setEncoded(encoded);
        template.setFilename(filename);
        template.setJob(job);
        template.setPath(path);
        template.setSortNum(sortNum);
        template.setTemplateClassify(templateClassify);
        template.setTemplateDesc(templateDesc);
        template.setTemplateName(templateName);

//        if(!oldTemplate.getPath().equals(path) || !oldTemplate.getFilename().equals(filename)){
//            Integer a = templateBiz.queryFilenameAndPathCount(template);
//            if( a != null && a > 0){
//                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//            }
//            Template2 tmp = new Template2();
//            tmp.setFilename(filename);
//            tmp.setPath(path);
//            Integer b = template2Biz.queryFilenameAndPathCount(tmp);
//            if(b != null && b > 0){
//                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//            }
//
//            Topic topic = new Topic();
//            topic.setTopicPath(path);
//            topic.setTopicFilename(filename);
//            Integer c = topicBiz.queryFilenameAndPathCount(topic);
//            if(c != null && c > 0){
//                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//            }
//            template.setUpload(UploadEnum.NO.getType());
//        }
        if(!oldTemplate.getPath().equals(path) || !oldTemplate.getFilename().equals(filename) || ( channelId != null && !oldTemplate.getChannelId().equals(channelId))){
            Channel channel = null;
            if(channelId!=null){
                channel = channelBiz.getChannel(channelId);
            }else{
                channel = channelBiz.getChannel(oldTemplate.getChannelId());
            }
            if(channel == null){
                return ApiResponse.returnFail(StaticContants.ERROR_CHANNEL_NOT_FOUND);
            }
            String filePath = StringUtils.concatUrl(channel.getTemplatePath(), template.getPath(), template.getFilename());
            File file = new File(filePath);
            if(file.exists()){
                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP + filePath);
            }
        }

        templateBiz.saveTemplate(template);
        return ApiResponse.returnSuccess();
    }


    /**
     * 创建新模版
     * @param request
     * @param templateName
     * @param templateDesc
     * @param filename
     * @param path
     * @param templateClassify
     * @param job
     * @param encoded
     * @param channelId
     * @param sortNum
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template:write" )
    @RequestMapping(value = "/createTemplate", method = RequestMethod.POST)
    public String createTemplate(HttpServletRequest request,
                                 @RequestParam(value = "templateName") String templateName,
                                 @RequestParam(value = "templateDesc") String templateDesc,
                                 @RequestParam(value = "filename") String filename,
                                 @RequestParam(value = "path") String path,
                                 @RequestParam(value = "templateClassify") Integer templateClassify,
                                 @RequestParam(value = "job") Integer job,
                                 @RequestParam(value = "encoded") String encoded,
                                 @RequestParam(value = "channelId") Long channelId,
                                 @RequestParam(value = "sortNum") Integer sortNum){

        Template template = new Template();
        template.setLastModifyUserId(getCurrentUserId(request));
        template.setCreateUserId(getCurrentUserId(request));
        template.setChannelId(channelId);
        template.setEncoded(encoded);
        template.setFilename(filename);
        template.setJob(job);
        template.setPath(path);
        template.setSortNum(sortNum);
        template.setTemplateClassify(templateClassify);
        template.setTemplateDesc(templateDesc);
        template.setTemplateName(templateName);
        template.setUpload(UploadEnum.NO.getType());
        /*Integer a = templateBiz.queryFilenameAndPathCount(template);
        if( a != null && a > 0){
            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
        }
        Template2 tmp = new Template2();
        tmp.setFilename(filename);
        tmp.setPath(path);
        Integer b = template2Biz.queryFilenameAndPathCount(tmp);
        if(b != null && b > 0){
            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
        }

        Topic topic = new Topic();
        topic.setTopicPath(path);
        topic.setTopicFilename(filename);
        Integer c = topicBiz.queryFilenameAndPathCount(topic);
        if(c != null && c > 0){
            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
        }*/
        Channel channel = channelBiz.getChannel(channelId);
        if(channel == null){
            return ApiResponse.returnFail(StaticContants.ERROR_CHANNEL_NOT_FOUND);
        }
        String filePath = StringUtils.concatUrl(channel.getTemplatePath(), template.getPath(), template.getFilename());
        File file = new File(filePath);
        if(file.exists()){
            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP + filePath);
        }
        templateBiz.saveTemplate(template);
        return ApiResponse.returnSuccess();
    }

    /**
     * 模版上传
     * @param request
     * @param baseCode
     * @param id
     * @return
     * @throws BizException
     */
    @NotSaveBody
    @CheckToken
    @CheckAuth( name = "template:upload" )
    @RequestMapping(value = "/uploadTemplate", method = RequestMethod.POST)
    public String uploadTemplate(HttpServletRequest request,
                             @RequestParam(value = "baseCode", required = false) String baseCode,
                             @RequestParam(value = "id") Long id) throws BizException{
        if(StringUtils.isBlank(baseCode)){
            return ApiResponse.returnFail(StaticContants.ERROR_BASE_CODE);
        }
        Template template = templateBiz.getTemplate(id);
        Channel channel = channelBiz.getChannel(template.getChannelId());
        byte[] bytes = FileUtil.base64Upload(baseCode);
        String fileName = StringUtils.concatUrl(channel.getTemplatePath(), template.getPath(), template.getFilename());
        FileUtil.fileUpload(bytes, fileName);
        if(StaticContants.RSYNC_TEMPLATE_ON == StaticContants.RSYNC_ON){
            RsyncUtils.rsync(null , StringUtils.delFirstPrefix(StringUtils.concatUrl(template.getPath(), template.getFilename()), StaticContants.FILE_PATH_SP),
                    StaticContants.RSYNC_TEMPLATE_FILE, channel.getTemplatePath());
        }
        templateBiz.uploadTemplate(getCurrentUserId(request), id, UploadEnum.YES.getType());
        Map<String,Object> map = new HashMap<>();
        map.put("fileName",fileName);
        return ApiResponse.returnSuccess(map);
    }

    /**
     * 模版下载
     * @param request
     * @param response
     * @param id
     * @return
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "template:download" )
    @RequestMapping(value = "/downTemplate", method = RequestMethod.GET)
    public String downTemplate(HttpServletRequest request,
                               HttpServletResponse response,
                               @RequestParam(value = "id") Long id) throws BizException{
        Template template = templateBiz.getTemplate(id);
        Channel channel = channelBiz.getChannel(template.getChannelId());
        try {
            response.setCharacterEncoding(StaticContants.UTF8);
            response.setContentType(StaticContants.DOWN_LOAD_CONTENT_TYPE);
            response.setHeader(StaticContants.HEADER_CONTENT_DISPOSITION, StaticContants.getHEADER_ATTACHMENT(template.getFilename()));
            FileUtil.fileDownload(response.getOutputStream(), StringUtils.concatUrl(channel.getTemplatePath(), template.getPath(), template.getFilename()));
        } catch (IOException e) {
            throw new BizException(StaticContants.ERROR_TEMPLATE_DOWNLOAD, e);
        }
        return null;
    }

    /**
     * 读取所有的模版对应的关系列表
     * @param templateId
     * @param relationType
     * @return
     */
    @CheckToken
    @CheckAuth( name = "templaterelation:read" )
    @RequestMapping(value = "/relation", method = RequestMethod.GET)
    public String relation(@RequestParam(value = "templateId") Long templateId,
                           @RequestParam(value = "relationType",defaultValue = "0") Integer relationType){
        List<TemplateRelation> list = templateBiz.listRelation(templateId, relationType);
        Map<String, TemplateRelation> map = new HashMap<String, TemplateRelation>();
        for(int i=0;i<list.size();i++){
            TemplateRelation tr = list.get(i);
            map.put(tr.getRelationType() + StaticContants.UNDER_LINE + tr.getRelationId(), tr);
        }
        return ApiResponse.returnSuccess(map);
    }


    /**
     * 根据relationType 修改模版对应关系
     * @param request
     * @param templateId
     * @param relations
     * @param relationTypes
     * @return
     */
    @CheckToken
    @CheckAuth( name = "templaterelation:update" )
    @RequestMapping(value = "/updateRelations", method = RequestMethod.POST)
    public String updateRelations(HttpServletRequest request,
                                 @RequestParam(value = "templateId") Long templateId,
                                 @RequestParam(value = "relations") List<RelationBean> relations,
                                 @RequestParam(value = "relationTypes") Integer[] relationTypes){
        String userID = getCurrentUserId(request);
        List<TemplateRelation> list = new ArrayList<TemplateRelation>();
        for(int i=0; i<relations.size(); i++){
            TemplateRelation tr = new TemplateRelation();
            tr.setRelationId(relations.get(i).getRelationId());
            tr.setRelationType(relations.get(i).getRelationType());
            tr.setLastModifyUserId(userID);
            tr.setCreateUserId(userID);
            tr.setTemplateId(templateId);
            list.add(tr);
        }
        templateBiz.updateRelation(templateId, relationTypes, list);
        return ApiResponse.returnSuccess();
    }

    /**
     * 新增模版关系
     * @param request
     * @param templateId
     * @param relationId
     * @param relationType
     * @return
     */
    @CheckToken
    @CheckAuth( name = "templaterelation:write" )
    @RequestMapping(value = "/createRelation", method = RequestMethod.POST)
    public String createRelation(HttpServletRequest request,
                                 @RequestParam(value = "templateId") Long templateId,
                                 @RequestParam(value = "relationId") Long relationId,
                                 @RequestParam(value = "relationType") Integer relationType){

        TemplateRelation templateRelation = new TemplateRelation();
        templateRelation.setTemplateId(templateId);
        templateRelation.setRelationType(relationType);
        templateRelation.setLastModifyUserId(getCurrentUserId(request));
        templateRelation.setCreateUserId(getCurrentUserId(request));
        templateRelation.setRelationId(relationId);
        templateBiz.saveRelation(templateRelation);
        return ApiResponse.returnSuccess();
    }

    /**
     * 模版关系删除
     * @param request
     * @param templateId
     * @param relationId
     * @param relationType
     * @return
     */
    @CheckToken
    @CheckAuth( name = "templaterelation:delete" )
    @RequestMapping(value = "/delRelation", method = RequestMethod.POST)
    public String delRelation(HttpServletRequest request,
                                 @RequestParam(value = "templateId") Long templateId,
                                 @RequestParam(value = "relationId") Long relationId,
                                 @RequestParam(value = "relationType") Integer relationType){
        templateBiz.delRelation(templateId, relationId, relationType);
        return ApiResponse.returnSuccess();
    }

    /**
     * 模版跳转
     * @param response
     * @param id
     * @return
     */
    @CheckToken
    @RequestMapping(value = "/redirect/{id}", method = RequestMethod.GET)
    public String redirect(HttpServletResponse response,
                              @PathVariable(value = "id") Long id){
        Template template = templateBiz.getTemplate(id);
        Channel channel = channelBiz.getChannel(template.getChannelId());
        String url = StringUtils.concatUrl(channel.getChannelUrl(), template.getPath(), template.getFilename());
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 根据新闻栏目获取模版信息.
     * @param request
     * @param columnId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumntemplate:read" )
    @RequestMapping(value = "/listTemplateBycolumnId", method = RequestMethod.GET)
    public String listTemplateBycolumnId(HttpServletRequest request,
                              @RequestParam(value = "columnId") Long columnId){
        List<Template> list = this.templateBiz.findTemplateListByRelation(columnId, RelationTypeEnum.column.getType());
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 从新闻栏目删除模版关系.
     * @param request
     * @param templateId
     * @param relationId
     * @param relationType
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumntemplate:delete" )
    @RequestMapping(value = "/delRelationByColumnList", method = RequestMethod.POST)
    public String delRelationByColumnList(HttpServletRequest request,
                              @RequestParam(value = "templateId") Long templateId,
                              @RequestParam(value = "relationId") Long relationId,
                              @RequestParam(value = "relationType") Integer relationType){
        return delRelation(request, templateId, relationId, relationType);
    }

}
