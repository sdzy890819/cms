package com.cn.cms.biz;

import com.cn.cms.po.Position;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * 用户组相关操作业务类
 * Created by ADMIN on 16/11/24.
 */
@Component
public class PositionBiz extends BaseBiz {

    @Resource
    private UserService userService;

    /**
     * 根据ID获取用户组
     * @param id
     * @return
     */
    public Position findPosition(Long id){
        return userService.findPosition(id);
    }

    /**
     * 根据用户组名获取用户组信息
     * @param positionName
     * @return
     */
    public Position findPositionName(String positionName){
        return userService.findPositionName(positionName);
    }

    /**
     * 分页获取用户组列表
     * @param page
     * @return
     */
    public List<Position> listPosition(Page page){
        int count  = userService.queryPositionCount();
        page.setCount(count);
        if(page.isQuery()) {
            List<Position> positions = userService.findPositionList(page);
            return positions;
        }
        return null;
    }

    public List<Position> listPosition(){
        return userService.findPositionListAll();
    }

    /**
     * 新建用户组
     * @param lastModifyUserId
     * @param positionName
     */
    public void insertPosition(String lastModifyUserId, String positionName){
        Position position = new Position();
        position.setLastModifyUserId(lastModifyUserId);
        position.setCreateUserId(lastModifyUserId);
        position.setPositionName(positionName);
        userService.insertPosition(position);
    }

    /**
     * 修改用户组信息
     * @param lastModifyUserId
     * @param positionName
     * @param id
     */
    public void updatePosition(String lastModifyUserId, String positionName, Long id){
        Position position = new Position();
        position.setId(id);
        position.setPositionName(positionName);
        position.setLastModifyUserId(lastModifyUserId);
        userService.updatePosition(position);
    }

    /**
     * 删除用户组信息
     * @param lastModifyUserId
     * @param id
     */
    public void delPosition(String lastModifyUserId, Long id){
        userService.deletePosition(lastModifyUserId, id);
    }
}
