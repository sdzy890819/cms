<template>
	<div id='Nav'>
		<ul>
			<li >
				<router-link to="/new" active-class='active'>
					<i class="new"></i>
					<p>新闻</p>
				</router-link></li>
			<li>
				<router-link to="/image" active-class='active'>
					<i class="image"></i>
					<p>图片</p>
				</router-link></li>
			<li>
				<router-link to="/video" active-class='active'>
					<i class="video"></i>
					<p>视频</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name : 'Nav',
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