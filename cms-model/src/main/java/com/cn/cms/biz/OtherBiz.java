package com.cn.cms.biz;

import com.cn.cms.service.OtherService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by 华盛信息科技有限公司(HS) on 16/12/26.
 */
@Component
public class OtherBiz {

    @Resource
    private OtherService otherService;

    /**
     * 查询分页数据
     * @param content
     * @param page
     * @return
     */
    public List<Map<String,Object>> getList(String content , Page page){
        String tmp = content.toUpperCase().trim();
        content = content.trim();
        if(tmp.startsWith("SELECT ") && tmp.indexOf("UPDATE ") < 0 &&
                tmp.indexOf("DELETE ") < 0 && tmp.indexOf("INSERT ") < 0 && tmp.indexOf("CREATE ") < 0 &&
                tmp.indexOf("SHOW ") < 0){
            if(tmp.indexOf("LIMIT")>0){
                content = content.substring(0,tmp.indexOf("LIMIT"));
            }
            String countContent = "SELECT COUNT(1) " + content.substring(content.indexOf("FROM"), content.length());

            String limitContent = content.concat(" LIMIT ").concat(String.valueOf(page.getStart())).concat(",").concat(String.valueOf(page.getPageSize()));
            Integer count = otherService.execSqlCount(countContent);
            page.setCount(count);
            if(page.isQuery()) {
                return otherService.execSql(limitContent);
            }
        }
        return null;
    }

    /**
     * 查询一条数据
     * @param content
     * @return
     */
    public Map<String, Object> getMap(String content){
        String tmp = content.toUpperCase().trim();
        content = content.trim();
        if(tmp.startsWith("SELECT ") && tmp.indexOf("UPDATE ") < 0 &&
                tmp.indexOf("DELETE ") < 0 && tmp.indexOf("INSERT ") < 0 && tmp.indexOf("CREATE ") < 0 &&
                tmp.indexOf("SHOW ") < 0){
            if(tmp.indexOf("LIMIT")>0){
                content = content.substring(0,tmp.indexOf("LIMIT"));
            }
            content = content.concat(" LIMIT 1 ");
            return otherService.execSqlOne(content);
        }
        return null;
    }

}
