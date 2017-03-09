package com.cn.cms.middleware.po;

import com.cn.cms.enums.ESSearchTypeEnum;
import com.cn.cms.enums.IndexOperEnum;
import com.cn.cms.po.Base;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by 华盛信息科技有限公司(HS) on 17/1/11.
 */
@Getter
@Setter
public class ESearchJobList {

    private Base base;

    private ESSearchTypeEnum esSearchTypeEnum;

    private IndexOperEnum indexOperEnum;
}
