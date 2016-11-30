package com.cn.cms.web.controller;

import com.cn.cms.biz.PositionBiz;
import com.cn.cms.biz.UserPositionBiz;
import com.cn.cms.contants.StaticContants;
import com.cn.cms.po.Position;
import com.cn.cms.utils.Page;
import com.cn.cms.web.ann.CheckAuth;
import com.cn.cms.web.ann.CheckToken;
import com.cn.cms.web.result.ApiResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户组操作
 * Created by zhangyang on 16/11/25.
 */

@Controller
@RequestMapping(value="/position/",produces = "application/json; charset=UTF-8")
@ResponseBody
public class PositionController extends BaseController{

    @Resource
    private PositionBiz positionBiz;

    @Resource
    private UserPositionBiz userPositionBiz;


    /**
     * 创建用户组
     * @param request
     * @param positionName
     * @return
     */
    @CheckToken
    @CheckAuth( name = "position:write" )
    @RequestMapping(value = "/createPosition",method = RequestMethod.POST)
    public String createPosition(HttpServletRequest request,@RequestPart(value="positionname") String positionName){
        String userID = getCurrentUserId(request);
        Position position = positionBiz.findPositionName(positionName);
        if( position != null ){
            return ApiResponse.returnFail(StaticContants.ERROR_POSITION_RE);
        }
        positionBiz.insertPosition(userID,positionName);
        return ApiResponse.returnSuccess();
    }

    /**
     * 删除用户组
     * @param request
     * @param id
     * @return
     */
    @CheckToken
    @CheckAuth( name = "position:delete" )
    @RequestMapping(value = "/delPosition",method = RequestMethod.GET)
    public String delPosition(HttpServletRequest request, @RequestParam(value="id")Long id){
        String userID = getCurrentUserId(request);
        positionBiz.delPosition(userID, id);
        return ApiResponse.returnSuccess();
    }


    /**
     * 修改用户组
     * @param request
     * @param positionName
     * @return
     */
    @CheckToken
    @CheckAuth( name = "position:update" )
    @RequestMapping(value = "/updatePosition",method = RequestMethod.POST)
    public String updatePosition(HttpServletRequest request,
                                 @RequestPart(value="positionName") String positionName,
                                 @RequestPart(value="id") Long id){
        String userID = getCurrentUserId(request);
        positionBiz.updatePosition(userID, positionName, id);
        return ApiResponse.returnSuccess();
    }

    /**
     * 分页获取用户组列表
     * @param page
     * @param pageSize
     * @return
     */
    @CheckToken
    @CheckAuth( name = "position:read" )
    @RequestMapping(value = "/listPosition",method = RequestMethod.GET)
    public String listPosition(@RequestParam(value = "page",defaultValue = "1") Integer page,
                       @RequestParam(value="pageSize",required = false)Integer pageSize){
        Page pageObj = new Page(page, pageSize);
        List<Position> positions = positionBiz.listPosition(pageObj);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", pageObj);
        map.put("list", positions);
        return ApiResponse.returnSuccess(map);
    }


    /**
     * 给用户分配组
     * @param request
     * @param userId
     * @param positionId
     * @return
     */
    @CheckToken
    @CheckAuth( name = "userposition:update" )
    @RequestMapping(value = "/setUserPosition",method = RequestMethod.GET)
    public String setUserPosition(HttpServletRequest request,
                                  @RequestParam("userId")String userId,
                                  @RequestParam("positionId")Long positionId
    ){
        String userID = this.getCurrentUserId(request);
        Position position = positionBiz.findPosition(positionId);
        if(position == null){
            return ApiResponse.returnFail(StaticContants.ERROR_NO_POSITION);
        }
        userPositionBiz.insertUserPositon(userID,userId,position);
        return ApiResponse.returnSuccess();
    }
}
