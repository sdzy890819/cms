package com.cn.cms.po;

import com.cn.cms.enums.EncodedEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import com.cn.cms.enums.UploadEnum;
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

    /**
     * 是否上传
     */
    @Getter
    @Setter
    protected Integer upload = UploadEnum.NO.getType();


    protected String uploadStr;

    public String getTemplateClassifyStr() {
        return TemplateClassifyEnum.get(templateClassify).getName();
    }

    public String getUploadStr(){
        UploadEnum uploadEnum = UploadEnum.get(upload);
        if(uploadEnum!=null){
            return uploadEnum.getName();
        }
        return uploadStr;
    }

}
