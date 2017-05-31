package com.cn.cms.service.impl;

import com.cn.cms.dao.OtherDao;
import com.cn.cms.service.OtherService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by ADMIN on 16/12/26.
 */
@Repository
public class OtherServiceImpl implements OtherService {

    @Resource
    private OtherDao otherDao;

    @Override
    public List<Map<String, Object>> execSql(String sql) {
        return otherDao.execSql(sql);
    }

    @Override
    public Integer execSqlCount(String sql) {
        return otherDao.execSqlCount(sql);
    }

    @Override
    public Map<String, Object> execSqlOne(String sql) {
        return otherDao.execSqlOne(sql);
    }


}
