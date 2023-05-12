<template>
	<div>
		<Header></Header>
		<router-view></router-view>
		<Footer v-show="$route.meta.show"></Footer>
	</div>
</template>
	 
<script>
// 基本路径配置 不需要写index.vue
import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
	name: '',
	components: {
		Header,
		Footer
	}, mounted() {
		// 通知Vuex发送请求 获取数据 存储与仓库中
		this.$store.dispatch("categoryList");
	}
}
</script>

<style scoped></style>
