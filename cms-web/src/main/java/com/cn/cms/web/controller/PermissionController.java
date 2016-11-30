package com.cn.cms.web.controller;

import com.cn.cms.biz.PermissionBiz;
import com.cn.cms.bo.PermissionBean;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.po.Permission;
import com.cn.cms.po.Position;
import com.cn.cms.utils.StringUtils;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zhangyang on 16/11/29.
 */
@Controller
@RequestMapping(value="/permission/",produces = "application/json; charset=UTF-8")
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
                                   @RequestPart(value = "name")String name,
                                   @RequestPart(value = "description")String description,
                                   @RequestPart(value = "type")Integer type,
                                   @RequestPart(value = "url")String url,
                                   @RequestPart(value = "sort")Integer sort,
                                   @RequestPart(value = "parentId")Long parentId,
                                   @RequestPart(value = "showFlag")Integer showFlag,
                                   @RequestPart(value = "permission")String permission){
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
                                   @RequestPart(value = "id")Long id,
                                   @RequestPart(value = "name")String name,
                                   @RequestPart(value = "description")String description,
                                   @RequestPart(value = "type")Integer type,
                                   @RequestPart(value = "url")String url,
                                   @RequestPart(value = "sort")Integer sort,
                                   @RequestPart(value = "showFlag")Integer showFlag,
                                   @RequestPart(value = "permission")String permission){
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
        if(showFlag >= 0 ){
            old.setShowFlag(showFlag);
        }
        if(sort >= 0){
            old.setSort(sort);
        }
        if(type >= 0){
            old.setType(type);
        }
        if(StringUtils.isNotBlank(url)){
            old.setUrl(url);
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
    @CheckAuth( name = "positionpermission:update" )
    @RequestMapping(value = "/setPositionPermission",method = RequestMethod.POST)
    public String setPositionPermission(HttpServletRequest request, @RequestPart("positionId") Long positionId,
                                        @RequestPart("permissionIds") String permissionIds){
        String userID = getCurrentUserId(request);
        this.permissionBiz.createPositionPermission(userID, positionId, permissionIds);
        return ApiResponse.returnSuccess();
    }


}
