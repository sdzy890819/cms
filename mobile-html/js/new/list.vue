<template>
<div class="new">
	<div id='Search'>
		<input type='text'><div class="btn">搜索</div>
	</div>
	<div class="new-list">
		<dl v-for='obj in list'>
			<dt>{{obj.title}}</dt>
			<dd>
				<!-- <p>内容内容</p>
 -->
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
	import {news} from '../common/URL.js';
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
			}
		}
	}
</script>