<style lang='sass'>
@import '../../css/global.scss';
.video{
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
			#img{ display:block; margin:0 auto; max-width:10rem; max-height: 10rem; border:$s1 solid #ddd; padding:$s1; background:#fff; }
		}
		.error{ @include transition-duration(.5s); height:0; margin:0 $s20; border:0; text-align: center; overflow:hidden;
			&.cur{
				height:$s33; line-height: $s33; background: #feffd1; border:$s1 solid #ddd; color:red;
			}
			&.right{
				height:$s33; line-height: $s33; background: green; border:$s1 solid #ddd; color:#fff;
			}
		}
	}
}
</style>
<template>
<div class="video">
	<div class="form">
		<ul>
			<li>
				<input id='file' type="file" value="上传视频"/>
				<div @click='file' class="btn-file">+选择视频</div>
				<div class="btn-upload" @click='uploadFile'>上传</div>
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
	import {upload , video} from '../common/URL.js';
	export default {
		data (){
			return {
				filed : true , 
				fileType : '',
				title : '' , 
				describe : '',
				base64 : '',
				videos : null
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
			,uploadFile : function(){
				var self = this , 
					base64 = this.base64 ,
					file = this.fileType, 
					describe = this.describe,
					title = this.title , 
					b = 1024*1024*5  , 
					num = 0 ;
				if(base64<20){
					self.filed = true;
					$('.error').addClass('cur').text('请选择视频文件')
					return;
				}
				if(base64<=b){
					num = 0;
				}else{
					num = base64.length%b;
				}
				var index = 0; 
				function getData(){
					var start = index*b , 
						end = b , 
						indexNum = index+1 , 
						finish = indexNum==num?1:0;
					if(indexNum>=num) return;
					T.ajax({
						type: 'POST',				
						url : upload.uploadVideo , 
						data : {
							"baseCode":[base64.substr(start,b)].join(','),
							"fileName":file.name,
							partNum : indexNum,
							finish : finish
						},
						success : function(_data){
							getData();
							/*self.videos = _data.data;
							$('.error').addClass('right').text('上传成功');
							setTimeout(function(){
								$('.error').removeClass('right');
							},1000);*/
						}
					})
					index++;
				}
				getData();
			}
			,submit : function(){
				var base64 = this.base64 ,
					file = this.fileType, 
					describe = this.describe,
					title = this.title , 
					videos = this.videos;
				if(base64<20){
					$('.error').addClass('cur').text('请上传视频文件');
					return;
				}
				if(title.length<2){
					$('.error').addClass('cur').text('标题不能底于2个字符');
					return;
				}
				T.ajax({
					type: 'POST',				
					url : video.createVideo , 
					data : {
						"videoTitle":title,
						"videoDesc":describe,
						"videoUrl":videos.location,
						"videoPath":videos.location,
						"fileName":videos.fileName
					},
					success : function(_data){	
	                    $('.error').addClass('right').text('提交成功！');
						setTimeout(function(){
							$('.error').removeClass('right');
						},1000)
					}
				})
			}
		}
	}
</script>
