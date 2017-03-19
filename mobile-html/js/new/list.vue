<template>
<div class="new">
	<div id='Search'>
		<input type='text' v-model='searchtxt' placeholder='请输入搜索内容'><div class="btn" @click='search'>搜索</div>
	</div>
	<div class="new-list">
		<dl v-for='obj in list'>
			<dt>{{obj.title}}</dt>
			<dd>
				<div class="aside">
					<div class="submit">
						<div v-if='obj.platform == 2 && obj.publish != 1 ' class="btn" @click='edit(obj)'>修改</div>
						<div class="btn" @click='release(obj)'>发布</div>
					</div>
					<span class="author">作者：{{obj.writeUserName}}</span>
					 | 
					<span class="time">{{obj.timeStr}}</span>
				</div>
			</dd>
		</dl>
		<div class='no-more'>没有更多的内容了。</div>
	</div>
	<div class="fixed-edit">
		<div class="btn">
			<router-link to="/new/add">
				<i class="add"></i>
			</router-link>
		</div>
	</div>
</div>
</template>
<script>
	import T from '../common/global.js';
	import {news,search} from '../common/URL.js';
	export default {
		data (){
			return {
				list : [] , 
			}
		},
		beforeCreate (){
			var self = this,
				page = 1 ,
				pageSize = 10 , 
				loading = true;

			function getList(){
				if(loading==false) return;
				loading = false;
				T.ajax({
					url : news.newslist ,
					data : {
						page : page , 
						pageSize : pageSize
					},
					success : function( _data ){
						var list = _data.data.list;
						if(!list || !list.length) return;
						list.map((obj , i)=>{
							obj.timeStr = obj.updateTimeStr.substr(5,11)
						})
						self.list = self.list.concat(list);
						loading = true;
						self.$nextTick(function(){
							var box = $('.new-list');
							box.unbind().on('scroll',function(){
				                var scrollHeight = box[0].scrollHeight , 
									height = box.height();
								var scrollTop = $(this).scrollTop()+height+100;
								if(scrollTop>scrollHeight){
									if(page<=_data.data.page.pageCount && loading==true){
										page++;
										getList();
										$('.no-more').hide();
									}else{
										$('.no-more').show();
									}
								}
							})
			            });
					}
				})
			}
			getList();
		},
		mounted(){
			
		},
		methods : {
			edit : function( obj ){
				router.push({path:'/new/edit',query:{newsId : obj.id}})
			},
			release : function( obj ){
				T.ajax({
					url : news.publish ,
					data : {
						id : obj.id
					},
					success : function( _data ){
						require.ensure([], function(require) {
			                var Pop = require('../widgets/pop.js');
							if(_data.code == 0){
			                	new Pop({
			                        title: '提示',
			                        content: '<center>发布成功</center>',
			                        width: '70%',
			                        cancelBtn: false,
			                        okTxt: '确定',
			                        timing: 'slideOutUp', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
			                    });
			                }else{
			                	new Pop({
			                        title: '提示',
			                        content: '<center>发布失败，请联系管理员！</center>',
			                        width: '70%',
			                        cancelBtn: false,
			                        okTxt: '确定',
			                        timing: 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
			                    });
			                }
		               	});
					}
				});
			},
			search : function(){
				/*var self = this , 
					txt = self.searchtxt;
				T.ajax({
					url : search.searchNew ,
					type : 'post',
					data : {
						condition:txt,
						page:1,
						pageSize:20
					},
					success : function( _data ){
						var list = _data.data.list;
						list.map((obj , i)=>{
							obj.timeStr = obj.updateTimeStr.substr(5,11)
						})
						self.list = list;
					}
				});*/

				var self = this,
					txt = self.searchtxt,
					page = 1 ,
					pageSize = 10 , 
					loading = true;
				self.list = [];
				function getList(){
					if(loading==false) return;
					loading = false;
					T.ajax({
						url : search.searchNew ,
						type : 'post',
						data : {
							condition:txt,
							page : page , 
							pageSize : pageSize
						},
						success : function( _data ){
							var list = _data.data.list;
							if(!list || !list.length) return;
							list.map((obj , i)=>{
								obj.timeStr = obj.updateTimeStr.substr(5,11)
							})
							self.list = self.list.concat(list);
							loading = true;
							self.$nextTick(function(){
				                var box = $('.new-list'),
									scrollHeight = box[0].scrollHeight , 
									height = box.height();
								box.unbind().on('scroll',function(){
									var scrollTop = $(this).scrollTop()+height+100;
									if(scrollTop>scrollHeight){
										if(page<=_data.data.page.pageCount && loading==true){
											page++;
											getList();
											$('.no-more').hide();
										}else{
											$('.no-more').show();
										}
									}
								})
				            });
						}
					})
				}
				getList();
			}
		}
	}
</script>