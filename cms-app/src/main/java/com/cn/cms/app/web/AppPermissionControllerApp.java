package com.cn.cms.app.web;

import com.cn.cms.biz.PermissionBiz;
import com.cn.cms.bo.PermissionBean;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by zhangyang on 17/2/8.
 */
@RestController
@RequestMapping(value="/app/permission/",produces = "application/json; charset=UTF-8")
public class AppPermissionControllerApp extends AppBaseController {

    @Resource
    private PermissionBiz permissionBiz;

    /**
     * 获取用户拥有的菜单栏权限
     * @param request
     * @return
     */
    @CheckToken
    @RequestMapping(value = "/currentMenuPermission",method = RequestMethod.GET)
    public String currentMenuPermission(HttpServletRequest request){
        String userID = getCurrentUserId(request);
        List<PermissionBean> list = permissionBiz.getAppMenuPermission(userID);
        return ApiResponse.returnSuccess(list);
    }

}
