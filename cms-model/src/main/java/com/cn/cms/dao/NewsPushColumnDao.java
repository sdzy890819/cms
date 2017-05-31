package com.cn.cms.dao;

import com.cn.cms.po.NewsPushColumn;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Dao层
 * Created by ADMIN on 16/11/17.
 */
public interface NewsPushColumnDao {

    void saveNewsPushColumns(@Param(value = "list") List<NewsPushColumn> list);

    List<NewsPushColumn> findListByNewsId(@Param(value = "newsId") Long newsId);

    void delNewsPushColumns(@Param(value = "newsId") Long newsId);

}
