package com.cn.cms.utils;

import com.cn.cms.contants.StaticContants;
import lombok.Getter;
import lombok.Setter;

/**
 * 计算相关内容
 * Created by zhangyang on 16/11/23.
 */
public class Page {

    @Setter
    private int start;

    @Getter
    @Setter
    private int pageSize = StaticContants.PAGE_SIZE;

    @Setter
    private int end ;

    @Getter
    @Setter
    private int count;

    @Setter
    private int pageCount ;

    @Getter
    @Setter
    private int page;

    public Page(int page, int pageSize, int count){
        this.page = page;
        this.pageSize = pageSize;
        this.count = count;
    }

    public Page(int page, int pageSize){
        this.page = page;
        this.pageSize = pageSize;
    }

    public int getStart() {
        return (page-1) * pageSize;
    }

    public int getEnd() {
        return page*pageSize-1;
    }

    public int getPageCount() {
        return (count-1)/pageSize + 1;
    }

}
