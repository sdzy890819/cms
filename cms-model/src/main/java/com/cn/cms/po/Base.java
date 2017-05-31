package com.cn.cms.po;

import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.DelTagEnum;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 基础Base类。所有的PO都要继承这个类。
 * Created by ADMIN on 16/11/15.
 */
@Getter
@Setter
public class Base implements Serializable{

    /**
     * 主键ID
     */
    protected Long id ;

    /**
     * 创建时间 系统会自动默认当前时间为创建时间
     */
    protected Date createTime;

    /**
     * 修改时间－每次修改都会改变。Table内自动变更
     */
    protected Date updateTime;

    /**
     * 删除标记。默认删除状态为 正常状态。
     */
    protected Integer delTag = DelTagEnum.NORMAL.getType();

    /**
     * 最后修改人ID
     */
    protected String lastModifyUserId;

    /**
     * 创建人ID
     */
    protected String createUserId;

    /**
     * 创建人名称
     */
    protected String createUserName;

    /**
     * 最后修改人名称
     */
    protected String lastModifyUserName;

    /**
     * 创建时间
     */
    protected String createTimeStr;

    /**
     * 修改时间
     */
    protected String updateTimeStr;


    public String getCreateTimeStr(){
        if(createTime!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(createTime);
        }
        return createTimeStr;
    }

    public String getUpdateTimeStr(){
        if(updateTime!=null){
            SimpleDateFormat sdf = new SimpleDateFormat(StaticContants.YYYY_MM_DD_HH_MM_SS);
            return sdf.format(updateTime);
        }
        return updateTimeStr;
    }

}
