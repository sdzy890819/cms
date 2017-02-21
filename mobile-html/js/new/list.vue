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
						<div class="btn" @click='edit(obj)'>修改</div>
						<div class="btn" @click='release(obj)'>发布</div>
					</div>
					<span class="author">作者：{{obj.writeUserName}}</span>
					 | 
					<span class="time">{{obj.timeStr}}</span>
				</div>
			</dd>
		</dl>
	</div>
	<div class="fixed-edit">
		<div class="btn">
			<router-link to="/new/add">
				<i class="add"></i>
				新增
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
			var self = this;
			T.ajax({
				url : news.newslist ,
				success : function( _data ){
					var list = _data.data.list;
					list.map((obj , i)=>{
						obj.timeStr = obj.updateTimeStr.substr(5,11)
					})
					self.list = list;
				}
			})
		},
		methods : {
			edit : function( obj ){
				T.pop('修改')
				/*T.ajax({
					url : news.delNews,
					data : {

					},
					success : function( _data ){
						var list = _data.data.list;
						list.map((obj , i)=>{
							obj.timeStr = obj.updateTimeStr.substr(5,11)
						})
						self.list = list;
					}
				})*/
			},
			release : function( obj ){
				T.pop('发布','error')
			},
			search : function(){
				var self = this , 
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
				})
			}
		}
	}
</script>