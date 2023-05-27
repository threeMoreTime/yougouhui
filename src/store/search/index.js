import { reqgoodslist } from "@/api";
// search模块的数据仓库
const state = {
  // 初始状态
  searchlist: {},
};
const mutations = {
  // 更改state中状态的唯一方式
  GETSEARCHLIST(state, searchlist) {
    state.searchlist = searchlist;
  },
};
const actions = {
  // 向getsearchlist接口发送请求时 至少需要一个参数（空对象）
  async getsearchlist({ commit }, params = {}) {
    let result = await reqgoodslist(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// 计算属性，在项目当中是为了简化数据而生的
const getters = {
  // state形参是当前仓库的state，不是大仓库的state
  goodsList(state){
    return state.searchlist.goodsList;
  },
  attrsList(state){
    return state.searchlist.attrsList;
  },
  trademarkList(state){
    return state.searchlist.trademarkList;
  }
};


export default {
  state,
  mutations,
  actions,
  getters,
};
