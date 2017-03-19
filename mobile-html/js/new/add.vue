<template>
<div class="new">
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
						<option value='-1'>请选择部门分类</option>
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
				<!-- <vue2-html5-editor v-model="content" :content.sync="content" :value="content" width='100%' :height="200"></vue2-html5-editor> -->
				<textarea v-model='content' class="text textedit" type="text" placeholder='请输入内容'></textarea>
			</li>
			<li class='time-date'>
				<div class='label'>发布时间：</div>
				<div class='text'>
					<input type='date' v-model='timer1' >
					<input type="time" v-model='datatime1' />
				</div>
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
			<li class='time-date'>
				<div class='label'>定时发布：</div>
				<div class='text'>
					<input type='date' v-model='timer' >
					<input type="time" v-model='datatime' />
				</div>
			</li>
		</ul>
		<div class="submit">
			<div class="btn" @click='save'>提交</div>
			<div class="btn" @click='save'>保存草稿箱</div>
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
var data = {
	title:'', //标题
	subTitle:'',//子标题
	keyword:'',//关键字 多个关键字按照空格分割
	description:'',//SEO描述
	source:'',//来源
	author:'',//"作者"
	channelId:-1,//频道ID
	columnId:-1,//栏目ID
	categoryId:-1,//部门分类ID
	content:'',//详细内容"
	field1:'',//扩展字段，界面上需要的时候点击添加" //可不传
	field2:'',//扩展字段，界面上需要的时候点击添加" //可不传
	field3:'',//扩展字段，界面上需要的时候点击添加" //可不传
	field4:'',//扩展字段，界面上需要的时候点击添加" //可不传
	field5:'',//扩展字段，界面上需要的时候点击添加" //可不传
	field2Show : false,
	field3Show : false,
	field4Show : false,
	field5Show : false,
	autoPublish:1,////1 是自动发布。0是不自动发布.默认不自动发布
	timer:'',//yyyy-MM-dd HH:mm" //定时发布。//可不传
	datatime : '',
	timer1:'',//yyyy-MM-dd HH:mm" //定时发布。//可不传
	datatime1 : '',
	publish:0,//0|2 //默认为0 ，正常保存。保存草稿使用2

	data : {
		listCategory : [],
		currentChannelList : [],
		newscolumnlist : [],
	}
}
	export default {
		name : 'add',
		components : {
		},
		props : {

		},
		data (){
			return data;
		},
		beforeCreate(){
			var self = this;
			

			/*require.ensure([],function(require){
				var options = {
				    name: "vue2-html5-editor",
				     i18n: {
			            "en-us": {
			                date: "insert current time",
			                emoji: "emoji",
			                indent: "indent"
			            }
			        },
			        date: {
			            format: "YYYY/MM/DD"
			        },
			        modules: [
			            {
			                name: "date",
			                icon: "fa fa-calendar",
			                i18n: "time",
			                show: true,
			                init: function (editor) {
			                    console.log("time module init, config is", this.config)
			                },
			                handler: function (editor) {
			                    var format = this.config.format || "YYYY-MM-DD HH:mm"
			                    editor.execCommand("insertText", moment().format(format))
			                },
			                destroyed: function (editor) {
			                    console.log("time module destroyed")
			                }
			            },
			            {
			                //custom module with dashboard
			                name: "emoji",
			                icon: "fa fa-smile-o",
			                i18n: "emoji",
			                show: true,
			                init: function (editor) {
			                    console.log("emoji module init")
			                },
			                //vue component
			                dashboard: {
			                    template: "#template-emoji",
			                    data: function () {
			                        return {
			                            symbols: [
			                                ">_<|||",
			                                "^_^;",
			                                "⊙﹏⊙‖∣°",
			                                "^_^|||",
			                                "^_^\"",
			                                "→_→",
			                                "..@_@|||||..",
			                                "…(⊙_⊙;)…",
			                                "o_o ....",
			                                "O__O",
			                                "///^_^.......",
			                                "?o?|||",
			                                "( ^_^ )? ",
			                                "(+_+)?",
			                                "（?ε?）? ",
			                                "o_O???",
			                                "@_@a",
			                                "一 一+",
			                                ">\"<||||",
			                                "‘(*>﹏<*)′"
			                            ]
			                        }
			                    },
			                    methods: {
			                        insertSymbol: function (symbol) {
			                            //$parent is editor component instance
			                            this.$parent.execCommand("insertText", symbol)
			                        }
			                    }
			                }
			            },
			            {
			                //custom module with dashboard
			                name: "indent",
			                icon: "fa indent",
			                i18n: "indent",
			                show: true,
			                init: function (editor) {
			                    console.log("indent module init, config is", this.config)
			                },
			                handler: function (editor) {
			                	var range = window.selectedContents;
					            var container = document.createElement('div');
					                container.appendChild(range.cloneContents());
					            range.deleteContents();
					            range.insertNode(container);

					            if(!this.selectAll){
					                this.selectAll = true;
					                $(container).find('div').css('text-indent', '2em')
					            }else{
					                this.selectAll = false;
					                $(container).find('div').css('text-indent', '')
					            }

			                },
			                destroyed: function (editor) {
			                    console.log("indent module destroyed")
			                }
			            },
			        ],
				    visibleModules: [
				        "text",
				        "color",
				        //"font",
				        "align",
				        "list",
				        "link",
				        "unlink",
				        "tabulation",
				        "image",
				        "hr",
				        "eraser",
				        "undo",
				        "indent",
				        //"date",
				        //"emoji",
				       // "full-screen",
				        //"info",
				    ]
				};
				require("../plug/vue2-html5-editor/src/css/font-awesome.css")
				require("../plug/vue2-html5-editor/src/style.less")
				var editor = require("../plug/vue2-html5-editor/dist/vue2-html5-editor.js");
				Vue.use(editor, options);
			})*/
		},
		/*watch : {
			categoryId:function(newVal, oldVal){//部门分类ID 1 

			},
			channelId:function(newVal, oldVal){//频道ID 2

			},
			columnId:function(newVal, oldVal){//栏目ID 3

			},
		},*/
		mounted(){
			var self = this;
			T.ajax({ //获取部门分类
				url : category.listCategory,
				success : function( _data ){
					self.data.listCategory = _data.data;
					T.ajax({ //获取上一次操作时的 记录
						url : news.previousColumn,
						success : function( _data ){
							try{
								self.categoryId = _data.data.categoryId || -1;
								self.source = _data.data.source||'';
								self.categoryEvent(function(){
									self.channelId = _data.data.channelId || -1;
									self.listChannelEvent(function(){
										self.columnId = _data.data.columnId || -1;
									})
								});
							}catch(e){
								
							}
						}
					});
				}
			});
			//previousColumn
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
			categoryEvent : function( callback ){
				var self = this;
				if(self.categoryId<0){
					require.ensure([],function(require){
						var Pop = require('../widgets/pop.js');
						new Pop({
							title : '提示',
							content : '<center>请选择部门分类！</center>',
							width: '70%',
							cancelBtn:false,
							okTxt:'确定',
							timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
						});
					})
					return;
				}
				T.ajax({
					url : channel.currentChannelList,
					data : {
						categoryId : self.categoryId
					},
					success : function( _data ){
						self.$set(self.data,'currentChannelList',_data.data);
						if($.type(callback)=='function'){
							callback();
						}
					}
				})
			},
			listChannelEvent : function(callback){
				var self = this;
				if(self.channelId<0){
					require.ensure([],function(require){
						var Pop = require('../widgets/pop.js');
						new Pop({
							title : '提示',
							content : '<center>请选择频道分类！</center>',
							width: '70%',
							cancelBtn:false,
							okTxt:'确定',
							timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
						});
					})
					return;
				}
				T.ajax({
					url : news.newscolumnlist,
					data : {
						channelId : self.channelId
					},
					success : function( _data ){
						self.$set(self.data,'newscolumnlist',_data.data);
						if($.type(callback)=='function'){
							callback();
						}
					}
				})
			}
			,submit : function( publish ){
				var self = this , 
					obj = this;
				require.ensure([],function(require){
					var Pop = require('../widgets/pop.js');
					if(obj.title.length<2){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>标题不能小于2位数！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					if(obj.keyword.length<1){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>关键字不能小于1位数！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					if(obj.author.length<2){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>作者不能小于2位数！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					if(obj.source.length<2){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>来源不能小于2位数！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					/*if(obj.description.length<5){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>描述不能小于5位数！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}*/
					if(obj.categoryId.length<1){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>请选择部门分类！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					if(obj.channelId.length<1){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>请选择频道分类！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					if(obj.columnId.length<1){
						var pop = new Pop({
                            title : '提示',
                            content : '<center>请选择栏目分类！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					if(obj.content.length<10){
                        var pop = new Pop({
                            title : '提示',
                            content : '<center>内容不能小于10位数！</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
						return;
					}
					T.ajax({
						url : news.createNews , 
						type : 'POST',
						data : {
							title:obj.title,
							subTitle:obj.subTitle,
							keyword:obj.keyword,
							description:obj.description,
							source:obj.source,
							author:obj.author,
							channelId:obj.channelId,//频道ID
							columnId:obj.columnId,//栏目ID
							categoryId:obj.categoryId, //部门分类ID
							content:obj.content,
							field1:obj.field1,
							field2:obj.field2,
							field3:obj.field3,
							field4:obj.field4,
							field5:obj.field5,
							autoPublish:obj.autoPublish, //1 是自动发布。0是不自动发布.默认不自动发布
							timer:obj.timer+' '+obj.datatime, //定时发布。//可不传
							editPublishTime:obj.timer1+' '+obj.datatime1, //定时发布。//可不传
							publish:publish //默认为0 ，正常保存。保存草稿使用2
						},
						success : function(_data){
							var obj = {
								title:'', //标题
								subTitle:'',//子标题
								keyword:'',//关键字 多个关键字按照空格分割
								description:'',//SEO描述
								source:'',//来源
								author:'',//"作者"
								channelId:-1,//频道ID
								columnId:-1,//栏目ID
								categoryId:-1,//部门分类ID
								content:'请输入内容',//详细内容"
								field1:'',//扩展字段，界面上需要的时候点击添加" //可不传
								field2:'',//扩展字段，界面上需要的时候点击添加" //可不传
								field3:'',//扩展字段，界面上需要的时候点击添加" //可不传
								field4:'',//扩展字段，界面上需要的时候点击添加" //可不传
								field5:'',//扩展字段，界面上需要的时候点击添加" //可不传
								field2Show : false,
								field3Show : false,
								field4Show : false,
								field5Show : false,
								autoPublish:1,////1 是自动发布。0是不自动发布.默认不自动发布
								timer:'',//yyyy-MM-dd HH:mm" //定时发布。//可不传
								datatime : '',
								publish:0,//0|2 //默认为0 ，正常保存。保存草稿使用2
							},
							text = '';

							if(_data.code==0){
								text = '新闻创建成功！';
							}else{
								text = '新闻创建失败！';
							}
							var pop = new Pop({
								title : '提示',
								content : '<center>'+text+'</center>',
								width: '70%',
								okTxt:'清空内容',
                                nextBtn : true,
                                nextTxt : '返回列表',
                                cancelTxt:'保留内容',
								timing : 'bounceIn', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
								okCallback:function(){
                                    $.extend(self,obj)
                                    pop.close();
                                },
                                nextCallback : function(){
                                	$.extend(self,obj)
                                    router.push('/new/list')
                                }
							});
						}
					})
				})
			}
			,save : function(){
				this.submit(0);
			}
			,draft : function(){
				this.submit(2);
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
		@include box-flex; overflow-y:scroll;
		li{
			.label{ width:5.625rem; padding-right: $s5; text-align:center; }
			.text{ @include box-flex; 
				label:not(:first-child){ margin-right:$s10; };
			}
			.vue-html5-editor{ @include box-flex;}
			.textedit{ height:$s100; }
			&.time-date{ @include box;
				.label{ width:5.9375rem; line-height:32px; } 
				.text{ @include box-flex;
					input{
						display:block; float:left; height:$s25; line-height:$s25;
            			border:$s1 solid #ddd; padding:$s4;
           				font-size:$s12;
           				&:not(first-child){margin-left:$s5;};
					}
				}
			}
			.indent{ @include contain('../../images/indent.png');vertical-align: middle;}
		}
	}
</style>