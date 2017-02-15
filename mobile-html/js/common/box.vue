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
	import Header from '../common/Header';
	import Nav from '../common/Nav';
	export default {
		components : {
			Header,
			Nav
		}
	}
</script>