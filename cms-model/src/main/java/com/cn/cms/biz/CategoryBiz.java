package com.cn.cms.biz;

import com.alibaba.fastjson.JSONArray;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Category;
import com.cn.cms.service.CategoryService;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/12/7.
 */
@Component
public class CategoryBiz extends BaseBiz {

    @Resource
    private CategoryService categoryService;

    @Resource
    private JedisClient jedisClient;

    /**
     * 获取部门列表
     * @return
     */
    public List<Category> listCategory(){
        String result = jedisClient.get(RedisKeyContants.REDIS_CATEGORY_KEY);
        if(StringUtils.isNotBlank(result)){
            return JSONArray.parseArray(result, Category.class);
        } else {
            List<Category> list = categoryService.findCategoryAll();
            jedisClient.set(RedisKeyContants.REDIS_CATEGORY_KEY, JSONArray.toJSONString(list), StaticContants.DEFAULT_SECONDS);
            return list;
        }
    }

    public Category getCategory(Long id){
        return categoryService.findCategory(id);
    }

    /**
     * 新增部门
     * @param category
     */
    public void saveCategory(Category category) {
        categoryService.saveCategory(category);
        jedisClient.del(RedisKeyContants.REDIS_CATEGORY_KEY);
    }

    /**
     * 修改部门
     * @param category
     */
    public void updateCategory(Category category) {
        categoryService.updateCategory(category);
        jedisClient.del(RedisKeyContants.REDIS_CATEGORY_KEY);
    }

    /**
     * 删除部门
     * @param lastModifyUserId
     * @param id
     */
    public void delCategory(String lastModifyUserId, Long id) {
        categoryService.delCategory(lastModifyUserId, id);
        jedisClient.del(RedisKeyContants.REDIS_CATEGORY_KEY);
    }

}
