package com.cn.cms.po;

import com.cn.cms.contants.StaticContants;
import lombok.Getter;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 碎片PO
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
@Getter
@Setter
public class Fragment extends Base {

    /**
     * 碎片分类ID
     */
    private Long channelId;

    /**
     * 碎片分类ID
     */
    private Long fragmentClassifyId;

    /**
     * 碎片当前内容
     */
    private String fragmentContent;

    /**
     * 碎片名称
     */
    private String fragmentName;

    /**
     * 排序值
     */
    private Integer sortNum;

    /**
     * 碎片模版
     */
    private String fragmentModel;

    /**
     * 碎片维护人
     */
    private String editUserId;

    /**
     * 碎片维护时间
     */
    private Date editTime;

    /**
     * 碎片维护人名称
     */
    private String editUserName = "";

    /**
     * 碎片维护时间串
     */
    private String editTimeStr = "";


    public String getEditTimeStr(){
        if(editTime!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(editTime);
        }
        return editTimeStr;
    }

}
