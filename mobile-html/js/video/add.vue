<style lang='sass'>
@import '../../css/global.scss';
.video{
	.form{ @include box-flex;overflow:hidden; overflow-y:scroll;
		margin-top:$s15;
		input[type='file']{ display:none; }
		.btn-file,.btn-upload{ @include box-flex; @include box-sizing; border-radius:$s3;
			display: block; height:$s35; line-height: $s35; text-align: center; border:$s1 solid #ddd; background:#0999e0; color:#fff;
			&.gray{ background:gray; } 
		}
		.btn-upload{ margin-left:$s10; background: #f85200; border-radius:$s3; }
		li{
			#uploadForm{ width:100%; @include box; padding:$s10 0; }
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
				<form id= "uploadForm" method="post" enctype="multipart/form-data">  
                    <input id='file' type="file" name="file" value="文件上传" />
			      	<div @click='file' class="btn-file">+选择文件</div>
			      	<!-- <div class="btn-upload" @click='uploadFile'>上传</div> -->
				</form>  
				<!-- <input id='file' type="file" value="文件上传"/>
				<div @click='file' class="btn-file">+选择文件</div>
				<div class="btn-upload" @click='uploadFile'>上传</div> -->
			</li>
			<li v-show='fileType'>{{fileType.name}}</li>
			<li v-show='videos' style='word-break: break-all;'>{{videos.location}}</li>
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
				videos : '',
				isSelect : false
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
					file = $('#file') , 
					ispop = false;
				require.ensure([], function(require) {
            		var Pop = require('../widgets/pop.js');
					file.bind('change',function(){
						/*self.filed = true;
						tag.removeClass('gray')*/
						var file = this.files[0]; 
						//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
						if(file && !file.name.toLowerCase().search(/(video|kux|rmvb|remb|avi|rmvb|rm|asf|divx|mpg|mpeg|mpe|wmv|mp4|mkv|vob)$/)){ 
							//alert("请确保文件为视频类型"); 
							if(!ispop){
								ispop = true;
								var pop = new Pop({
		                            title: '提示',
		                            content: '请确保文件为视频类型',
		                            width: '70%',
		                            cancelBtn: false,
		                            okTxt: '确定',
		                            timing: 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
		                            closeCallback : function(){
		                            	ispop = false;
		                            }
		                        });
							}
							self.isSelect = false;
						}else{
							self.isSelect = true;
							self.fileType = file;
							var reader = new FileReader(); 
							//reader.readAsArrayBuffer(file); 
							reader.readAsDataURL(file); 
							//reader.onload = function(e){ 
								//self.base64 = this.result;
								/*var data = reader.result;
							    self.array = new Int8Array(data);*/

							    //var num = 100*15000;
							    //var str = JSON.stringify(array, null, '  ');

							//}
						}
					});
                });
				/*if(self.filed==true){
					self.filed = false;
					tag.addClass('gray')*/
					file.unbind().click();
				//}
			}
			,uploadFile : function( callback ){
				var self = this , ispop = false , 
					base64 = [this.base64].join(',') ,
					//array = self.array,
					//len = array.length,
					file = this.fileType, 
					describe = this.describe,
					title = this.title , 
					bynum = 100*10000,
					b = 1024*1024*1  , 
					num = 0 ;

                if(!self.isSelect){
                    if(!ispop){
                        ispop = true;
                        require.ensure([],function(require){
                            var Pop = require('../widgets/pop.js');
                                //$('.error').addClass('cur').text('请上传视频文件');
                            var pop = new Pop({
                                title : '提示',
                                content : '<center>请选择视频文件</center>',
                                width: '70%',
                                cancelBtn:false,
                                timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                                closeCallback : function(){
                                    ispop = false;
                                }
                            });
                        });
                    }
                    return;
                }
                var timer = 0, size = file.size,
                	time1 = T.getMS(),
                	num = 0;

                function updateTime(){
                	size -= 500;
                	if(num>95){
                		num = 95;
                		clearTimeout(timer)
                	}
                	num ++;
                	$('#loadingnum').text(num+'%');
                }
                timer = setInterval(updateTime,1000);
                function clear(){
                	self.showhtml.remove();
				  	self.showhtml = null;
				  	clearTimeout(timer);
				  	num = 0;
                }

                if(!self.showhtml){
                	self.showhtml = $('<div class="load-mask"><div id="loadingnum">0%</div><div class="loadding"></div></div>').appendTo($('body'));
                }
                function showResponse(_data){
                    if(_data.code == 0){
                        self.videos = _data.data;
                        callback();
                        /*$('.error').addClass('right').text('上传成功');
                        setTimeout(function(){
                            $('.error').removeClass('right');
                        },1000);*/
                    }else{
                        require.ensure([],function(require){
                            var Pop = require('../widgets/pop.js');
                                //$('.error').addClass('cur').text('请上传视频文件');
                            var pop = new Pop({
                                title : '提示',
                                content : _data.message,
                                width: '70%',
                                cancelBtn:false,
                                timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                            });
                        });
                    }
                    clear();
                }
				var formData = new FormData($( "#uploadForm" )[0]);
				$.ajax({  
					url: upload.uploadVideo2 ,  
					type: 'POST',  
					data: formData,  
                    timeout: (30*60*1000),
					//async: false,  
					cache: false,  
					contentType: false,  
					processData: false,  
					success: function (_data) { 
					  	if(_data.code == 0){
					  		self.videos = _data.data;
                            callback();
					  		/*$('.error').addClass('right').text('上传成功');
							setTimeout(function(){
								$('.error').removeClass('right');
							},1000);*/
					  	}else{
					  		require.ensure([],function(require){
	                            var Pop = require('../widgets/pop.js');
	                                //$('.error').addClass('cur').text('请上传视频文件');
	                            var pop = new Pop({
	                                title : '提示',
	                                content : _data.message,
	                                width: '70%',
	                                cancelBtn:false,
	                                timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
	                            });
	                        });
					  	}
					  	clear();
					},  
					error: function (returndata) {  
					  	require.ensure([],function(require){
                            var Pop = require('../widgets/pop.js');
                                //$('.error').addClass('cur').text('请上传视频文件');
                            var pop = new Pop({
                                title : '提示',
                                content : '<center>上传失败！</center>',
                                width: '70%',
                                cancelBtn:false,
                                timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                            });
                        });
						clear();
					}  
				});  

				/*T.ajax({
					type: 'POST',				
					url : upload.uploadVideo , 
					data : {
						//"baseCode":(base64.substr(start,b)),
						"baseCode":base64,
						"fileName":file.name,
						//'partNum' : indexNum,
						//'finish' : finish
					},
					success : function(_data){
						self.videos = _data.data;
						$('.error').addClass('right').text('上传成功');
						setTimeout(function(){
							$('.error').removeClass('right');
						},1000);
					}
				})*/
			}
			,submit : function(){
                var self = this,
                    describe = self.describe,
                    title = self.title;
                require.ensure([],function(require){
                    var Pop = require('../widgets/pop.js');
                    /*if(!self.isSelect){
                        //$('.error').addClass('cur').text('请上传视频文件');
                        var pop = new Pop({
                            title : '提示',
                            content : '<center>请选择视频文件</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
                        return;
                    }*/
                    if(title.length<2){
                        //$('.error').addClass('cur').text('标题不能底于2个字符');
                        var pop = new Pop({
                            title : '提示',
                            content : '<center>标题不能底于2个字符</center>',
                            width: '70%',
                            cancelBtn:false,
                            timing : 'errorcur', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                        });
                        return;
                    }
                    self.uploadFile(()=>{
                        var file = self.fileType,
                            videos = self.videos;
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
                               /* $('.error').addClass('right').text('提交成功！');
                                setTimeout(function(){
                                    $('.error').removeClass('right');
                                },1000)*/
                                var obj = {
                                    filed : true , 
                                    fileType : '',
                                    title : '' , 
                                    describe : '',
                                    base64 : '',
                                    videos : ''
                                } , 
                                text = '';
                                if(_data.code == 0){
                                    /*$('.error').addClass('right').text('提交成功');
                                    setTimeout(function(){
                                        $('.error').removeClass('right');
                                    },1000)*/
                                    //return;
                                    text = '视频上传成功';
                                }else{
                                    text = _data.message;
                                }
                                var pop = new Pop({
                                    title : '提示',
                                    content : '<center>'+text+'</center>',
                                    width: '70%',
                                    okTxt:'清空内容',
                                    nextBtn : true,
                                    nextTxt : '返回列表',
                                    cancelTxt:'保留内容',
                                    timing : 'bounceIn', //rotate3d , slideOutUp , slideOutDown , bounceIn , flipInX , flipInY , fadeIn
                                    okCallback:function(){
                                        $.extend(self,obj)
                                        pop.close();
                                    },
                                    nextCallback : function(){
                                        $.extend(self,obj)
                                        router.push('/video/list')
                                    }
                                });
                            }
                        })
                    },'pop');
				});
			}
		}
	}
</script>
