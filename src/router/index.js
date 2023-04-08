// 配置路由
import Vue from 'vue';
import Vuerouter from 'vue-router';
// 使用插件
Vue.use(Vuerouter);
// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { search } from 'core-js/library/es6/symbol';
export default new Vuerouter({
	routes:[
		{
		path:'/home',
		component:Home,
		// 配置路由元信息来判断是否需要显示Footer组件 方法为$route.meat.show 如果show属性为true则显示 false 则不显示
		meta:{show:true}
		},
		{
			// 在占位符后面加上?qapams参数就可传可不传
		path:'/Search/:keyword?',
		component:Search,
		name:'search',
		meta:{show:true}
		},
		{
		path:'/Login',
		component:Login,
		meta:{show:false},
		name:'login'
		},
		{
		path:'/Register',
		component:Register,
		meta:{show:false}
		},
		{
			// 默认跳转到首页
			path:'*',
			redirect:'/home'	
		}
	]
	
	
	
})