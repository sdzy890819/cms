<style lang='sass'>
@import '../../css/global.scss';
.image{
	#Search{ margin-bottom:0; }
	.image-list{
		@include box-flex; overflow-y:scroll;
		ul{ background:#fff; margin-top:$s10; padding:$s10; border-top:$s1 solid #ddd; border-bottom:$s1 solid #ddd; overflow:hidden; }
		li{
			float:left;
			width:33.33%; padding:0 $s10; @include box-sizing; 
			h2{ height: $s33; line-height: $s33; @include font-size(14px); overflow:hidden; text-align: center; font-weight: normal;}
			img{ display: block; margin:0 auto; width:100%; border:$s1 solid #ddd; @include box-sizing; }

		}
		.edit{ @include box;
			.btn{ @include box-flex; height:$s23; line-height:$s23; border:$s1 solid #eee; background:#f8f8f8; border-radius: $s3; font-size:$s12;
				text-align:center;
				&:not(:first-child){ margin-left:$s5}
				&:hover{ background:#e50000; color:#fff;}
			}
		}
	}
}
</style>
<template>
<div class="image">
	<div id='Search'>
		<input type='text' v-model='searchtxt' placeholder='请输入搜索内容'><div class="btn" @click='search'>搜索</div>
	</div>
	<div class="image-list">
		<ul v-for="item in list">
			<li v-for='obj in item'>
				<div class="img"><img :src='obj.imageUrl'></div>
				<h2>{{obj.imageTitle}}</h2>
				<div class="edit">
					<div class="btn" @click='edit(obj)'>编辑</div>
					<!-- <div class="btn" @click='del(obj)'>删除</div> -->
				</div>
			</li>
		</ul>
	</div>
	<div class="fixed-edit">
		<div class="btn">
			<router-link to="/image/add">
				<i class="add"></i>
				新增
			</router-link>
		</div>
	</div>
</div>
</template>
<script>
	import T from '../common/global.js';
	//import pop from '../widgets/pop.js';
	import {images,search} from '../common/URL.js';
	export default {
		props : {

		},
		data (){
			return {
				list : []
			}
		},
		beforeCreate (){
			this.update = function(){
				var self = this,
					page = 1 ,
					pageSize = 10 , 
					loading = true;

				function getList(){
					if(loading==false) return;
					loading = false;
					T.ajax({
						url : images.images , 
						data : {
							page : page , 
							pageSize : pageSize
						},
						success : function( _data ){
							var list = _data.data.list , 
								newarr = [],
								arr = [];
							if(!list || !list.length) return;
							list.map((obj,index)=>{
								index += 1;
								arr.push(obj)
								if(index%3==0){
									newarr.push(arr);
									arr = []
								}
							});
							arr.length && newarr.push(arr);
							self.list = self.list.concat(newarr);
							loading = true;
							self.$nextTick(function(){
				                var box = $('.image-list'),
									scrollHeight = box[0].scrollHeight , 
									height = box.height();
								box.unbind().on('scroll',function(){
									var scrollTop = $(this).scrollTop()+height+50;
									if(scrollTop>scrollHeight){
										if(page==_data.data.page.pageCount) return;
										page++;
										getList();
									}
								})
				            });
						}
					})
				}
				getList();
			}
			this.update();
		},
		methods : {
			edit : function( obj ){
				router.push({ path: '/image/edit', query: {imageId:obj.id}})
			},
			/*del : function( obj ){
				var self = this;
				require.ensure([],function(require){
					var Pop = require('../widgets/pop.js');
					new Pop({
						title : '提示',
						content : '确定要"'+obj.imageTitle+'"删除吗？',
						width: '70%',
						cancelBtn:false,
						okTxt:'确定',
						timing : 'bounceIn', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
						okCallback:function(){
							T.ajax({
								url : images.delImages ,
								type : 'post',
								data : {
									id : obj.id
								},
								success : function( _data ){
									if(_data.code==0){
										T.pop('删除成功！',false,false,function(){
											Pop.close();
											self.update();
										});
									}
								}
							});
						}
					});
				})
			},*/
			search : function(){
				var self = this , 
					txt = self.searchtxt;
				T.ajax({
					url : search.searchImages ,
					type : 'post',
					data : {
						condition:txt,
						page:1,
						pageSize:20
					},
					success : function( _data ){
						var list = _data.data.list , 
							newarr = [],
							arr = [];
						if(list){
							list.map((obj,index)=>{
								index += 1;
								arr.push(obj)
								if(index%3==0){
									newarr.push(arr);
									arr = []
								}
							});
							arr.length && newarr.push(arr);
						}
						self.list = newarr;
					}
				})
			}
		}
	}
</script>
