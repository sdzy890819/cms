package com.cn.cms.po;

import com.cn.cms.enums.RecommendEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Created by ADMIN on 17/1/16.
 */
@Getter
@Setter
public class NewsRecommend extends News {

    /**
     * 推荐标题
     */
    private String recommendTitle;

    /**
     * 推荐内容
     */
    private String recommendDescription;

    /**
     * 推荐图片地址
     */
    private String recommendImages;

    /**
     * 推荐栏目ID
     */
    private Long recommendColumnId;

    /**
     * 推荐栏目名称
     */
    private String recommendColumnName;

    /**
     * 推荐人
     */
    private String recommendUserId;

    /**
     * 推荐人名称
     */
    private String recommendUserName;

    /**
     * 推荐时间
     */
    private Date recommendTime;


    @Override
    public Long getSort(){
        return super.sort;
    }

    @Override
    public void setSort(Long sort){
        super.sort = sort;
    }
}
