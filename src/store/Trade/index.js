// Trade小仓库
import { reqOrderInfo, reqUserAddress } from "@/api";
const state = {
  // 订单信息
  order: {},
  // 地址信息
  address: [],
};
const mutations = {
  ORDER(state, order) {
    state.order = order;
  },
  ADDRESS(state,address){
    state.address=address
  }

};

const actions = {
  // 获取用户订单信息
  async getOrderList({ commit }) {
    try {
      let result = await reqOrderInfo();
      if (result.code == 200) {
        commit("ORDER", result.data);
      }
    } catch (error) {
      return Promise.reject(new Error("请求异常"));
    }
  },
  // 获取用户地址信息
  async getAddressList({ commit }) {
    try {
      let result = await reqUserAddress();
      if (result.code == 200) {
       commit('ADDRESS',result.data)
      }
    } catch (error) {
      return Promise.reject(new Error('请求异常'))
    }
  },
};
const getters = {
  address(state){
    return state.address||[]
  },
  order(state){
    return state.order||{}
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
};
