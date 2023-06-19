import { reqCartInfo ,deleteCartInfo} from "@/api";
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
      commit("CARTINFO", result.data);
    } else {
      console.log("请求错误");
    }
  },
  async deleteCartInfo({commit},skuId){
    let result = await deleteCartInfo(skuId)
    
      if (result.code==200) {
        console.log('删除成功',result);
      }else{
        return Promise.reject(new error("faile"))
      }
    
  }
};
const getters = {
  // 简化后的信息数组
  cartListInfo(state){
    return state.Cartinfo[0]||[]
  },
  // 简化后的购物车列表信息
  cartInfoList(state){
    return state.Cartinfo[0].cartInfoList||[]
  }

};

export default {
  // 命名空间 上锁 防止其它仓库有重名的方法
  // namespaced:true,
  state,
  mutations,
  actions,
  getters,
};
