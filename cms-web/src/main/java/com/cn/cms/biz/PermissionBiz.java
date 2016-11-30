package com.cn.cms.biz;

import com.cn.cms.bo.PermissionBean;
import com.cn.cms.contants.RedisKeyContants;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.enums.PermissionTypeEnum;
import com.cn.cms.middleware.JedisClient;
import com.cn.cms.po.Permission;
import com.cn.cms.po.PositionPermission;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        List<PermissionBean> beanList = new ArrayList<PermissionBean>();
        Map<Long,List<Permission>>  map = new HashMap<Long, List<Permission>>();
        for(int i=0;i<list.size();i++){
            Permission permission = list.get(i);
            PermissionBean permissionBean = new PermissionBean();
            if(permission.getType() == PermissionTypeEnum.MENU.getType()){
                permissionBean.setPermission(permission);
                beanList.add(permissionBean);
            }else{
                List<Permission> tmpList = map.get(permission.getParentId());
                if(StringUtils.isEmpty(tmpList)) {
                    tmpList = new ArrayList<Permission>();

                }
                tmpList.add(permission);
                map.put(permission.getParentId(), tmpList);
            }
        }
        for(int i=0; i<beanList.size();i++){
            PermissionBean tmp = beanList.get(i);
            tmp.setPermissions(map.get(tmp.getPermission().getParentId()));
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

    /**
     * 根据用户ID 开启权限
     * @param userId
     */
    public void setPermissionRedis(String userId){
        List<Permission> permissions = userService.findPermissionForPositionIds(userId);
        if(StringUtils.isNotEmpty(permissions)) {
            Map<String, Double> map = new HashMap<String, Double>();
            for (int i = 0; i < permissions.size(); i++) {
                Permission permission = permissions.get(i);
                map.put(permission.getPermission(), new Double((double)permission.getSort()));
            }
            jedisClient.zadd(RedisKeyContants.getPermission(userId), map, StaticContants.DEFAULT_SECONDS);
        }
    }

    /**
     * 根据用户ID 删除权限
     * @param userId
     */
    public void delPermissionRedis(String userId){
        jedisClient.del(RedisKeyContants.getPermission(userId));
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
}

