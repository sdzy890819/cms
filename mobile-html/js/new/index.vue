<template>
<div>
	<Header></Header>
	<article class="container">
		<router-view class="new"></router-view>
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