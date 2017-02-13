<template>
<div>
	<Header></Header>
	<article class="container">
		<transition name="fade" mode="in-out">
			<router-view class="new"></router-view>
		</transition>
	</article>
	<Nav></Nav>
</div>
</template>
<script>
	import Header from '../common/Header';
	import Nav from '../common/Nav';
	export default {
		name : 'newindex',
		components : {
			Header,
			Nav
		},
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