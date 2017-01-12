package com.cn.cms.middleware.po;

import com.cn.cms.utils.Page;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by zhangyang on 17/1/6.
 */
@Getter
@Setter
public class QueryResult<T> {

    private Page page;

    private List<T> list;
}
