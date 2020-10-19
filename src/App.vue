<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	created() {
		if (localStorage.getItem('server') && localStorage.getItem('keys')) {
			this.$router.push(`/server${localStorage.getItem('server')}`)
		} else if (localStorage.getItem('keys')) {
			this.$router.push('/general')
		} else {
			this.$router.push('/')
		}
	}
}
</script>

<style lang="scss">
@import '@/assets/styles/general.scss';
</style>
