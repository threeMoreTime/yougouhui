// 配置路由
import Vue from "vue";
import Vuerouter from "vue-router";
// 使用插件
Vue.use(Vuerouter);
// 引入路由组件
import routes from "./routes";
// 引入仓库
import store from "@/store";
import { toPath } from "lodash";

let router = new Vuerouter({
  // es6简写 key value一致只写k
  routes,
  // 滚动行为,始终滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});
// 前置守卫：路由跳转前执行 from：从哪来 to：到哪去 next（‘path’）:实际去哪 next()：全部放行
router.beforeEach(async (to, from, next) => {
  next();
  // 引入了store的写法
  let token = store.state.user.token;
  let name = store.state.user.userinfo.name;
  if (token) {
    if (to.path == "/login") {
      // 已经登陆，不能返回login路由
      next("home");
    } else {
      // 如果去别的路由，判断用户信息是否过期
      if (name) {
        // 未过期
        next();
      } else {
        // 已过期就重新发送请求获取用户信息
        try {
          await store.dispatch("getUserInfo");
          next()
        } catch (error) {
          // token过期 清除token跳转到登陆
          await store.dispatch("userSignOut");
        }
      }
    }
  } else {
    next()
  }
});

export default router;
