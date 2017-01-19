package com.cn.cms.biz;

import com.cn.cms.exception.BizException;
import com.cn.cms.middleware.TongjiClient;
import com.cn.cms.middleware.bean.TongjiData;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Created by zhangyang on 17/1/19.
 */
@Component
public class IndexBiz extends BaseBiz {

    @Resource
    private TongjiClient tongjiClient;


    public TongjiData indexData() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Calendar calendar = Calendar.getInstance();
        String endDate = sdf.format(calendar.getTime());
        calendar.add(Calendar.DAY_OF_MONTH, -14);
        String startDate = sdf.format(calendar.getTime());
        try {
            return tongjiClient.getDate(startDate, endDate);
        } catch (Exception e) {
            log.error("获取统计数据失败. ", e);
        }
        return null;
    }
}
