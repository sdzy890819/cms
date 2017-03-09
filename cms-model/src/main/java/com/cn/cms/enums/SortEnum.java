package com.cn.cms.enums;

import lombok.Getter;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/11/29.
 */
public enum SortEnum {

    CREATETIME("创建时间", "createTime", 1),
    UPDATETIME("修改时间", "updateTime", 2),
    BUILDTIME("发布时间", "buildTime", 3),
    WRITETIME("编写时间", "writeTime", 4),
    SORT("推荐排序", "sort", 5);

    @Getter
    private int type;

    @Getter
    private String sort;

    @Getter
    private String name;

    SortEnum(String name, String sort, int type){
        this.type = type;
        this.name = name;
        this.sort = sort;
    }

    public static SortEnum get(int type){
        SortEnum[] a = SortEnum.values();
        for(int i=0; i<a.length; i++){
            SortEnum b = a[i];
            if(b.getType() == type){
                return b;
            }
        }
        return null;
    }
}
