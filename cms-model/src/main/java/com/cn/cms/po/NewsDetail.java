package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * 新闻详情PO
 * Created by 华盛信息科技有限公司(HS) on 16/11/17.
 */
@Getter
@Setter
public class NewsDetail extends Base implements Cloneable{

    /**
     * 详细内容
     */
    private String content;

    /**
     * 新闻ID
     */
    private Long newsId;

    public NewsDetail(){

    }

    public NewsDetail(NewsDetail newsDetail){
        if(newsDetail!=null) {
            this.setContent(newsDetail.getContent());
            this.setNewsId(newsDetail.getNewsId());
            this.setId(newsDetail.getId());
            this.setCreateTime(newsDetail.getCreateTime());
            this.setUpdateTime(newsDetail.getUpdateTime());
            this.setLastModifyUserName(newsDetail.getLastModifyUserName());
            this.setLastModifyUserId(newsDetail.getLastModifyUserId());
            this.setDelTag(newsDetail.getDelTag());
        }
    }


    @Override
    public NewsDetail clone() {
        try {
            return (NewsDetail) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return null;
    }
}
