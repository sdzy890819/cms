package com.cn.cms.po;

import com.cn.cms.enums.EncodedEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 17/1/8.
 */
@Getter
@Setter
public class TemplateBasics extends Base {

    /**
     * 模版名称
     */
    @Getter
    @Setter
    protected String templateName;


    /**
     * 模版、发布文件名
     */
    @Getter
    @Setter
    protected String filename;

    /**
     * 发布目录
     */
    @Getter
    @Setter
    protected String path;

    /**
     * 模版分类、1为首页、2为列表页、3为详情页、4、碎片页
     */
    @Getter
    @Setter
    protected Integer templateClassify;


    protected String templateClassifyStr;

    /**
     * 模版编辑人
     */
    @Getter
    @Setter
    protected String userId;

    /**
     * 目前支持GBK、UTF-8、BIG5、按照字符串形式存储
     */
    @Getter
    @Setter
    protected String encoded = EncodedEnum.utf8.getName();

    public String getTemplateClassifyStr() {
        return TemplateClassifyEnum.get(templateClassify).getName();
    }

}
