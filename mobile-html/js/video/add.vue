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
			<li style='display:none'><img id="img"></li>
			<li><input class="text" type="text" placeholder='视频标题'></li>
			<li><textarea class="text" type="text" placeholder='描述'></textarea>
		</ul>
		<div class="submit">
			<div class="btn">提交</div>
		</div>
	</div>
</div>
</template>
<script>
	export default {
		data (){
			return {
				filed : true
			}
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
					if(!/image\/\w+/.test(file.type)){ 
						alert("请确保文件为图像类型"); 
						return false; 
					} 
					var reader = new FileReader(); 
					reader.readAsDataURL(file); 
					reader.onload = function(e){ 
						$('#img').attr('src',this.result).parent().show()
					}
				});
				if(self.filed==true){
					self.filed = false;
					tag.addClass('gray')
					file.click();
				}
			}
		}
	}
</script>
