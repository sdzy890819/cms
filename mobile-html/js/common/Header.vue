<template>
<div>
	<div id="Header">
		<div class="user-info">
			<img src='http://js.jrjimg.cn/zqt-red-1000/images/v2/pic_01.jpg'/>
			<span>用户名</span>
		</div>
		<div class="aside">
			<p @click='loginout'>退出</p>
		</div>
	</div>
</div>
</template>
<script>
	import T from '../common/global.js';
	import {login} from '../common/URL.js';
	export default {
		name : 'Header',
		props : {

		},
		data (){
			return {
				
			}
		},
		methods :{
			loginout : function(){
				T.ajax({
					url : login.loginOut ,
					type : 'post',
					success : function( _data ){
						if(_data.code == 0){
							router.push('/login');
						}
					}
				})
			}
		}
	}
</script>
<style scoped>

</style>