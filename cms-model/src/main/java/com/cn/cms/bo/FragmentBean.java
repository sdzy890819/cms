package com.cn.cms.bo;

import com.cn.cms.po.Fragment;
import lombok.Getter;
import lombok.Setter;


/**
 * Created by zhangyang on 16/12/2.
 */
@Getter
@Setter
public class FragmentBean  {

    /**
     * 碎片分类ID
     */
    private Long fragmentClassifyId;

    /**
     * 碎片当前内容
     */
    private String fragmentContent;

    /**
     * 碎片名称
     */
    private String fragmentName;

    /**
     * 排序值
     */
    private int sortNum;

    /**
     * 碎片模版
     */
    private String fragmentModel;

    /**
     * 主键ID
     */
    private Long id ;


    /**
     * 最后修改人ID
     */
    private String lastModifyUserId;


    public FragmentBean(Fragment fragment){
        this.fragmentClassifyId = fragment.getFragmentClassifyId();
        this.fragmentContent = fragment.getFragmentContent();
        this.fragmentName = fragment.getFragmentName();
        this.sortNum = fragment.getSortNum();
        this.fragmentModel = fragment.getFragmentModel();
        this.id = fragment.getId();
        this.lastModifyUserId = fragment.getLastModifyUserId();
    }

}
