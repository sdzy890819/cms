package com.cn.cms.biz;

import com.cn.cms.po.Position;
import com.cn.cms.po.UserPosition;
import com.cn.cms.service.UserService;
import com.cn.cms.utils.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangyang on 16/11/25.
 */
@Component
public class UserPositionBiz extends BaseBiz {

    @Resource
    private UserService userService;

    /**
     * 插入用户组
     * @param lastModifyId
     * @param userId
     * @param position
     */
    public void insertUserPositon(String lastModifyId, String userId, Position position){
        List<UserPosition> list =  userService.findUserPosition(userId,position.getId());
        if(StringUtils.isEmpty(list)){
            UserPosition userPosition = new UserPosition();
            userPosition.setUserId(userId);
            userPosition.setLastModifyUserId(lastModifyId);
            userPosition.setPositionId(position.getId());
            userService.insertUserPosition(userPosition);
        }
    }

}
