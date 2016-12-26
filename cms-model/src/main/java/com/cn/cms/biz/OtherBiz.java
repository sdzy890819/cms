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
        content = content.toUpperCase().trim();
        if(content.startsWith("SELECT ") && content.indexOf("UPDATE ") < 0 &&
                content.indexOf("DELETE ") < 0 && content.indexOf("INSERT ") < 0 && content.indexOf("CREATE ") < 0 &&
                content.indexOf("SHOW ") < 0){
            if(content.indexOf("LIMIT")>0){
                content = content.substring(0,content.indexOf("LIMIT"));
            }
            content = content.concat("LIMIT ").concat(String.valueOf(page.getStart())).concat(",").concat(String.valueOf(page.getPageSize()));
            otherService.execSql(content);
        }
        return null;
    }

}
