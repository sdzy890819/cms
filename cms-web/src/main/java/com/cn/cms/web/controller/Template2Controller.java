package com.cn.cms.web.controller;

import com.cn.cms.biz.Template2Biz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.exception.BizException;
import com.cn.cms.po.Template2;
import com.cn.cms.po.Template2Base;
import com.cn.cms.utils.FileUtil;
import com.cn.cms.utils.Page;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 17/1/8.
 */
@Controller
@RequestMapping(value="/template2/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class Template2Controller extends BaseController  {

    @Resource
    private Template2Biz template2Biz;

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
    @CheckAuth( name = "template2:read")
    @RequestMapping(value = "/listTemplate2/list", method = RequestMethod.GET)
    public String listTemplate2ByList(){
        List<Template2> list = template2Biz.queryTemplate2ByClassify(TemplateClassifyEnum.list.getType());
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 获取详情类型的第二模版列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "template2:read")
    @RequestMapping(value = "/listTemplate2/detail", method = RequestMethod.GET)
    public String listTemplate2ByDetail(){
        List<Template2> list = template2Biz.queryTemplate2ByClassify(TemplateClassifyEnum.detail.getType());
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
        Template2 template2 = new Template2();
        template2.setId(id);
        template2.setLastModifyUserId(getCurrentUserId(request));
        template2.setEncoded(encoded);
        template2.setFilename(filename);
        template2.setPath(path);
        template2.setTemplateClassify(templateClassify);
        template2.setTemplateName(templateName);
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
                                 @RequestParam(value = "filename") String filename,
                                 @RequestParam(value = "path") String path,
                                 @RequestParam(value = "templateClassify") Integer templateClassify,
                                 @RequestParam(value = "encoded") String encoded){
        Template2 template2 = new Template2();
        template2.setLastModifyUserId(getCurrentUserId(request));
        template2.setEncoded(encoded);
        template2.setFilename(filename);
        template2.setPath(path);
        template2.setTemplateClassify(templateClassify);
        template2.setTemplateName(templateName);
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
    @CheckToken
    @CheckAuth( name = "template2:upload" )
    @RequestMapping(value = "/uploadTemplate2", method = RequestMethod.POST)
    public String uploadTemplate2(HttpServletRequest request,
                                 @RequestParam(value = "baseCode") String baseCode,
                                 @RequestParam(value = "id") Long id) throws BizException{
        Template2 template2 = template2Biz.getTemplate2(id);
        Template2Base template2Base = template2Biz.getTemplate2Base();
        byte[] bytes = FileUtil.base64Upload(baseCode);
        String fileName = StringUtils.concatUrl(template2Base.getBasePath(), template2.getPath(), template2.getFilename());
        FileUtil.fileUpload(bytes, fileName);
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
        template2Base.setBasePath(basePath);
        template2Biz.saveTemplate2Base(template2Base);
        return ApiResponse.returnSuccess(template2Base);
    }

}
