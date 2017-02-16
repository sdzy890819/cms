<style lang='sass'>
@import '../../css/global.scss';
.image{
	.form{
		margin-top:$s15;
		input[type='file']{ display:none; }
		overflow:hidden;
		.btn-file{ @include box-sizing; border-radius:$s3;
			display: block; width:100%; height:$s35; line-height: $s35; text-align: center; border:$s1 solid #ddd; background:#d00000; color:#fff;
			&.gray{ background:gray; } 
		}
		li{
			padding:$s10 0;
			.label{ width:5.625rem; padding-right: $s5; text-align:center; }
			.text{ @include box-flex; 
				label:not(:first-child){ margin-right:$s10; };
			}
			#img{ display:block; margin:0 auto; max-width:10rem; max-height: 10rem; border:$s1 solid #ddd; padding:$s1; background:#fff; }
		}
		.error{ @include transition-duration(.5s); height:0; margin:0 $s20; border:0; text-align: center;
			&.cur{
				height:$s33; line-height: $s33; background: red; border:$s1 solid #ddd; color:#fff;
			}
		}
	}
}
</style>
<template>
<div class="image">
	<div class="form">
		<ul>
			<li>
				<input id='file' type="file" value="上传视频"/>
				<div @click='file' class="btn-file">+上传视频</div>
			</li>
			<li><input class="text" type="text" placeholder='视频标题' v-model='title'></li>
			<li><textarea class="text" type="text" placeholder='描述' v-model='describe'></textarea>
		</ul>
		<div class="error"></div>
		<div class="submit">
			<div class="btn" @click='submit'>提交</div>
		</div>
	</div>
</div>
</template>
<script>
	import T from '../common/global.js';
	import {upload} from '../common/URL.js';
	export default {
		data (){
			return {
				filed : true , 
				fileType : '',
				title : '' , 
				describe : '',
				base64 : '',

			}
		},
		mounted(){
			$('.image li input').click(function(){
				$('.error').removeClass('cur')
			})
		},
		methods : {
			file : function(evet){
				var self = this ,
					tag = $(event.currentTarget),
					file = $('#file');
				file.bind('change',function(){
					self.filed = true;
					tag.removeClass('gray')
					var file = this.files[0]; 
					//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
					if(!/video\/\w+/.test(file.type)){ 
						alert("请确保文件为视频类型"); 
						return false; 
					} 
					self.fileType = file;
					var reader = new FileReader(); 
					reader.readAsDataURL(file); 
					reader.onload = function(e){ 
						self.base64 = this.result;
					}
				});
				if(self.filed==true){
					self.filed = false;
					tag.addClass('gray')
					file.click();
				}
			}
			,submit : function(){
				var base64 = this.base64 ,
					file = this.fileType, 
					title = file.name;
				if(base64<20){
					$('.error').addClass('cur').text('请选择视频文件')
				}
				if(title.length<2){
					$('.error').addClass('cur').text('标题不能底于2个字符')
				}
				T.ajax({
					type: 'POST',				
					url : upload.uploadVideo , 
					data : {
						"baseCode":[base64].join(','),
						"fileName":title,
						finish : 1
					},
					success : function(_data){	
	                    					
					}
				})
			}
		}
	}
</script>
