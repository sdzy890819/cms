package com.cn.cms.po;

import com.cn.cms.enums.EncodedEnum;
import com.cn.cms.enums.JobEnum;
import com.cn.cms.enums.TemplateClassifyEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * 模版PO
 * Created by zhangyang on 16/11/17.
 */

public class Template extends Base {

    /**
     * 模版名称
     */
    @Getter
    @Setter
    private String templateName;

    /**
     * 模版说明
     */
    @Getter
    @Setter
    private String templateDesc;

    /**
     * 模版、发布文件名
     */
    @Getter
    @Setter
    private String filename;

    /**
     * 发布目录
     */
    @Getter
    @Setter
    private String path;

    /**
     * 模版分类、1为首页、2为列表页、3为详情页、4、碎片页
     */
    @Getter
    @Setter
    private int templateClassify = TemplateClassifyEnum.fragment.getType();


    private String templateClassifyStr;

    /**
     * 模版编辑人
     */
    @Getter
    @Setter
    private String userId;

    /**
     * 是否定时生成。1是定时生成。0是触发生成
     */
    @Getter
    @Setter
    private int job = JobEnum.trigger.getType();

    /**
     * 目前支持GBK、UTF-8、BIG5、按照字符串形式存储
     */
    @Getter
    @Setter
    private String encoded = EncodedEnum.utf8.getName();

    /**
     * 频道ID
     */
    @Getter
    @Setter
    private Long channelId;

    /**
     * 排序值
     */
    @Getter
    @Setter
    private int sortNum;

    public String getTemplateClassifyStr() {
        return TemplateClassifyEnum.get(templateClassify).getName();
    }
}
