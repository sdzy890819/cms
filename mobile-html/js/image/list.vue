<style lang='sass'>
@import '../../css/global.scss';
.image{
	#Search{ margin-bottom:0; }
	.image-list{
		@include box-flex; overflow-y:scroll;
		ul{ @include box; background:#fff; margin-top:$s10; padding:$s10; border-top:$s1 solid #ddd; border-bottom:$s1 solid #ddd; }
		li{
			@include box-flex;
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
		<input type='text'><div class="btn">搜索</div>
	</div>
	<div class="image-list">
		<ul v-for="item in list">
			<li v-for='obj in item'>
				<div class="img"><img :src='obj.imageUrl'></div>
				<h2>{{obj.imageTitle}}</h2>
				<div class="edit">
					<div class="btn" @click='edit(obj)'>编辑</div>
					<div class="btn" @click='del(obj)'>删除</div>
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
	import {images} from '../common/URL.js';
	export default {
		props : {

		},
		data (){
			return {
				list : []
			}
		},
		beforeCreate (){
			var self = this;
			T.ajax({
				url : images.images , 
				data : {

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
		},
		methods : {
			edit : function( obj ){
				debugger;
			},
			del : function( obj ){
				debugger;
			}
		}
	}
</script>
