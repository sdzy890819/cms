<template>
<div>
	<Header></Header>
	<article class="container">
		<transition name="fade" mode="in-out">
			<router-view class='content-box'></router-view>
		</transition>
	</article>
	<Nav></Nav>
</div>
</template>
<script>
	import Header from './Header';
	import Nav from './Nav';
	export default {
		components : {
			Header,
			Nav
		}
	}
</script>