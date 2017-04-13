DROP INDEX `un_user_id` ON `user`;
DROP INDEX `un_user_name` ON `user`;
DROP INDEX `un_position_name` ON `position`;
DROP INDEX `un_permission_position` ON `position_permission`;
DROP INDEX `position_id_sel` ON `position_permission`;
DROP INDEX `un_user_position_del` ON `user_position`;

ALTER TABLE `operation_history`DROP PRIMARY KEY;
ALTER TABLE `user`DROP PRIMARY KEY;
ALTER TABLE `position`DROP PRIMARY KEY;
ALTER TABLE `permission`DROP PRIMARY KEY;
ALTER TABLE `position_permission`DROP PRIMARY KEY;
ALTER TABLE `user_position`DROP PRIMARY KEY;

DROP TABLE `operation_history`;
DROP TABLE `user`;
DROP TABLE `position`;
DROP TABLE `permission`;
DROP TABLE `position_permission`;
DROP TABLE `user_position`;

CREATE TABLE `operation_history` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(2) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '地址',
`description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '描述',
`user_id` varchar(255) NULL,
`curr_time` datetime NULL COMMENT '当前时间',
`body` text NULL COMMENT 'body',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='操作记录表';

CREATE TABLE `user` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`user_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '用户名',
`head_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '头像',
`real_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '真名',
`pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '密码',
`user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '用户ID，常用',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`idfa` varchar(200) NULL COMMENT '多个idfa可以使用逗号分割',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
UNIQUE INDEX `un_user_id` (`user_id`),
UNIQUE INDEX `un_user_name` (`user_name`, `del_tag`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='用户表';

CREATE TABLE `position` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`position_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '职位名',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
UNIQUE INDEX `un_position_name` (`position_name`, `del_tag`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='职位表';

CREATE TABLE `permission` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`name` varchar(255) NULL COMMENT '说明',
`description` varchar(255) NULL COMMENT '说明',
`type` int NULL COMMENT '类型。MENU 为 1 BUTTON为2',
`url` varchar(255) NULL COMMENT '链接',
`sort` int NULL COMMENT '排序',
`parent_id` bigint NULL COMMENT '父ID',
`show_flag` int NULL COMMENT '1为YES 0为NO',
`permission` varchar(255) NULL,
`platform` tinyint(2) NULL COMMENT '平台',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='权限表';

CREATE TABLE `position_permission` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`position_id` bigint NULL COMMENT '职位ID',
`permission_id` bigint NULL COMMENT '权限ID',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
UNIQUE INDEX `un_permission_position` (`position_id`, `permission_id`, `del_tag`),
INDEX `position_id_sel` (`position_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='职位－权限对照表';

CREATE TABLE `user_position` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`position_id` bigint NULL COMMENT '用户组ID',
`user_id` varchar(20) NULL COMMENT '用户ID',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
UNIQUE INDEX `un_user_position_del` (`user_id`, `position_id`, `del_tag`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='职位对应员工表';

