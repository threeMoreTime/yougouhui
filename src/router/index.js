// 配置路由
import Vue from "vue";
import Vuerouter from "vue-router";
// 使用插件
Vue.use(Vuerouter);
// 引入路由组件
import routes from "./routes";

export default new Vuerouter({
  // es6简写 key value一致只写k
  routes,
    // 滚动行为,始终滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    return { y:0 };
  },
});
