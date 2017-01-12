package com.cn.cms.service.impl;

import com.cn.cms.dao.OtherDao;
import com.cn.cms.service.OtherService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/26.
 */
@Repository
public class OtherServiceImpl implements OtherService {

    @Resource
    private OtherDao otherDao;

    @Override
    public List<Map<String, Object>> execSql(String sql) {
        return otherDao.execSql(sql);
    }
}
