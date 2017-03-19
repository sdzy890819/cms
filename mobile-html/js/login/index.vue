<style lang='sass'>
@import '../../css/global';
::-webkit-input-placeholder {
　　color:#fff;
}
.login{ @include box; @include boxCenter; @include boxMiddle;
	@include contain('../../images/login_bg.jpg',cover);
	.content{  width:100%; @include box-sizing;
		padding:$s10 $s40;
		
	 }
	 .form{
	 	 width:100%; overflow:hidden;
	 	 ul{ padding:0; background:none; border:none;
	 	 	li{  @include boxMiddle;
 				height:$s33; line-height: $s33; margin:$s20 0; border:$s1 solid rgba(255,255,255,.2); background:rgba(255,255,255,.2); color:#fff;
 				i{ display: block; width:$s30; height:$s26; margin-left:$s10; @include contain('../../images/pepole.png'); 
 					&.i2{ width:$s20; height: $s30; margin-left:$s13; @include contain('../../images/suo.png'); }
 				}
	 	 		input{ display: block; height:100%; border:none; background:none; color:#fff; font-size:1rem;}
	 	 	}
	 	 }
	 	 .submit{ margin:0; padding:0; 
	 	 	.btn{ height:$s40; line-height: $s40; }
	 	 }
	 }
	.logo{  @include box; @include boxCenter; @include boxMiddle;
		width:$s80; height:$s80; margin-bottom: $s20; border-radius: 100%; border:$s5 solid rgba(255,255,255,.8);
		i{ display: block; width:$s40; height:$s40; @include contain('../../images/login_logo.png');}
	}
	.error{ margin:$s10 0; background:#fffb94; }
	.footer{ padding:$s10; margin-top:$s50;
		p{ font-size:$s12; text-align:center; line-height:$s16; }
	}
}
</style>
<template>
<div class='login'>
	<div class="logo"><i></i></div>
	<div class="content">
		<div class="form">
			<ul>
				<li>
					<i class="i1"></i>
					<input type="text" v-model="userName" maxlength="12" palceholder='帐号'/>
				</li>
				<li>
					<i class="i2"></i>
					<input type="password" v-model="pwd" maxlength="16" palceholder='密码'/>
				</li>
			</ul>
			<div class="error"></div>
			<div class="submit">
				<div class="btn" @click='submit'>提交</div>
			</div>
		</div>
	</div>
	<div class='footer'></div>
</div>
</template>
<script>
	import T from '../common/global.js';
	import {login} from '../common/URL.js';
	//import CryptoJS from '../common/AES_2.js';
	//import md5 from '../plug/md5.min.js';
	//import Base64 from '../plug/base64.js';
	function getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}
		else{
			return null;
		}
	} 
	export default {
		data (){
			return {
				userName : '',
				pwd : '',
				tt : '',
			}
		},
		beforeCreate (){
			var self = this;
			require.ensure([],function(require){
				self.md5 = require('../plug/md5.min.js');
			})
			T.ajax({
				url : login.init ,
				success : function( _data ){
					self.tt = _data.data.tt;										
				}
			})
		},
		mounted(){
			$('.login li input').click(function(){
				$('.error').removeClass('cur right')
			});
			var APP_DEVICE_IDFA = getCookie("APP_DEVICE_IDFA") , 
				APP_DEVICE_VERSION = getCookie("APP_DEVICE_VERSION"),
				APP_DEVICE_INFO = getCookie("APP_DEVICE_INFO");
				//getCookie("APP_DEVICE_IDFA") 版本号：getCookie("APP_DEVICE_VERSION") 设备信息：getCookie（“APP_DEVICE_INFO”）
			
			$('.footer').html(
				'<p>IDFA（MAC）：'+APP_DEVICE_IDFA+'</p>'
				+'<p>版本号：'+APP_DEVICE_VERSION+'</p>'
				+'<p>设备信息：'+APP_DEVICE_INFO+'</p>'
			)
		},
		methods : {
			submit : function(){
				var self = this ,
					md5 = self.md5,
					userName = this.userName , 
					pwd = this.pwd , 
					time = (new Date()).valueOf();
				if(userName.length<2){
					return $('.error').addClass('cur').text('用户名不能小于2位数')
				}
				if(pwd.length<5){
					return $('.error').addClass('cur').text('密码不能小于5位数')
				}

				//userName = 'AES128('+userName+self.tt+')'
				//pwd = CryptoJS.AES.encrypt(userName + pwd + time, self.tt).toString();
				pwd = md5(userName + pwd);
				
				/*使用接口4 获取到tt   使用tt AES128加密(userName的值+密码+time的串)
使用接口4 获取到tt   使用tt AES128加密(userName的值+密码+time的串)   tt是加密秘钥
不是
AES是一种加密
你要实现的*/
				T.ajax({
					url : login.login ,
					type : 'post',
					data : {
						userName : userName , 
						pwd : pwd , 
						time : time , 
						tt : self.tt
					},
					success : function( _data ){
						if(_data.code == 0){
							router.push('/');
						}
						else if(_data.code == -1){
							$('.error').addClass('cur').text('用户名称或密码错误！')
						}
					},
					error : function(){
						$('.error').addClass('cur').text('其他错误，请联系技术员！')
					}
				})
				/*T.ajax({
					url : login.init ,
					success : function( _data ){
						self.tt = _data.data.tt;
					}
				})*/
			}
		}
	}
</script>