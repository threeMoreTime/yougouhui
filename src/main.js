import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router";
// 三级联动注册全局组件
import TypeNav from "@/components/TypeNav";
// 注册轮播图全局组件
import Carousel from "@/components/Carousel";
// 引入分页器全局组件
import Pagination from "@/components/Pagination"
// 引入仓库
import store from "@/store";
// 第一个参数：全局组件的名字 第二个参数 是哪个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name,Pagination)
Vue.use(router);
// 引入mockServe.js---mock数据
import "@/mock/mockServe";
Vue.config.productionTip = false;
// 注册路由信息 使组件身上都具有$router和$route属性
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  // 添加全局组件通信
}).$mount("#app");
