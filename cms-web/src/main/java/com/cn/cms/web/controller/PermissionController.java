package com.cn.cms.web.controller;

import com.cn.cms.biz.PermissionBiz;
import com.cn.cms.bo.PermissionBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.po.Permission;
import com.cn.cms.po.Position;
import com.cn.cms.po.PositionPermission;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;

/**
 * Created by zhangyang on 16/11/29.
 */
@Controller
@RequestMapping(value="/webapi/permission/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class PermissionController extends BaseController {


    @Resource
    private PermissionBiz permissionBiz;

    /**
     * 获取所有的权限列表
     * @return
     */
    @CheckToken
    @CheckAuth( name = "permission:read" )
    @RequestMapping(value = "/listPermission",method = RequestMethod.GET)
    public String listPermission(){
        List<PermissionBean> list = this.permissionBiz.findPermissionListAndSort();
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 获取当前用户组权限ID列表
     * @param request
     * @param positionId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "positionpermission:read" )
    @RequestMapping(value = "/listPositionPermission",method = RequestMethod.GET)
    public String listPositionPermission(HttpServletRequest request, @RequestParam("positionId") Long positionId){
        List<Long> list = this.permissionBiz.findPositionPermission(positionId);
        return ApiResponse.returnSuccess(list);
    }


    /**
     * 新增权限
     * @param request
     * @param name
     * @param description
     * @param type
     * @param url
     * @param sort
     * @param parentId
     * @param showFlag
     * @param permission
     * @return
     */
    @CheckToken
    @CheckAuth( name = "permission:write" )
    @RequestMapping(value = "/createPermission",method = RequestMethod.POST)
    public String createPermission(HttpServletRequest request,
                                   @RequestParam(value = "name")String name,
                                   @RequestParam(value = "description")String description,
                                   @RequestParam(value = "type")Integer type,
                                   @RequestParam(value = "url")String url,
                                   @RequestParam(value = "sort")Integer sort,
                                   @RequestParam(value = "parentId")Long parentId,
                                   @RequestParam(value = "showFlag")Integer showFlag,
                                   @RequestParam(value = "permission")String permission,
                                   @RequestParam(value = "platform") Integer platform){
        Permission p = new Permission();
        p.setLastModifyUserId(getCurrentUserId(request));
        p.setDescription(description);
        p.setName(name);
        p.setParentId(parentId);
        p.setPermission(permission);
        p.setShowFlag(showFlag);
        p.setSort(sort);
        p.setType(type);
        p.setUrl(url);
        p.setPlatform(platform);
        this.permissionBiz.createPermission(p);
        return ApiResponse.returnSuccess();
    }

    /**
     * 权限修改
     * @param request
     * @param name
     * @param description
     * @param type
     * @param url
     * @param sort
     * @param showFlag
     * @param permission
     * @return
     */
    @CheckToken
    @CheckAuth( name = "permission:update" )
    @RequestMapping(value = "/updatePermission",method = RequestMethod.POST)
    public String updatePermission(HttpServletRequest request,
                                   @RequestParam(value = "id",required = false)Long id,
                                   @RequestParam(value = "name",required = false)String name,
                                   @RequestParam(value = "description",required = false)String description,
                                   @RequestParam(value = "type",required = false)Integer type,
                                   @RequestParam(value = "url",required = false)String url,
                                   @RequestParam(value = "sort",required = false)Integer sort,
                                   @RequestParam(value = "showFlag",required = false)Integer showFlag,
                                   @RequestParam(value = "permission",required = false)String permission,
                                   @RequestParam(value = "platform",required = false) Integer platform){
        Permission old = this.permissionBiz.findPermission(id);
        if(old == null){
            return ApiResponse.returnFail(StaticContants.ERROR_PERMISSION_NOT_FOUND);
        }
        old.setLastModifyUserId(getCurrentUserId(request));
        if(StringUtils.isNotBlank(description)){
            old.setDescription(description);
        }
        if(StringUtils.isNotBlank(name)){
            old.setName(name);
        }
        if(StringUtils.isNotBlank(permission)){
            old.setPermission(permission);
        }
        if(showFlag!=null && showFlag >= 0 ){
            old.setShowFlag(showFlag);
        }
        if(sort!=null && sort >= 0){
            old.setSort(sort);
        }
        if(type!=null && type >= 0){
            old.setType(type);
        }
        if(StringUtils.isNotBlank(url)){
            old.setUrl(url);
        }
        if(platform !=null && platform >-1){
            old.setPlatform(platform);
        }
        this.permissionBiz.updatePermission(old);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除权限信息
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "permission:delete" )
    @RequestMapping(value = "/delPermission",method = RequestMethod.GET)
    public String delPermission(HttpServletRequest request,@RequestParam("id")Long id){
        String userID = getCurrentUserId(request);
        permissionBiz.delPermission(id, userID);
        return ApiResponse.returnSuccess();
    }


    /**
     * 设置用户组的权限.
     * permissionIds 用逗号分割
     * @param request
     * @param positionId
     * @param permissionIds
     * @return
     */
    @CheckToken
    @CheckAuth( name = "positionpermission:write" )
    @RequestMapping(value = "/setPositionPermissions",method = RequestMethod.POST)
    public String setPositionPermissions(HttpServletRequest request, @RequestParam("positionId") Long positionId,
                                        @RequestParam("permissionIds") String permissionIds){
        String userID = getCurrentUserId(request);
        this.permissionBiz.createPositionPermission(userID, positionId, permissionIds);
        return ApiResponse.returnSuccess();
    }

    /**
     * 设置用户组权限
     * @param request
     * @param positionId
     * @param permissionId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "positionpermission:write" )
    @RequestMapping(value = "/createPositionPermission",method = RequestMethod.POST)
    public String createPositionPermission(HttpServletRequest request, @RequestParam("positionId") Long positionId,
                                         @RequestParam("permissionId") Long permissionId){
        String userID = getCurrentUserId(request);
        PositionPermission positionPermission = new PositionPermission();
        positionPermission.setPositionId(positionId);
        positionPermission.setPermissionId(permissionId);
        positionPermission.setLastModifyUserId(userID);
        this.permissionBiz.createPositionPermission(positionPermission);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除用户组权限
     * @param request
     * @param positionId
     * @param permissionId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "positionpermission:delete" )
    @RequestMapping(value = "/delPositionPermission",method = RequestMethod.POST)
    public String delPositionPermission(HttpServletRequest request, @RequestParam("positionId") Long positionId,
                                           @RequestParam("permissionId") Long permissionId){
        permissionBiz.delPositionPermission(positionId, permissionId);
        return ApiResponse.returnSuccess();
    }


    /**
     * 获取用户拥有的菜单栏权限
     * @param request
     * @return
     */
    @CheckToken
    @RequestMapping(value = "/currentMenuPermission",method = RequestMethod.GET)
    public String currentMenuPermission(HttpServletRequest request){
        String userID = getCurrentUserId(request);
        List<PermissionBean> list = permissionBiz.getMenuPermission(userID);
        return ApiResponse.returnSuccess(list);
    }

    /**
     * 获取用户Menu下的Button权限。
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @RequestMapping(value = "/currentButtonPermission",method = RequestMethod.GET)
    public String currentButtonPermission(HttpServletRequest request,
                                          @RequestParam(value = "id") Long id){
        String userID = getCurrentUserId(request);
        List<Permission> list = permissionBiz.getButtonPermission(userID, id);
        return ApiResponse.returnSuccess(list);
    }

}
