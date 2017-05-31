package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 碎片历史表
 * Created by ADMIN on 16/11/17.
 */
@Getter
@Setter
public class FragmentHistory extends Base {

    /**
     * 频道ID
     */
    private Long channelId;

    /**
     * 碎片分类ID
     */
    private Long fragmentClassifyId;

    /**
     * 碎片内容
     */
    private String fragmentContent;

    /**
     * 碎片名称
     */
    private String fragmentName;

    /**
     * 创建人USERID
     */
    private String userId;

    /**
     * 创建时间
     */
    private Date currTime;

    /**
     * 碎片ID
     */
    public Long fragmentId;

}
