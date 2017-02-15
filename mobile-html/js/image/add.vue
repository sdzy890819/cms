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
				<input id='file' type="file" value="上传图片"/>
				<div @click='file' class="btn-file">+上传图片</div>
			</li>
			<li style='display:none'><img id="img"></li>
			<li><input class="text" type="text" placeholder='图片标题'></li>
			<li>
				<div class="label">是否水印</div>
				<div class="text">
					<input type="radio" id="one" value="true">
					<label for="one">是</label>

					<input type="radio" id="two" value="false">
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
					<label for="one2">是</label>

					<input type="radio" id="two2" value="false" v-model="size">
					<label for="two2">否</label>
				</div>
			</li>
			<li v-show='shuo=="true"&&size=="true"'><input class="text" type="tel" placeholder='图片宽度'></li>
			<li v-show='shuo=="true"&&size=="false"'><input class="text" type="tel" placeholder='图片高度'></li>
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
				filed : true,
				shuo : 'false',
				size : 'false'
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
