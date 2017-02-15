<template>
<div>
	<div id="Header">
		<div class="user-info">
			<img src='http://js.jrjimg.cn/zqt-red-1000/images/v2/pic_01.jpg'/>
			<span>用户名</span>
		</div>
		<div class="aside">
			<router-link to="/login">
				<p>退出</p>
			</router-link>
		</div>
	</div>
</div>
</template>
<script>
	export default {
		name : 'Header',
		props : {

		},
		data (){
			return {
				
			}
		},
		ready(){
		}
	}
</script>
<style scoped>

</style>