<style lang='sass'>
@import '../../css/global.scss';
.video{
	.video-list{
		@include box-flex; overflow-y:scroll;
		dl{ @include size(line-height,22px); margin-bottom:$s10; padding:$s10 $s10 $s5; border-top:$s1 solid #ddd; border-bottom:$s1 solid #ddd; background:#fff; overflow:hidden;
			dt{ @include size(height,22px); font-size:$s16; color:#444;

			}
			dd{ @include size(max-height,44px); font-size:$s14;
				p{ overflow:hidden; text-overflow:ellipsis;}
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
		<input type='text'><div class="btn">搜索</div>
	</div>
	<div class="video-list">
		<dl v-for='obj in list'>
			<dt>{{obj.videoTitle}}</dt>
			<dd>
				<p>{{obj.videoUrl}}</p>

				<div class="aside">
					<div class="submit">
						<div class="btn" @click='edit(obj)'>修改</div>
						<div class="btn" @click='send(obj)'>发布</div>
					</div>
					<span class="author">作者：卖血的羔羊</span>
					<span class="time">2017/02/02</span>
				</div>
			</dd>
		</dl>
	</div>
	<div class="fixed-edit">
		<div class="btn">
			<router-link to="/video/add">
				<i class="add"></i>
				新增
			</router-link>
		</div>
	</div>
</div>
</template>
<script>
	import T from '../common/global.js';
	import {video} from '../common/URL.js';
	export default {
		data (){
			return {
				list : []
			}
		},
		beforeCreate (){
			var self = this;
			T.ajax({
				url : video.videolist ,
				success : function( _data ){
					self.list = _data.data.list;
				}
			})
		},
	}
</script>