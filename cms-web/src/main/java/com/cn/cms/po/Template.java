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
@Getter
@Setter
public class Template extends Base {

    /**
     * 模版名称
     */
    private String templateName;

    /**
     * 模版说明
     */
    private String templateDesc;

    /**
     * 模版、发布文件名
     */
    private String filename;

    /**
     * 发布目录
     */
    private String path;

    /**
     * 模版分类、1为首页、2为列表页、3为详情页、4、碎片页
     */
    private int templateClassify = TemplateClassifyEnum.fragment.getType();

    /**
     * 模版编辑人
     */
    private String userId;

    /**
     * 是否定时生成。1是定时生成。0是触发生成
     */
    private int job = JobEnum.trigger.getType();

    /**
     * 目前支持GBK、UTF-8、BIG5、按照字符串形式存储
     */
    private String encoded = EncodedEnum.utf8.getName();

    /**
     * 频道ID
     */
    private Long channelId;

    /**
     * 排序值
     */
    private int sortNum;
}
