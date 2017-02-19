<style lang='sass'>
@import '../../css/global';
::-webkit-input-placeholder {
　　color:#fff;
}
.login{ @include box; @include boxCenter; @include boxMiddle;
	@include contain('../../images/login_bg.jpg');
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
</div>
</template>
<script>
	import T from '../common/global.js';
	import {login} from '../common/URL.js';
	import AES from '../common/AES.js';
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
			})
		},
		methods : {
			submit : function(){
				var self = this ,
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
				pwd = 'AES128('+pwd+self.tt+')'+time
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
						time : time
					},
					success : function( _data ){
						if(_data.data.code == 0){
							router.push('/');
						}
						else if(_data.data.code == -1){
							$('.error').addClass('cur').text('用户名称或密码错误！')
						}
					}
				})
			}
		}
	}
</script>