package com.cn.cms.biz;

import com.alibaba.fastjson.JSONArray;
import com.cn.cms.bo.PermissionBean;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PermissionTypeEnum;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Permission;
import com.cn.cms.po.PositionPermission;
import com.cn.cms.po.UserPosition;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by zhangyang on 16/11/29.
 */
@Component
public class PermissionBiz extends BaseBiz{

    @Resource
    private UserService userService;

    @Resource
    private JedisClient jedisClient;


    /**
     * 获取权限列表,按照sort排序
     * @return
     */
    public List<PermissionBean> findPermissionListAndSort(){
        List<Permission> list = userService.findPermissionList();
        List<PermissionBean> beanList = new ArrayList<>();
        Map<Long,List<Permission>>  map = new HashMap<>();
        for(int i=0;i<list.size();i++){
            Permission permission = list.get(i);
            PermissionBean permissionBean = new PermissionBean();
            if(permission.getType() == PermissionTypeEnum.MENU.getType()){
                permissionBean.setPermission(permission);
                beanList.add(permissionBean);
            }else{
                List<Permission> tmpList = map.get(permission.getParentId());
                if(StringUtils.isEmpty(tmpList)) {
                    tmpList = new ArrayList<>();

                }
                tmpList.add(permission);
                map.put(permission.getParentId(), tmpList);
            }
        }
        for(int i=0; i<beanList.size();i++){
            PermissionBean tmp = beanList.get(i);
            tmp.setPermissions(map.get(tmp.getPermission().getId()));
        }
        return beanList;
    }

    /**
     * 查询用户所有的权限ID
     * @param positionId
     * @return
     */
    public List<Long> findPositionPermission(Long positionId){
        return userService.findPositionPermission(positionId);
    }

    /**
     * 创建新权限
     * @param permission
     */
    public void createPermission(Permission permission){
        this.userService.createPermission(permission);
    }

    /**
     * 修改权限
     * @param permission
     */
    public void updatePermission(Permission permission){
        this.userService.updatePermission(permission);
    }

    /**
     * 根据ID查询权限信息
     * @param id
     * @return
     */
    public Permission findPermission(Long id){
        return this.userService.findPermission(id);
    }

    /**
     * 删除权限
     * @param id
     * @param lastModifyUserId
     */
    public void delPermission(Long id, String lastModifyUserId){
        userService.delPermission(id, lastModifyUserId);
    }

    /**
     * 用户组设置权限
     * @param positionId
     * @param permissionIds
     */
    public void createPositionPermission(String lastModifyUserId, Long positionId, String permissionIds){
        String[] pIds = permissionIds.split(",");
        List<PositionPermission> list = new ArrayList<PositionPermission>();
        for(int i=0;i<pIds.length;i++){
            PositionPermission positionPermission = new PositionPermission();
            positionPermission.setPermissionId(Long.parseLong(pIds[i]));
            positionPermission.setPositionId(positionId);
            positionPermission.setLastModifyUserId(lastModifyUserId);
            list.add(positionPermission);
        }

        userService.createPositionPermission(positionId, list);
    }

    public void createPositionPermission(PositionPermission positionPermission){
        userService.savePositionPermission(positionPermission);
    }

    public void delPositionPermission(Long positionId, Long permissionId){
        userService.delPositionPermission(positionId, permissionId);
    }

    /**
     * 根据用户ID 开启权限
     * @param userId
     */
    public void setPermissionRedis(String userId){
        List<Permission> permissions = userService.findPermissionForPositionIds(userId);
        if(StringUtils.isNotEmpty(permissions)) {
            Map<String, Double> map = new HashMap<>();
            List<Permission> permissionList = new ArrayList<>();
            Map<Long, List<Permission>> childMap = new HashMap<>();
            for (int i = 0; i < permissions.size(); i++) {
                Permission permission = permissions.get(i);
                map.put(permission.getPermission(), new Double((double)permission.getSort()));
                if(permission.getType() == PermissionTypeEnum.MENU.getType()){
                    permissionList.add(permission);
                }else if(permission.getType() == PermissionTypeEnum.BUTTON.getType()){
                    List<Permission> tmp = childMap.get(permission.getParentId());
                    if(StringUtils.isEmpty(tmp)){
                        tmp = new ArrayList<>();
                    }
                    tmp.add(permission);
                    childMap.put(permission.getParentId() ,tmp);
                }
            }
            Iterator<Map.Entry<Long,List<Permission>>> it = childMap.entrySet().iterator();
            Map<String,String> redisMap = new HashMap<>();
            while(it.hasNext()){
                Map.Entry<Long,List<Permission>> entry = it.next();
                redisMap.put(RedisKeyContants.getButtonParentPermission(userId ,entry.getKey()), JSONArray.toJSONString(entry.getValue()));
            }
            delPermissionRedis(userId);
            //验证用户权限
            jedisClient.zadd(RedisKeyContants.getPermission(userId), map, StaticContants.DEFAULT_SECONDS);
            //获取MENU列表
            jedisClient.set(RedisKeyContants.getMenuPermission(userId), JSONArray.toJSONString(permissionList), StaticContants.DEFAULT_SECONDS);
            jedisClient.set(redisMap,StaticContants.DEFAULT_SECONDS); //根据父权限获取子权限的列表
        }
    }

    /**
     * 根据用户ID 删除权限
     * @param userId
     */
    public void delPermissionRedis(String userId){
        jedisClient.del(RedisKeyContants.getPermission(userId));
        jedisClient.del(RedisKeyContants.getMenuPermission(userId));
    }

    /**
     * 根据用户ID、权限检测用户权限
     * @param userId
     * @param permission
     * @return
     */
    public boolean checkPermission(String userId, String permission){
        long result = jedisClient.zrank(RedisKeyContants.getPermission(userId), permission);
        if(result > 0){
            return true;
        }
        return false;
    }

    /**
     * 获取用户菜单权限
     * @param userId
     * @return
     */
    public List<Permission> getMenuPermission(String userId){
        String result = jedisClient.get(RedisKeyContants.getMenuPermission(userId));
        if(StringUtils.isNotBlank(result)) {
            return JSONArray.parseArray(result, Permission.class);
        }
        return null;
    }

    /**
     * 获取用户Button权限
     * @param userId
     * @param parentId
     * @return
     */
    public List<Permission> getButtonPermission(String userId, Long parentId){
        String result = jedisClient.get(RedisKeyContants.getButtonParentPermission(userId ,parentId));
        if(StringUtils.isNotBlank(result)) {
            return JSONArray.parseArray(result, Permission.class);
        }
        return null;
    }

}

