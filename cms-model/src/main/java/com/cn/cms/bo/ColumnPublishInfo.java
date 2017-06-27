package com.cn.cms.bo;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by ADMIN on 2017/6/27.
 */
@Getter
@Setter
public class ColumnPublishInfo {

    /**
     * 栏目ID
     */
    private Long columnId;

    /**
     * 用户
     */
    private String userId;

    /**
     * 信息
     */
    private String message;

    /**
     * 状态
     */
    private int state;


    public enum State{
        EXEC(1, "执行中"),
        FINISH(0, "完成"),
        ERROR(-1, "失败");

        @Getter
        private int type;
        @Getter
        private String message;
        State(int type, String message){
            this.type = type;
            this.message = message;
        }
    }
}
