<style lang='sass'>
@import '../../css/global.scss';
.image{ overflow-y: scroll;
	.form{
		margin-top:$s15;
		input[type='file']{ display:none; }
		overflow:hidden;
		.btn-file,.btn-upload{ @include box-flex; @include box-sizing; border-radius:$s3;
			display: block; height:$s35; line-height: $s35; text-align: center; border:$s1 solid #ddd; background:#0999e0; color:#fff;
			&.gray{ background:gray; } 
		}
		.btn-upload{ margin-left:$s10; background: #f85200; border-radius:$s3; }
		li{
			padding:$s10 0;
			.label{ width:5.625rem; padding-right: $s5; text-align:center; }
			.text{ @include box-flex; 
				label:not(:first-child){ margin-right:$s10; };
			}
			#img{ display:block; margin:0 auto; min-width:$s5; min-height:$s5; max-width:15rem; max-height: 15rem; border:$s1 solid #ddd; padding:$s1; background:#fff; }
		}
		.error{ @include transition-duration(.5s); height:0; margin:0 $s20; border:0; text-align: center; overflow:hidden;
			&.cur{
				height:$s33; line-height: $s33; background: #feffd1; border:$s1 solid #ddd; color:red;
			}
			&.right{
				height:$s33; line-height: $s33; background: green; border:$s1 solid #ddd; color:#fff;
			}
		}
		.imgs{ display:none; }
	}
}
</style>
<template>
<div class="image">
	<div class="form">
		<ul>
			<li>
				<input id='file' type="file" value="上传图片"/>
				<div @click='file' class="btn-file">+选择图片</div>
			</li>
			<li class="imgs">
				<img id="img">
			</li>
			<li><input class="text" type="text" v-model="title" placeholder='图片标题'></li>
			<li>
				<div class="label">是否水印</div>
				<div class="text">
					<input type="radio" id="one" value="true" v-model="shuiyin">
					<label for="one">是</label>

					<input type="radio" id="two" value="false" v-model="shuiyin">
					<label for="two">否</label>
				</div>
			</li>
			<li>
				<div class="label">是否等比缩放</div>
				<div class="text">
					<input type="radio" id="one1" value="true" v-model="shuo">
					<label for="one1">是</label>

					<input type="radio" id="two1" value="false" v-model="shuo">
					<label for="two1">否</label>
				</div>
			</li>
			<li v-show='shuo=="true"'>
				<div class="label">等比缩放选择</div>
				<div class="text">
					<input type="radio" id="one2" value="true" v-model="size">
					<label for="one2">宽</label>

					<input type="radio" id="two2" value="false" v-model="size">
					<label for="two2">高</label>
				</div>
			</li>
			<li v-show='shuo=="true"&&size=="true"'><input class="text" type="tel" placeholder='图片宽度' v-model="width"></li>
			<li v-show='shuo=="true"&&size=="false"'><input class="text" type="tel" placeholder='图片高度' v-model="height"></li>
		</ul>
		<div class="error"></div>
		<div class="submit">
			<div class="btn" @click='uploadFile'>提交</div>
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
				filed : true,
				shuo : 'false',
				size : 'false',
				shuiyin : 'false',
				fileType : '',
				title : '' , 
				base64 : '',
				width : '',
				height : ''
			}
		},
		mounted(){
			$('.image li input').click(function(){
				$('.error').removeClass('cur right')
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
					self.fileType = file;
					//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
					if(!/image\/\w+/.test(file.type)){ 
						alert("请确保文件为图像类型"); 
						return false; 
					} 
					var reader = new FileReader(); 
					reader.readAsDataURL(file); 
					reader.onload = function(e){ 
						self.base64 = this.result;
						$('#img').attr('src',this.result).parent().show()
					}
				});
				if(self.filed==true){
					self.filed = false;
					tag.addClass('gray')
					file.click();
				}
			}
			,uploadFile : function(){
				var base64 = this.base64 ,
					title = this.title , 
					file = this.fileType , 
					shuiyin = this.shuiyin == 'true'?1:0,
					width = this.width , 
					height = this.height;
				if(base64<20){
					$('.error').addClass('cur').text('请选择图片文件')
					return;
				}
				if(title.length<2){
					$('.error').addClass('cur').text('请输入标题')
					return;
				}
				T.ajax({
					type: 'POST',				
					url : upload.uploadImage , 
					data : {
						"baseCode":base64,
						"suffix":file.type,
						"watermark":1,
						"width":width,
						"height":height //需要压缩的高度  可不传
					},
					success : function(_data){
						$('.error').addClass('right').text('上传成功');
						setTimeout(function(){
							$('.error').removeClass('right');
						},1000)
					}
				})
			}
		}
	}
</script>
