DROP INDEX `publish_sel` ON `news`;
DROP INDEX `column_id_sel` ON `news`;
DROP INDEX `timer_sel` ON `news`;
DROP INDEX `un_news_id` ON `news_detail`;
DROP INDEX `channel_id_sel` ON `news_column`;
DROP INDEX `category_id_` ON `channel`;
DROP INDEX `desc_sort_num` ON `template`;
DROP INDEX `channel_id_sel` ON `template`;
DROP INDEX `classify_sel` ON `template`;
DROP INDEX `job_sel` ON `template`;
DROP INDEX `relation_sel` ON `template_relation`;
DROP INDEX `template_id_sel` ON `template_relation`;
DROP INDEX `desc_sort_num` ON `fragment`;
DROP INDEX `channel_id_sel` ON `fragment`;
DROP INDEX `fragment_classify_id_sel` ON `fragment`;
DROP INDEX `topic_classify_id_sel` ON `topic`;
DROP INDEX `topic_column_id_sel` ON `topic`;
DROP INDEX `fragment_id_del_tag_sel` ON `fragment_history`;
DROP INDEX `user_channel_index` ON `user_channel`;
DROP INDEX `user_id_sel` ON `user_channel`;
DROP INDEX `channel_id_sel` ON `user_channel`;
DROP INDEX `template_classify_sel` ON `template2`;


ALTER TABLE `news`DROP PRIMARY KEY;
ALTER TABLE `news_detail`DROP PRIMARY KEY;
ALTER TABLE `news_column`DROP PRIMARY KEY;
ALTER TABLE `channel`DROP PRIMARY KEY;
ALTER TABLE `category`DROP PRIMARY KEY;
ALTER TABLE `images`DROP PRIMARY KEY;
ALTER TABLE `video_base`DROP PRIMARY KEY;
ALTER TABLE `template`DROP PRIMARY KEY;
ALTER TABLE `template_relation`DROP PRIMARY KEY;
ALTER TABLE `images_base`DROP PRIMARY KEY;
ALTER TABLE `video`DROP PRIMARY KEY;
ALTER TABLE `fragment`DROP PRIMARY KEY;
ALTER TABLE `fragment_classify`DROP PRIMARY KEY;
ALTER TABLE `topic`DROP PRIMARY KEY;
ALTER TABLE `topic_classify`DROP PRIMARY KEY;
ALTER TABLE `fragment_history`DROP PRIMARY KEY;
ALTER TABLE `topic_column`DROP PRIMARY KEY;
ALTER TABLE `user_channel`DROP PRIMARY KEY;
ALTER TABLE `pre_template`DROP PRIMARY KEY;
ALTER TABLE `pre_template_base`DROP PRIMARY KEY;
ALTER TABLE `template2`DROP PRIMARY KEY;
ALTER TABLE `template2_base`DROP PRIMARY KEY;
ALTER TABLE `recommend_column`DROP PRIMARY KEY;
ALTER TABLE `news_stock`DROP PRIMARY KEY;

DROP TABLE `news`;
DROP TABLE `news_detail`;
DROP TABLE `news_column`;
DROP TABLE `news_push_column`;
DROP TABLE `channel`;
DROP TABLE `category`;
DROP TABLE `images`;
DROP TABLE `video_base`;
DROP TABLE `template`;
DROP TABLE `template_relation`;
DROP TABLE `images_base`;
DROP TABLE `video`;
DROP TABLE `fragment`;
DROP TABLE `fragment_classify`;
DROP TABLE `topic`;
DROP TABLE `topic_classify`;
DROP TABLE `fragment_history`;
DROP TABLE `topic_column`;
DROP TABLE `user_channel`;
DROP TABLE `pre_template`;
DROP TABLE `pre_template_base`;
DROP TABLE `template2`;
DROP TABLE `template2_base`;
DROP TABLE `recommend_column`;
DROP TABLE `news_stock`;
DROP TABLE IF EXISTS `publish_info`;

CREATE TABLE `news` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '标题',
`sub_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '副标题',
`keyword` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '关键字 多个关键字按照空格分割',
`description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'SEO描述。',
`source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '来源',
`author` varchar(255) CHARACTER SET utf8 NULL COMMENT '作者',
`build_time` datetime NULL COMMENT '发布时间',
`write_time` datetime NULL COMMENT '撰稿时间',
`channel_id` bigint NULL COMMENT '频道ID',
`column_id` bigint NULL COMMENT '栏目ID',
`write_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '编辑人ID',
`build_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '发布人',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`platform` tinyint(2) NULL COMMENT '平台来源。2为APP，1为CMS',
`url` varchar(255) NULL COMMENT '发布地址',
`relative_path` varchar(255) NULL COMMENT '发布相对地址',
`publish` tinyint(2) NULL COMMENT '是否发布',
`field1` varchar(255) NULL COMMENT '扩展字段',
`field2` varchar(255) NULL COMMENT '扩展字段',
`field3` varchar(255) NULL COMMENT '扩展字段',
`field4` varchar(255) NULL COMMENT '扩展字段',
`field5` varchar(255) NULL COMMENT '扩展字段',
`auto_publish` tinyint(2) NULL COMMENT '自动发布',
`timer` datetime NULL COMMENT '定时',
`category_id` bigint NULL COMMENT '部门分类ID',
`sort` int(11) NULL DEFAULT 0 COMMENT '排序',
`recommend_title` varchar(255) NULL COMMENT '推荐标题',
`recommend_description` varchar(255) NULL COMMENT '推荐描述',
`recommend_images` varchar(100) NULL,
`recommend_column_id` bigint NULL COMMENT '推荐栏目ID',
`recommend` tinyint(2) NULL COMMENT '推荐',
`recommend_user_id` varchar(20) NULL COMMENT '推荐人',
`image_url` varchar(200) NULL COMMENT '第一张图片',
`edit_publish_time` datetime NULL COMMENT '可修改的发布时间',
`create_user_id` varchar(20) NULL COMMENT '创建人',
`stock_code` varchar(20) DEFAULT NULL COMMENT '股票代码',
`stock_name` varchar(20) DEFAULT NULL COMMENT '股票名称',
`push_tag` tinyint(2) DEFAULT NULL COMMENT '是否推送其他栏目',
`recommend_time` datetime  DEFAULT NULL COMMENT '推荐时间',
PRIMARY KEY (`id`) ,
INDEX `publish_sel` (`publish`),
INDEX `column_id_sel` (`channel_id`),
INDEX `timer_sel` (`auto_publish`, `timer`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='新闻表';

CREATE TABLE `news_detail` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '详细内容',
`news_id` bigint NULL COMMENT '新闻ID',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
UNIQUE INDEX `un_news_id` (`news_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='新闻详情表';

CREATE TABLE `news_column` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`column_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '栏目名称',
`channel_id` bigint NULL COMMENT '频道ID',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`list_id` bigint NULL COMMENT '列表页预模版ID（废弃）',
`detail_id` bigint NULL COMMENT '详情页预模版ID（废弃）',
`list_template2_id` bigint NULL COMMENT '模版ID',
`publish` tinyint(2) NULL COMMENT '是否发布',
`detail_template2_id` bigint NULL,
`keywords` varchar(255) NULL COMMENT '关键字',
`description` varchar(500) NULL COMMENT '描述',
`list_url` varchar(255) NULL COMMENT '模版列表发布地址',
`create_user_id` varchar(20) NULL COMMENT '创建人',
`list_relative_path` varchar(255) DEFAULT NULL COMMENT '列表页相对路径',
`file_name` varchar(255) DEFAULT NULL COMMENT '列表页可维护文件名',
`path` varchar(255) DEFAULT NULL COMMENT '列表页可维护相对目录',
`publish_url` varchar(255) DEFAULT NULL COMMENT '维护的发布地址',
PRIMARY KEY (`id`) ,
INDEX `channel_id_sel` (`channel_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='新闻栏目表';

CREATE TABLE `channel` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`channel_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '频道名',
`channel_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '频道网址',
`channel_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '频道目录',
`channel_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '频道详解',
`category_id` bigint NULL COMMENT '部门ID',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`template_path` varchar(255) NULL COMMENT '模版存储地址',
`rsync_model_name` varchar(255) NULL COMMENT 'rsync模版名',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
INDEX `category_id_` (`category_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='频道表';

CREATE TABLE `category` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '部门名称',
`category_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '部门描述',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='部门表';

CREATE TABLE `images` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`image_url` varchar(255) NULL COMMENT '图片URL全局的',
`image_width_pixel` int NULL COMMENT '长度像素',
`image_height_pixel` int NULL COMMENT '高度像素',
`org_width_pixel` int NULL COMMENT '原始长度',
`org_height_pixel` int NULL COMMENT '原始高度像素',
`image_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图片名称。方便搜索',
`upload_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '上传用户ID',
`upload_time` datetime NULL COMMENT '上传时间',
`image_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图片的相对路径',
`watermark` tinyint(2) NULL COMMENT '是否有水印。1是有。0为没有',
`compress` tinyint(2) NULL COMMENT '是否压缩。1为压缩。0为未压缩',
`platform` tinyint(2) NULL COMMENT '平台来源。2为APP 1为CMS',
`fid` varchar(100) NULL COMMENT 'FID',
`size` int NULL COMMENT '大小',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='图片库';

CREATE TABLE `video_base` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`base_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频url',
`base_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频绝对路径',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='视频基础表';

CREATE TABLE `template` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`template_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模版名称',
`template_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模版说明',
`filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模版、发布文件名',
`path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '发布目录',
`template_classify` tinyint(2) NULL COMMENT '模版分类、1为首页、2为列表页、3为详情页、4、碎片页',
`user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模版编辑人',
`job` tinyint(2) NULL COMMENT '是否定时生成。1是定时生成。0是触发生成',
`encoded` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '目前支持GBK、UTF-8、BIG5、按照字符串形式存储',
`channel_id` bigint NULL COMMENT '频道ID',
`sort_num` int NULL COMMENT '排序值',
`publish` tinyint(2) NULL COMMENT '是否发布',
`upload` tinyint(2) NULL DEFAULT 0 COMMENT '是否上传模版',
`create_user_id` varchar(20) NULL COMMENT '创建人',
`publish_url` varchar(255) DEFAULT NULL COMMENT '发布地址',
`publish_relative_path` varchar(255) DEFAULT NULL COMMENT '发布地址目录',
PRIMARY KEY (`id`) ,
INDEX `desc_sort_num` (`sort_num`),
INDEX `channel_id_sel` (`channel_id`),
INDEX `classify_sel` (`template_classify`),
INDEX `job_sel` (`job`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='模版表';

CREATE TABLE `template_relation` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`template_id` bigint NULL COMMENT '模版ID',
`relation_id` bigint NULL COMMENT '栏目ID、碎片ID、专题分类ID',
`relation_type` tinyint(2) NULL COMMENT '1－栏目ID、2－碎片ID、3－专题分类ID',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
INDEX `relation_sel` (`relation_id`, `relation_type`),
INDEX `template_id_sel` (`template_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='模版对应栏目关系表';

CREATE TABLE `images_base` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`base_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '基础url 根据路径拼接图片地址',
`base_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '图片存储基础目录',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='图片基础表';

CREATE TABLE `video` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`video_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频标题',
`video_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频说明',
`upload_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '上传人',
`upload_time` datetime NULL COMMENT '上传时间',
`video_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频url',
`video_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频相对路径',
`platform` tinyint(2) NULL COMMENT '平台来源。APP为2，CMS为1',
`file_name` varchar(100) NULL COMMENT '文件名',
`create_user_id` varchar(20) NULL COMMENT '创建人',
`m3u8_url` varchar(255) DEFAULT NULL COMMENT '奥点云m3u8 url',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='视频表';

CREATE TABLE `fragment` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`fragment_classify_id` bigint NULL COMMENT '碎片分类ID',
`fragment_content` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '碎片内容',
`fragment_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '碎片名称',
`sort_num` int NULL COMMENT '排序值',
`fragment_model` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '碎片模型',
`channel_id` bigint NULL COMMENT '频道ID',
`create_user_id` varchar(20) NULL COMMENT '创建人',
`edit_user_id` varchar(20) NULL COMMENT '最后编辑人',
`edit_time` datetime NULL COMMENT '最后编辑时间',
PRIMARY KEY (`id`) ,
INDEX `desc_sort_num` (`sort_num`),
INDEX `channel_id_sel` (`channel_id`),
INDEX `fragment_classify_id_sel` (`fragment_classify_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='碎片表';

CREATE TABLE `fragment_classify` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`classify_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '碎片分类名称',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='碎片分类表';

CREATE TABLE `topic` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`topic_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专题标题',
`topic_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专题内容',
`topic_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专题路径',
`topic_filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专题文件名',
`topic_classify_id` bigint NULL COMMENT '分类ID',
`category_id` bigint NULL COMMENT '部门ID',
`channel_id` bigint NULL COMMENT '频道ID',
`release_time` date NULL COMMENT '发布时间YYYY-MM-DD',
`keyword` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '关键词',
`description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '描述',
`topic_column_id` bigint NULL COMMENT '专题系列专题',
`topic_url` varchar(255) NULL COMMENT 'URL',
`publish` tinyint(2) NULL COMMENT '是否发布',
`build_user_id` varchar(20) NULL COMMENT '发布人',
`build_time` datetime NULL COMMENT '发布时间',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
INDEX `topic_classify_id_sel` (`topic_classify_id`),
INDEX `topic_column_id_sel` (`topic_column_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='专题表';

CREATE TABLE `topic_classify` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`classify_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专题分类名称',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='专题分类';

CREATE TABLE `fragment_history` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`fragment_classify_id` bigint NULL COMMENT '碎片分类ID',
`fragment_content` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '碎片内容',
`fragment_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '碎片名称',
`user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '用户',
`curr_time` datetime NULL COMMENT '操作时间',
`fragment_id` bigint NULL COMMENT '碎片ID',
`channel_id` bigint NULL COMMENT '频道ID',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
INDEX `fragment_id_del_tag_sel` (`fragment_id`, `del_tag`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='碎片历史纪录表';

CREATE TABLE `topic_column` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`column_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '专题系列名称',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='专题系列分类';

CREATE TABLE `user_channel` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`user_id` varchar(20) NULL COMMENT '用户ID',
`channel_id` bigint NULL COMMENT '频道ID',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
UNIQUE INDEX `user_channel_index` (`user_id`, `channel_id`),
INDEX `user_id_sel` (`user_id`),
INDEX `channel_id_sel` (`channel_id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='用户频道权限表';

CREATE TABLE `pre_template` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`name` varchar(255) NULL COMMENT '模版名称',
`publish_path` varchar(255) NULL COMMENT '发布目录',
`build_mode` tinyint(2) NULL COMMENT '文件生成方式。1为栏目号。2为随机',
`filename_suffix` varchar(255) NULL COMMENT '后缀名html。shtml或者其他',
`template_path` varchar(255) NULL COMMENT '当前模版存储的文件路径',
`template_classify` tinyint(2) NULL COMMENT '分类。只有两种 一种是列表页、详情页',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='预发布模版';

CREATE TABLE `pre_template_base` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`base_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '绝对路径',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='模版基础存储表';

CREATE TABLE `template2` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`template_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模版名称',
`filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模版、发布文件名',
`path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '发布目录',
`template_classify` tinyint(2) NULL COMMENT '模版分类:2为列表页、3为详情页',
`user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '模版编辑人',
`encoded` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '目前支持GBK、UTF-8、BIG5、按照字符串形式存储',
`upload` tinyint(2) NULL DEFAULT 0 COMMENT '是否上传模版',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) ,
INDEX `template_classify_sel` (`template_classify`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='第二套模版表';

CREATE TABLE `template2_base` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改人',
`base_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '绝对路径',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='第二套模版基础存储表';

CREATE TABLE `recommend_column` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`column_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '推荐栏目名',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='推荐栏目表';

CREATE TABLE `news_stock` (
`id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
`create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
`del_tag` tinyint(3) NULL DEFAULT 1 COMMENT '删除位。0删除、1正常',
`last_modify_user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '最后一次修改时间',
`stock_code` varchar(20) NULL COMMENT '股票代码',
`stock_name` varchar(40) NULL COMMENT '股票名称',
`news_id` bigint NULL COMMENT '新闻ID',
`create_user_id` varchar(20) NULL COMMENT '创建人',
PRIMARY KEY (`id`) 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=10000
COMMENT='股票代码表';


CREATE TABLE `publish_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `del_tag` tinyint(3) DEFAULT '1' COMMENT '删除位。0删除、1正常',
  `last_modify_user_id` varchar(20) DEFAULT NULL COMMENT '最后一次修改时间',
  `create_user_id` varchar(20) DEFAULT NULL COMMENT '创建人',
  `trigger_type` tinyint(2) DEFAULT NULL COMMENT '发布类型专题、新闻、',
  `trigger_id` bigint(20) DEFAULT NULL COMMENT '触发类型对应的ID',
  `template_type` tinyint(2) DEFAULT NULL COMMENT '模版类型',
  `template_id` bigint(20) DEFAULT NULL COMMENT '模版ID',
  `message` varchar(100) DEFAULT NULL COMMENT '发布状况',
  `status` tinyint(2) DEFAULT NULL COMMENT '状态',
  `error_message` varchar(255) DEFAULT NULL COMMENT '错误日志,只存储255个字符',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8 COMMENT='发布日志表';

CREATE TABLE `news_push_column` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `del_tag` tinyint(3) DEFAULT '1' COMMENT '删除位。0删除、1正常',
  `news_id` bigint(20) DEFAULT NULL COMMENT '新闻ID',
  `last_modify_user_id` varchar(20) DEFAULT NULL COMMENT '最后一次修改人',
  `create_user_id` varchar(20) DEFAULT NULL COMMENT '创建人',
  `channel_id` bigint(20) DEFAULT NULL COMMENT '频道ID',
  `column_id` bigint(20) DEFAULT NULL COMMENT '新闻栏目ID',
  `category_id` bigint(20) DEFAULT NULL COMMENT '部门ID',
  `push_column` tinyint(2) DEFAULT NULL COMMENT '是否是推送栏目。1是 0不是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COMMENT='新闻推送栏目表-包含自有栏目和推送栏目两类'

-- 2017-08-01
CREATE TABLE `images_classify` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
	`create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` datetime ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
	`del_tag` tinyint(3) DEFAULT 1 COMMENT '删除位。0删除、1正常',
	`last_modify_user_id` varchar(20) DEFAULT NULL COMMENT '最后一次修改人',
	`create_user_id` varchar(20) DEFAULT NULL COMMENT '创建人',
	`classify_name` varchar(100),
	PRIMARY KEY (`id`)
) COMMENT='图片分类';


CREATE TABLE `video_classify` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID。',
	`create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`update_time` datetime ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
	`del_tag` tinyint(3) DEFAULT 1 COMMENT '删除位。0删除、1正常',
	`last_modify_user_id` varchar(20) DEFAULT NULL COMMENT '最后一次修改人',
	`create_user_id` varchar(20) DEFAULT NULL COMMENT '创建人',
	`classify_name` varchar(100),
	PRIMARY KEY (`id`)
) COMMENT='视频分类';


ALTER TABLE `video` ADD COLUMN `video_classify_id` bigint COMMENT '视频分类' AFTER `m3u8_url`, ADD COLUMN `keyword` varchar(200) COMMENT '关键词' AFTER `video_classify_id`;

ALTER TABLE `images` ADD COLUMN `images_classify_id` bigint(20) DEFAULT NULL COMMENT '图片分类' AFTER `create_user_id`, ADD COLUMN `keyword` varchar(200) DEFAULT NULL COMMENT '关键词' AFTER `images_classify_id`;

