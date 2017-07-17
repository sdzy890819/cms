package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by ADMIN on 17/5/10.
 */
@Getter
@Setter
public class NewsPushColumn extends Base {

    private Long newsId;

    /**
     * 新闻频道ID
     */
    private Long channelId;

    /**
     * 新闻栏目ID
     */
    private Long columnId;

    //-------------------------------

    private String channelName;

    private String columnName;

    /**
     * 部门ID
     */
    private Long categoryId;

    /**
     * 是否推送
     */
    private Integer pushColumn = PushColumn.YES.getTab();

    public enum PushColumn{
        YES("YES", 1),
        NO("NO", 0);

        @Getter
        private String text;
        @Getter
        private int tab;

        PushColumn(String text, int tab){
            this.text = text;
            this.tab = tab;
        }

    }

}

