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
    private int page = StaticContants.PAGE;

    public Page(int page, int pageSize, int count){
        if(page > 0) {
            this.page = page;
        }
        if(pageSize > 0) {
            this.pageSize = pageSize;
        }
        this.count = count;
    }

    public Page(){}

    public Page(int page, int pageSize){

        if(page >0) {
            this.page = page;
        }

        if(pageSize>0) {
            this.pageSize = pageSize;
        }
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

    public int getNextPage(){
        if(hasNextPage()) {
            return page + 1;
        }
        return page;
    }

    public boolean hasNextPage(){
        if(getPageCount() > page){
            return true;
        }
        return false;
    }

    public boolean isQuery(){
        return this.getCount() > 0 && this.getPage() <= this.getPageCount() ;
    }

}
