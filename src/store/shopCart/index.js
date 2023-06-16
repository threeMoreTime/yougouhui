import { reqCartInfo } from "@/api";
//shopCart模块的数据仓库
const state = {
  // 起始值是一个空数组 根据接口返回值创建数据
  Cartinfo: [],
};
const computed = {};
const mutations = {
  CARTINFO(state, Cartinfo) {
    state.Cartinfo = Cartinfo;
  },
};
const actions = {
  // 派发action  商品列表数据
  async reqCartInfo({ commit }) {
    let result = await reqCartInfo();
    if (result.code == 200) {
      commit("DETAILINFO", result.data);
      console.log(result);
      
    } else {
      console.log("请求错误");
    }
  },
};
const getters = {
};

export default {
  // 命名空间 上锁 防止其它仓库有重名的方法
  // namespaced:true,
  state,
  mutations,
  actions,
  getters,
};
