<style lang='sass'>
@import '../../css/global.scss';
.video{
	.video-list{
		@include box-flex; overflow-y:scroll;
		dl{ @include size(line-height,22px); margin-bottom:$s10; padding:$s10 $s10 $s5; border-top:$s1 solid #ddd; border-bottom:$s1 solid #ddd; background:#fff; overflow:hidden;
			dt{ @include size(height,22px); font-size:$s16; color:#444;

			}
			dd{ @include size(max-height,44px); font-size:$s14;
				p{ overflow:hidden; word-break:break-all;}
				.aside{ margin-top:$s5; padding-top:$s5; font-size:$s12; border-top:$s1 dashed #eee;
					.submit{ float:right;
						.btn{ display:inline-block; height:$s23; line-height:$s23;  padding:0 $s15;border:$s1 solid #ddd; background:#f8f8f8;
								&:hover{ background:#e50000; color:#fff;}
							}
					}
				}
			}
		}
	}
}
</style>
<template>
<div class="video">
	<div id='Search'>
		<input type='text' v-model='searchtxt' placeholder='请输入搜索内容'><div class="btn" @click='search'>搜索</div>
	</div>
	<div class="video-list">
		<dl v-for='obj in list'>
			<dt>{{obj.videoTitle}}</dt>
			<dd>
				<p>{{obj.videoUrl}}</p>

				<div class="aside">
					<div class="submit">
						<div class="btn" @click='edit(obj)'>修改</div>
						<!-- <div class="btn" @click='release(obj)'>发布</div> -->
					</div>
					<span class="author">{{obj.author}}</span>
					<span class="time">{{obj.timeStr}}</span>
				</div>
			</dd>
		</dl>
		<div class='no-more'>没有更多的内容了。</div>
	</div>
	<div class="fixed-edit">
		<div class="btn">
			<router-link to="/video/add">
				<i class="add"></i>
			</router-link>
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
	import T from '../common/global.js';
	import {video,search} from '../common/URL.js';
	export default {
		data (){
			return {
				list : [] ,
				searchtxt : ''
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
					url : video.videolist ,
					data : {
						page : page , 
						pageSize : pageSize
					},
					success : function( _data ){
						var list = _data.data.list;
						if(!list || !list.length) return;
						var list = _data.data.list;
						list.map((obj , i)=>{
							obj.timeStr = new Date(obj.uploadTime).Format("MM-dd h:m")
						})
						self.list = self.list.concat(list);
						loading = true;
						self.$nextTick(function(){
			                var box = $('.video-list'),
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
		},
		methods : {
			edit : function(obj){
				router.push({ path: '/video/edit', query: {videoId:obj.id}})
			},
			release : function(){

			},
			search : function(){
				/*var self = this , 
					txt = self.searchtxt;
				T.ajax({
					url : search.searchVideo ,
					type : 'post',
					data : {
						condition:txt,
						page:1,
						pageSize:20
					},
					success : function( _data ){
						var list = _data.data.list;
						list.map((obj , i)=>{
							obj.timeStr = new Date(obj.uploadTime).Format("MM-dd h:m")
						})
						self.list = list;
					}
				})*/
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
						url : search.searchVideo ,
						type : 'post',
						data : {
							condition:txt,
							page : page , 
							pageSize : pageSize
						},
						success : function( _data ){
							var list = _data.data.list;
							if(!list || !list.length) return;
							var list = _data.data.list;
							list.map((obj , i)=>{
								obj.timeStr = new Date(obj.uploadTime).Format("MM-dd h:m")
							})
							self.list = self.list.concat(list);
							loading = true;
							self.$nextTick(function(){
				                var box = $('.video-list'),
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