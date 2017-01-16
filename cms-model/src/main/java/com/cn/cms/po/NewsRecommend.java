package com.cn.cms.po;

import com.cn.cms.enums.RecommendEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by zhangyang on 17/1/16.
 */
@Getter
@Setter
public class NewsRecommend extends News {

    /**
     * 推荐排序
     */
    private Integer sort = 1000;

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
     * 推荐人
     */
    private String recommendUserId;

    /**
     * 是否推荐
     */
    private Integer recommend = RecommendEnum.NO.getType();

}
