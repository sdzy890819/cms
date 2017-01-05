package com.cn.cms.web.controller;

/**
 * Created by zhangyang on 17/1/3.
 */

import com.cn.cms.biz.PreTemplateBiz;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.po.PreTemplate;
import com.cn.cms.po.PreTemplateBase;
import com.cn.cms.utils.Page;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value="/pretemplate/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class PreTemplateController extends BaseController {

    @Resource
    private PreTemplateBiz preTemplateBiz;

    /**
     * 预模版加载分页列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplate:read")
    @RequestMapping(value = "/listPreTemplate", method = RequestMethod.GET)
    public String listPreTemplate(HttpServletRequest request,
                               @RequestParam(value = "page",required = false) Integer page,
                               @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page,pageSize);
        List<PreTemplate> list = preTemplateBiz.listPreTemplate(pageObj);
        Map<String, Object> result = new HashMap<>();
        result.put("page",pageObj);
        result.put("list",list);
        return ApiResponse.returnSuccess(result);
    }

    /**
     * 列表页类型。预模版列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplate:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(){
        List<PreTemplate> list = preTemplateBiz.getPreTemplate(TemplateClassifyEnum.list.getType());
        return ApiResponse.returnSuccess(list);
    }


    /**
     * 详情页类型。预模版列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplate:read")
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    public String detail(){
        List<PreTemplate> list = preTemplateBiz.getPreTemplate(TemplateClassifyEnum.detail.getType());
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 预模版保存
     * @param request
     * @param name
     * @param publishPath
     * @param buildMode
     * @param filenameSuffix
     * @param templatePath
     * @param templateClassify
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplate:write")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(HttpServletRequest request,
                       @RequestParam(value = "name" ,required = false) String name ,
                       @RequestParam(value = "publishPath" ,required = false) String publishPath ,
                       @RequestParam(value = "buildMode" ,required = false) Integer buildMode ,
                       @RequestParam(value = "filenameSuffix" ,required = false) String filenameSuffix ,
                       @RequestParam(value = "templatePath" ,required = false) String templatePath ,
                       @RequestParam(value = "templateClassify" ,required = false) Integer templateClassify){
        PreTemplate p = new PreTemplate();
        p.setBuildMode(buildMode);
        p.setFilenameSuffix(filenameSuffix);
        p.setName(name);
        p.setPublishPath(publishPath);
        p.setTemplateClassify(templateClassify);
        p.setTemplatePath(templatePath);
        p.setLastModifyUserId(getCurrentUserId(request));
        preTemplateBiz.savePreTemplate(p);
        return ApiResponse.returnSuccess();
    }

    /**
     * 修改预模版
     * @param request
     * @param id
     * @param name
     * @param publishPath
     * @param buildMode
     * @param filenameSuffix
     * @param templatePath
     * @param templateClassify
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplate:update")
    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public String update(HttpServletRequest request ,
                       @RequestParam(value = "id") Long id ,
                       @RequestParam(value = "name" ,required = false) String name ,
                       @RequestParam(value = "publishPath" ,required = false) String publishPath ,
                       @RequestParam(value = "buildMode" ,required = false) Integer buildMode ,
                       @RequestParam(value = "filenameSuffix" ,required = false) String filenameSuffix ,
                       @RequestParam(value = "templatePath" ,required = false) String templatePath ,
                       @RequestParam(value = "templateClassify" ,required = false) Integer templateClassify){
        PreTemplate p = new PreTemplate();
        p.setBuildMode(buildMode);
        p.setFilenameSuffix(filenameSuffix);
        p.setName(name);
        p.setPublishPath(publishPath);
        p.setTemplateClassify(templateClassify);
        p.setTemplatePath(templatePath);
        p.setId(id);
        p.setLastModifyUserId(getCurrentUserId(request));
        preTemplateBiz.savePreTemplate(p);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除预模版
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplate:delete")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public String delete(HttpServletRequest request ,
                         @RequestParam(value = "id") Long id){
        preTemplateBiz.delPreTemplate(getCurrentUserId(request), id);
        return ApiResponse.returnSuccess();
    }

    /**
     * 获取预加载模版基础信息
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplatebase:read")
    @RequestMapping(value = "/preTemplateBase", method = RequestMethod.GET)
    public String preTemplateBase(){
        PreTemplateBase preTemplateBase = preTemplateBiz.getPreTemplateBase();
        return ApiResponse.returnSuccess(preTemplateBase);
    }

    /**
     * 修改预加载模版基础信息
     * @param request
     * @param basePath
     * @return
     */
    @CheckToken
    @CheckAuth( name = "pretemplatebase:update")
    @RequestMapping(value = "/base/update", method = RequestMethod.POST)
    public String updateBase(HttpServletRequest request,
                             @RequestParam(value = "id", required = false) Long id,
                             @RequestParam(value = "basePath") String basePath){
        PreTemplateBase preTemplateBase = new PreTemplateBase();
        preTemplateBase.setId(id);
        preTemplateBase.setLastModifyUserId(getCurrentUserId(request));
        preTemplateBase.setBasePath(basePath);
        return ApiResponse.returnSuccess(preTemplateBase);
    }



}
