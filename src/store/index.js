import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 导入组件
import home from "./home";
import search from "./search";
import detail from "./Detail";
import shopCart from "./shopCart";
import register from "./register";
// 创建Vuex的实例
const store = new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopCart,
    register
  },
});
export default store;
