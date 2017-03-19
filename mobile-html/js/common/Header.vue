<template>
<div>
	<div id="Header">
		<div class="user-info">
			<img :src='data.headImage'/>
			<span>{{data.realName}}</span>
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
		data(){
			return {
				data : ''
			}
		},
		beforeCreate:function(){
			var self = this;
			T.ajax({
				url : login.currentUser ,
				success : function( _data ){
					self.data = _data.data;
				}
			})
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