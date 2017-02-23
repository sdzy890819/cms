<template>
<div class="new" style="overflow-y:scroll;">
	<div class="form">
		<ul>
			<li><input v-model='title' class="text" type="text" placeholder='标题'></li>
			<li><input v-model='subTitle' class="text" type="text" placeholder='副标题'></li>
			<li><input v-model='keyword' class="text" type="text" placeholder='多个关键字按照空格分割'></li>
			<li>
				<input v-model='author' class="text" type="text" placeholder='作者'>
				<input v-model='source' class="text" type="text" placeholder='来源'>
			</li>
			<li><textarea v-model='description' class="text" type="text" placeholder='描述'></textarea></li>
			<li>
				<div class="select">
					<select v-model='categoryId' @change='categoryEvent'>
						<option value='-1'>请选择部门</option>
						<option v-for="option in data.listCategory" v-bind:value="option.id">
							{{ option.categoryName }}
						</option>
					</select>
				</div>
			</li>
			<li>
				<div class="select">
					<select v-model='channelId' @change='listChannelEvent'>
						<option value='-1'>请选择频道分类</option>
						<option v-for="option in data.currentChannelList" v-bind:value="option.id">
							{{ option.channelName }}
						</option>
					</select>
				</div>
			</li>
			<li>
				<div class="select">
					<select v-model='columnId'>
					  	<option value='-1'>请选择栏目分类</option>
						<option v-for="option in data.newscolumnlist" v-bind:value="option.id">
							{{ option.columnName }}
						</option>
					</select>
				</div>
			</li>
			<li>
				<vue2-html5-editor v-model="content" :height="200"></vue2-html5-editor>
			</li>
			<li>
				<input v-model='field1' class="text" type="text" placeholder='扩展字段1'>
				<div class="fieldEdit">
					<i class="add" @click='addField'></i>
				</div>
			</li>
			<li v-show='field2Show'>
				<input v-model='field2' class="text" type="text" placeholder='扩展字段2'>
				<div class="fieldEdit">
					<i class="add" @click='addField'></i>
					<i class="add del" @click='delField'></i>
				</div>
			</li>
			<li v-show='field3Show'>
				<input v-model='field3' class="text" type="text" placeholder='扩展字段3'>
				<div class="fieldEdit">
					<i class="add" @click='addField'></i>
					<i class="add del" @click='delField'></i>
				</div>
			</li>
			<li v-show='field4Show'>
				<input v-model='field4' class="text" type="text" placeholder='扩展字段4'>
				<div class="fieldEdit">
					<i class="add" @click='addField'></i>
					<i class="add del" @click='delField'></i>
				</div>
			</li>
			<li v-show='field5Show'>
				<input v-model='field5' class="text" type="text" placeholder='扩展字段5'>
				<div class="fieldEdit">
					<i class="add" @click='addField'></i>
					<i class="add del" @click='delField'></i>
				</div>
			</li>
			<li>
				<div class="text">
					<input type="radio" id="one" value="1" v-model="autoPublish">
					<label for="one">发布</label>

					<input type="radio" id="two" value="0" v-model="autoPublish">
					<label for="two">不发布</label>
				</div>
			</li>
			<li>
				<input type='date' v-model='timer' >
			</li>
		</ul>
		<div class="submit">
			<div class="btn" @click='submit'>提交</div>
			<div class="btn">保存草稿箱</div>
		</div>
	</div>
</div>
</template>
<script>
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//import '../plug/vue-html5-editor/src/style.less';
//import vue2Html5Editor from '../plug/vue2-html5-editor/src/editor.vue';
import T from '../common/global';
import {news,category,channel} from '../common/URL';
//import { VueEditor } from '../plug/vue2-editor/dist/index.js'

	export default {
		name : 'add',
		components : {
		},
		props : {

		},
		data (){
			return {
				title:'', //标题
				subTitle:'',//子标题
				keyword:'',//关键字 多个关键字按照空格分割
				description:'',//SEO描述
				source:'',//来源
				author:'',//"作者"
				channelId:-1,//频道ID
				columnId:-1,//栏目ID
				categoryId:-1,//部门分类ID
				content:'详细内容',//详细内容"
				field1:'',//扩展字段，界面上需要的时候点击添加" //可不传
				field2:'',//扩展字段，界面上需要的时候点击添加" //可不传
				field3:'',//扩展字段，界面上需要的时候点击添加" //可不传
				field4:'',//扩展字段，界面上需要的时候点击添加" //可不传
				field5:'',//扩展字段，界面上需要的时候点击添加" //可不传
				field2Show : false,
				field3Show : false,
				field4Show : false,
				field5Show : false,
				autoPublish:0,////1 是自动发布。0是不自动发布.默认不自动发布
				timer:new Date().Format("yyyy-MM-dd"),//yyyy-MM-dd HH:mm" //定时发布。//可不传
				publish:0,//0|2 //默认为0 ，正常保存。保存草稿使用2

				data : {
					listCategory : [],
					currentChannelList : [],
					newscolumnlist : [],
				}
			}
		},
		beforeCreate(){
			
		},
		mounted(){
			var self = this;
			T.ajax({
				url : category.listCategory,
				success : function( _data ){
					self.data.listCategory = _data.data;
				}
			});
			require.ensure([],function(require){
				var options = {
				    //global component name 
				    name: "vue2-html5-editor",
				    //custom icon class of built-in modules,default using font-awesome 
				    /*icons: {
				        text: "fa fa-pencil",
				        color: "fa fa-paint-brush",
				        font: "fa fa-font",
				        align: "fa fa-align-justify",
				        list: "fa fa-list",
				        link: "fa fa-chain",
				        unlink: "fa fa-chain-broken",
				        tabulation: "fa fa-table",
				        image: "fa fa-file-image-o",
				        hr: "fa fa-minus",
				        eraser: "fa fa-eraser",
				        undo: "fa-undo fa",
				        "full-screen": "fa fa-arrows-alt",
				        info: "fa fa-info",
				    },*/
				    //config image module 
				    /*image: {
				        //Url of the server-side,default null and convert image to base64 
				        server: null,
				        //the name for file field in multipart request 
				        fieldName: "image",
				        //max file size 
				        sizeLimit: 512 * 1024,
				        // default true,if set to true,the image will resize by localResizeIMG (https://github.com/think2011/localResizeIMG) 
				        compress: true,
				        //follows are options of localResizeIMG 
				        width: 1600,
				        height: 1600,
				        quality: 80,
				        //handle response data，return image url 
				        uploadHandler(responseText){
				            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"} 
				            var json = JSON.parse(responseText)
				            if (!json.ok) {
				                alert(json.msg)
				            } else {
				                return json.data
				            }
				        }
				    },
				    //default en-us, en-us and zh-cn are built-in 
				    language: "zh-cn",
				    i18n: {
				        //specify your language here 
				        "zh-cn": {
				            "align": "对齐方式",
				            "image": "图片",
				            "list": "列表",
				            "link": "链接",
				            "unlink": "去除链接",
				            "table": "表格",
				            "font": "文字",
				            "full screen": "全屏",
				            "text": "排版",
				            "eraser": "格式清除",
				            "info": "关于",
				            "color": "颜色",
				            "please enter a url": "请输入地址",
				            "create link": "创建链接",
				            "bold": "加粗",
				            "italic": "倾斜",
				            "underline": "下划线",
				            "strike through": "删除线",
				            "subscript": "上标",
				            "superscript": "下标",
				            "heading": "标题",
				            "font name": "字体",
				            "font size": "文字大小",
				            "left justify": "左对齐",
				            "center justify": "居中",
				            "right justify": "右对齐",
				            "ordered list": "有序列表",
				            "unordered list": "无序列表",
				            "fore color": "前景色",
				            "background color": "背景色",
				            "row count": "行数",
				            "column count": "列数",
				            "save": "确定",
				            "upload": "上传",
				            "progress": "进度",
				            "unknown": "未知",
				            "please wait": "请稍等",
				            "error": "错误",
				            "abort": "中断",
				            "reset": "重置"
				        }
				    },
				    //the modules you don't want 
				    hiddenModules: [],*/
				    //keep only the modules you want and customize the order. 
				    //can be used with hiddenModules together 
				    visibleModules: [
				        "text",
				        "color",
				        "font",
				        "align",
				        "list",
				        "link",
				        "unlink",
				        "tabulation",
				        //"image",
				        "hr",
				        "eraser",
				        "undo",
				       // "full-screen",
				        //"info",
				    ],
				    //extended modules 
				    modules: {
				        //omit,reference to source code of build-in modules 
				    }
				};
				require("../plug/vue2-html5-editor/src/css/font-awesome.css")
				require("../plug/vue2-html5-editor/src/style.less")
				var editor = require("../plug/vue2-html5-editor/dist/vue2-html5-editor.js");
				Vue.use(editor, options);
			})
		},
		methods : {
			addField : function(){
				var self = this , 
					showList = [
						self.field2Show,
						self.field3Show,
						self.field4Show,
						self.field5Show,
					];

				for( let i = 0 ; i<showList.length ; i++){
					if(!showList[i]){
						this.$set(self,'field'+(i+2)+'Show',true)
						break;
					}
				}
			},
			delField : function(){
				var self = this , 
					showList = [
						self.field2Show,
						self.field3Show,
						self.field4Show,
						self.field5Show,
					];

				for( let i = showList.length ; i>=0 ; i--){
					if(showList[i]){
						this.$set(self,'field'+(i+2)+'Show',false)
						break;
					}
				}
			},
			categoryEvent : function( ){
				var self = this;
				T.ajax({
					url : channel.currentChannelList,
					data : {
						categoryId : self.categoryId
					},
					success : function( _data ){
						self.$set(self.data,'currentChannelList',_data.data);
					}
				})
			},
			listChannelEvent : function(){
				var self = this;
				T.ajax({
					url : news.newscolumnlist,
					data : {
						channelId : self.channelId
					},
					success : function( _data ){
						self.$set(self.data,'newscolumnlist',_data.data);
					}
				})
			}
			,submit : function(){
				var self = this;
				debugger;
			}
		}
	}
</script>
<style lang='sass'>
	@import '../../css/global';
	i{ width:2rem; height: 2rem; margin-left:$s5;
		&.add{
			width:2rem; height: 2rem;
			&:after{
				width: 0.2rem; height: 1.2rem; top: 0.5rem; left: .95rem;
			};
			&:before{ 
				content: ''; height: 0.2rem; width: 1.3rem; display: block;
				background: #fff; border-radius: 0.625rem; position: absolute;
				top: .95rem; left: 0.375rem; 
			};
		}
		&.del{
			background:#288f00;
			&:hover{ background:#31af00;}
			&:before{ 
				width: 1rem;left: 0.5rem; 
			};
			&:after{ display: none; visibility: hidden;}
		}
	}
	.fieldEdit{ width:$s100; @include box; padding-left:$s10; }
	.form{
		li{
			.label{ width:5.625rem; padding-right: $s5; text-align:center; }
			.text{ @include box-flex; 
				label:not(:first-child){ margin-right:$s10; };
			}
		}
	}
</style>