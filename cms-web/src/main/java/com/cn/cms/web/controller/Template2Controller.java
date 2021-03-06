package com.cn.cms.web.controller;

import com.cn.cms.biz.Template2Biz;
import com.cn.cms.biz.TemplateBiz;
import com.cn.cms.biz.TopicBiz;
import com.cn.cms.biz.UserBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.Template2ClassifyEnum;
import com.cn.cms.enums.UploadEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.po.Template2;
import com.cn.cms.po.Template2Base;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.RsyncUtils;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.ann.NotSaveBody;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 17/1/8.
 */
@Controller
@RequestMapping(value="/webapi/template2/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class Template2Controller extends BaseController  {

    @Resource
    private Template2Biz template2Biz;

    @Resource
    private TemplateBiz templateBiz;

    @Resource
    private TopicBiz topicBiz;

    @Resource
    private UserBiz userBiz;

    /**
     * 第二模版列表［分页］
     * @param request
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2:read")
    @RequestMapping(value = "/listTemplate2", method = RequestMethod.GET)
    public String listTemplate2(HttpServletRequest request,
                               @RequestParam(value = "page",required = false) Integer page,
                               @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<Template2> list = template2Biz.listTemplate2(pageObj);
        userBiz.dataInitBase(list);
        Map<String, Object> result = new HashMap<>();
        result.put("page",pageObj);
        result.put("list",list);
        return ApiResponse.returnSuccess(result);
    }


    /**
     * 获取列表类型的第二模版列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:read")
    @RequestMapping(value = "/listTemplate2/list", method = RequestMethod.GET)
    public String listTemplate2ByList(){
        List<Template2> list = template2Biz.queryTemplate2ByClassify(Template2ClassifyEnum.list.getType());
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 获取详情类型的第二模版列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "newscolumn:read")
    @RequestMapping(value = "/listTemplate2/detail", method = RequestMethod.GET)
    public String listTemplate2ByDetail(){
        List<Template2> list = template2Biz.queryTemplate2ByClassify(Template2ClassifyEnum.detail.getType());
        return ApiResponse.returnSuccess(list);
    }


    /**
     * 第二模版详细信息
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2:read")
    @RequestMapping(value = "/template2Info", method = RequestMethod.GET)
    public String template2Info(HttpServletRequest request,
                               @RequestParam(value = "id") Long id){
        Template2 template2 = template2Biz.getTemplate2(id);
        return ApiResponse.returnSuccess(template2);
    }

    /**
     * 删除第二模版
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2:delete")
    @RequestMapping(value = "/delTemplate2", method = RequestMethod.GET)
    public String delTemplate2(HttpServletRequest request,
                              @RequestParam(value = "id") Long id){
        template2Biz.delTemplate2(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }


    /**
     * 第二模版修改
     * @param request
     * @param id
     * @param templateName
     * @param filename
     * @param path
     * @param templateClassify
     * @param encoded
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2:update" )
    @RequestMapping(value = "/updateTemplate2", method = RequestMethod.POST)
    public String updateTemplate2(HttpServletRequest request,
                                 @RequestParam(value = "id") Long id,
                                 @RequestParam(value = "templateName",required = false) String templateName,
                                 @RequestParam(value = "filename",required = false) String filename,
                                 @RequestParam(value = "path",required = false) String path,
                                 @RequestParam(value = "templateClassify",required = false) Integer templateClassify,
                                 @RequestParam(value = "encoded",required = false) String encoded){
        path = FileUtil.delPrefix(path);
        Template2 oldTemplate = template2Biz.getTemplate2(id);
        Template2 template2 = new Template2();
        template2.setId(id);
        template2.setLastModifyUserId(getCurrentUserId(request));
        template2.setEncoded(encoded);
        template2.setFilename(filename);
        template2.setPath(path);
        template2.setTemplateClassify(templateClassify);
        template2.setTemplateName(templateName);

        if(!oldTemplate.getPath().equals(path) || !oldTemplate.getFilename().equals(filename)){

//            Integer b = template2Biz.queryFilenameAndPathCount(template2);
//            if(b != null && b > 0){
//                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//            }
//
//            Template tmp = new Template();
//            tmp.setPath(path);
//            tmp.setFilename(filename);
//            Integer a = templateBiz.queryFilenameAndPathCount(tmp);
//            if( a != null && a > 0){
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
//            template2.setUpload(UploadEnum.NO.getType());
            Template2Base template2Base = template2Biz.getTemplate2Base();
            if(template2Base == null){
                return ApiResponse.returnFail("第二模版基础信息不存在");
            }
            String filePath = StringUtils.concatUrl(template2Base.getBasePath(), template2.getPath(), template2.getFilename());
            File file = new File(filePath);
            if(file.exists()){
                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP + filePath);
            }
            Integer b = template2Biz.queryFilenameAndPathCount(template2);
            if(b != null && b > 0){
                return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
            }

        }

        template2Biz.saveTemplate2(template2);
        return ApiResponse.returnSuccess();
    }


    /**
     * 创建第二新模版
     * @param request
     * @param templateName
     * @param filename
     * @param path
     * @param templateClassify
     * @param encoded
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2:write" )
    @RequestMapping(value = "/createTemplate2", method = RequestMethod.POST)
    public String createTemplate2(HttpServletRequest request,
                                 @RequestParam(value = "templateName") String templateName,
                                 @RequestParam(value = "filename", required = false) String filename,
                                 @RequestParam(value = "path") String path,
                                 @RequestParam(value = "templateClassify") Integer templateClassify,
                                 @RequestParam(value = "encoded") String encoded){
        path = FileUtil.delPrefix(path);
        Template2 template2 = new Template2();
        template2.setLastModifyUserId(getCurrentUserId(request));
        template2.setCreateUserId(getCurrentUserId(request));
        template2.setEncoded(encoded);
        template2.setFilename(filename);
        template2.setPath(path);
        template2.setTemplateClassify(templateClassify);
        template2.setTemplateName(templateName);
        template2.setUpload(UploadEnum.NO.getType());
//        Integer b = template2Biz.queryFilenameAndPathCount(template2);
//        if(b != null && b > 0){
//            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//        }
//
//        Template tmp = new Template();
//        tmp.setPath(path);
//        tmp.setFilename(filename);
//        Integer a = templateBiz.queryFilenameAndPathCount(tmp);
//        if( a != null && a > 0){
//            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//        }
//
//        Topic topic = new Topic();
//        topic.setTopicPath(path);
//        topic.setTopicFilename(filename);
//        Integer c = topicBiz.queryFilenameAndPathCount(topic);
//        if(c != null && c > 0){
//            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
//        }
        Template2Base template2Base = template2Biz.getTemplate2Base();
        if(template2Base == null){
            return ApiResponse.returnFail("第二模版基础信息不存在");
        }
        String filePath = StringUtils.concatUrl(template2Base.getBasePath(), template2.getPath(), template2.getFilename());
        File file = new File(filePath);
        if(file.exists()){
            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP + filePath);
        }
        Integer b = template2Biz.queryFilenameAndPathCount(template2);
        if(b != null && b > 0){
            return ApiResponse.returnFail(StaticContants.ERROR_TEMPLATE_PATH_FILENAME_DUP);
        }
        template2Biz.saveTemplate2(template2);
        return ApiResponse.returnSuccess();
    }

    /**
     * 第二模版上传
     * @param request
     * @param baseCode
     * @param id
     * @return
     * @throws BizException
     */
    @NotSaveBody
    @CheckToken
    @CheckAuth( name = "template2:upload" )
    @RequestMapping(value = "/uploadTemplate2", method = RequestMethod.POST)
    public String uploadTemplate2(HttpServletRequest request,
                                 @RequestParam(value = "baseCode", required = false) String baseCode,
                                 @RequestParam(value = "id") Long id) throws BizException{
        if(StringUtils.isBlank(baseCode)){
            return ApiResponse.returnFail(StaticContants.ERROR_BASE_CODE);
        }
        Template2 template2 = template2Biz.getTemplate2(id);
        Template2Base template2Base = template2Biz.getTemplate2Base();
        byte[] bytes = FileUtil.base64Upload(baseCode);
        String fileName = StringUtils.concatUrl(template2Base.getBasePath(), template2.getPath(), template2.getFilename());
        FileUtil.fileUpload(bytes, fileName);
        template2Biz.uploadTemplate(getCurrentUserId(request), id, UploadEnum.YES.getType());
        if(StaticContants.RSYNC_TEMPLATE_ON == StaticContants.RSYNC_ON){
            RsyncUtils.rsync(null , StringUtils.delFirstPrefix(StringUtils.concatUrl(template2.getPath(), template2.getFilename()), StaticContants.FILE_PATH_SP),
                    StaticContants.RSYNC_TEMPLATE_FILE, template2Base.getBasePath());
        }
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("fileName",fileName);
        return ApiResponse.returnSuccess(map);
    }

    /**
     * 第二模版下载
     * @param request
     * @param response
     * @param id
     * @return
     * @throws BizException
     */
    @CheckToken
    @CheckAuth( name = "template2:download" )
    @RequestMapping(value = "/downTemplate2", method = RequestMethod.GET)
    public String downTemplate2(HttpServletRequest request,
                               HttpServletResponse response,
                               @RequestParam(value = "id") Long id) throws BizException{
        Template2 template2 = template2Biz.getTemplate2(id);
        Template2Base template2Base = template2Biz.getTemplate2Base();
        try {
            response.setCharacterEncoding(StaticContants.UTF8);
            response.setContentType(StaticContants.DOWN_LOAD_CONTENT_TYPE);
            response.setHeader(StaticContants.HEADER_CONTENT_DISPOSITION, StaticContants.getHEADER_ATTACHMENT(template2.getFilename()));
            FileUtil.fileDownload(response.getOutputStream(), StringUtils.concatUrl(template2Base.getBasePath(), template2.getPath(), template2.getFilename()));
        } catch (IOException e) {
            throw new BizException(StaticContants.ERROR_TEMPLATE_DOWNLOAD, e);
        }
        return null;
    }


    /**
     * 获取第二模版基础信息
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2base:read")
    @RequestMapping(value = "/template2Base", method = RequestMethod.GET)
    public String template2Base(){
        Template2Base template2Base = template2Biz.getTemplate2Base();
        return ApiResponse.returnSuccess(template2Base);
    }

    /**
     * 修改第二模版基础信息
     * @param request
     * @param basePath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2base:update")
    @RequestMapping(value = "/base/update", method = RequestMethod.POST)
    public String updateBase(HttpServletRequest request,
                             @RequestParam(value = "id", required = false) Long id,
                             @RequestParam(value = "basePath") String basePath){
        Template2Base template2Base = new Template2Base();
        template2Base.setId(id);
        template2Base.setLastModifyUserId(getCurrentUserId(request));
        template2Base.setCreateUserId(getCurrentUserId(request));
        template2Base.setBasePath(FileUtil.addSuffix(basePath));
        template2Biz.saveTemplate2Base(template2Base);
        return ApiResponse.returnSuccess(template2Base);
    }

}
