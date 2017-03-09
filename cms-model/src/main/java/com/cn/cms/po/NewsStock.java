package com.cn.cms.po;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/3/7.
 */
@Getter
@Setter
public class NewsStock extends Base {

    private String stockCode;

    private String stockName;

    private Long newsId;
}
