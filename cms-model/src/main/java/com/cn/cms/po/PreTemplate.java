package com.cn.cms.po;

import com.cn.cms.enums.BuildModeEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by ADMIN on 17/1/3.
 */
@Getter
@Setter
public class PreTemplate extends Base {

    /**
     * 模版名
     */
    private String name;

    /**
     * 发布目录
     */
    private String publishPath;

    /**
     * 生成方式
     */
    private Integer buildMode;

    private String buildModeStr;

    /**
     * 后缀名html。shtml或者其他
     */
    private String filenameSuffix;

    /**
     * 模版路径,包含文件名
     */
    private String templatePath;

    /**
     * 模版类型。
     */
    private Integer templateClassify;

    private String templateClassifyStr;

    public String getTemplateClassifyStr(){
        if(templateClassify!=null){
            return TemplateClassifyEnum.get(templateClassify).getName();
        }
        return templateClassifyStr;
    }

    public String getBuildModeStr(){
        if(buildMode!=null){
            return BuildModeEnum.get(buildMode).getName();
        }
        return buildModeStr;
    }
}
