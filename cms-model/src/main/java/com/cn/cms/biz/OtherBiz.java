package com.cn.cms.biz;

import com.cn.cms.service.OtherService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangyang on 16/12/26.
 */
@Component
public class OtherBiz {

    @Resource
    private OtherService otherService;

    public List<Map<String,Object>> getList(String content , Page page){
        String tmp = content.toUpperCase().trim();
        if(tmp.startsWith("SELECT ") && tmp.indexOf("UPDATE ") < 0 &&
                tmp.indexOf("DELETE ") < 0 && tmp.indexOf("INSERT ") < 0 && tmp.indexOf("CREATE ") < 0 &&
                tmp.indexOf("SHOW ") < 0){
            if(tmp.indexOf("LIMIT")>0){
                content = content.substring(0,tmp.indexOf("LIMIT"));
            }
            content = content.concat(" LIMIT ").concat(String.valueOf(page.getStart())).concat(",").concat(String.valueOf(page.getPageSize()));
            otherService.execSql(content);
        }
        return null;
    }

}
