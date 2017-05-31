package com.cn.cms.bo;

import com.cn.cms.po.Channel;
import com.cn.cms.po.NewsColumn;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by ADMIN on 17/1/6.
 */
@Getter
@Setter
public class RelationColumn {

    private Channel channel;

    private List<NewsColumn> list;

}
