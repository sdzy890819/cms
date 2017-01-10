package com.cn.cms.web.controller;

import com.cn.cms.enums.*;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/20.
 */
@RestController
@RequestMapping(value="/webapi/data/",produces = "application/json; charset=UTF-8")
public class DataController extends BaseController {

    /**
     * 图片是否压缩选项列表接口
     * @return
     */
    @RequestMapping(value = "/compress", method = RequestMethod.GET)
    public String compress(){
        return ApiResponse.returnSuccess(CompressEnum.values());
    }

    /**
     * 按照宽｜高等比压缩选项接口
     * @return
     */
    @RequestMapping(value = "/compressMode", method = RequestMethod.GET)
    public String compressMode(){
        return ApiResponse.returnSuccess(CompressModeEnum.values());
    }

    /**
     * 模版支持的编码选项列表
     * @return
     */
    @RequestMapping(value = "/encoded", method = RequestMethod.GET)
    public String encoded(){
        return ApiResponse.returnSuccess(EncodedEnum.values());
    }

    /**
     * 模版生成方式选项列表
     * @return
     */
    @RequestMapping(value = "/job", method = RequestMethod.GET)
    public String job(){
        return ApiResponse.returnSuccess(JobEnum.values());
    }

    /**
     * 权限类型选项列表
     * @return
     */
    @RequestMapping(value = "/permissionType", method = RequestMethod.GET)
    public String permissionType(){
        return ApiResponse.returnSuccess(PermissionTypeEnum.values());
    }

    /**
     * 模版关系对应类型选项列表
     * @return
     */
    @RequestMapping(value = "/relationType", method = RequestMethod.GET)
    public String relationType(){
        return ApiResponse.returnSuccess(RelationTypeEnum.values());
    }

    /**
     * 权限是否显示在左侧选项列表
     * @return
     */
    @RequestMapping(value = "/showFlag", method = RequestMethod.GET)
    public String showFlag(){
        return ApiResponse.returnSuccess(ShowFlagEnum.values());
    }

    /**
     * 模版类型选项列表
     * @return
     */
    @RequestMapping(value = "/templateClassify", method = RequestMethod.GET)
    public String templateClassify(){
        return ApiResponse.returnSuccess(TemplateClassifyEnum.values());
    }

    /**
     * 图片是否水印选项列表
     * @return
     */
    @RequestMapping(value = "/watermark", method = RequestMethod.GET)
    public String watermark(){
        return ApiResponse.returnSuccess(WatermarkEnum.values());
    }

    /**
     * 文件名生成方式
     * @return
     */
    @RequestMapping(value = "/buildMode", method = RequestMethod.GET)
    public String buildMode(){
        return ApiResponse.returnSuccess(BuildModeEnum.values());
    }


    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public String all(){
        Map<String,Object> map = new HashMap<>();
        map.put("buildMode", BuildModeEnum.values());
        map.put("watermark", WatermarkEnum.values());
        map.put("templateClassify", TemplateClassifyEnum.values());
        map.put("showFlag", ShowFlagEnum.values());
        map.put("relationType", RelationTypeEnum.values());
        map.put("permissionType", PermissionTypeEnum.values());
        map.put("job", JobEnum.values());
        map.put("encoded", EncodedEnum.values());
        map.put("compressMode", CompressModeEnum.values());
        map.put("compress", CompressEnum.values());
        return ApiResponse.returnSuccess(map);
    }



    public static void main(String[] args){
        DataController dataController = new DataController();
        System.out.println(dataController.all());
    }
}
