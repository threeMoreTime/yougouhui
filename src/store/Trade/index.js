// Trade小仓库
import { reqOrderInfo, reqUserAddress,pushOrderInfo } from "@/api";
const state = {
  // 订单信息
  order: {},
  // 地址信息
  address: [],
  payId:''

};
const mutations = {
  ORDER(state, order) {
    state.order = order;
  },
  ADDRESS(state,address){
    state.address=address
  },
  SUBMITINFO(state,payId){
  state.payId = payId
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
  //提交订单:tradeNO 交易编码   data:付款人信息
  async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
    //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
    let result = await pushOrderInfo(tradeNo, data);
    if (result.code == 200) {
      console.log('payId',result);
        commit('SUBMITINFO', result.data);
        return 'ok';
    } else {
        return Promise.reject(new Error(result.message));
    }
}
};
const getters = {
  address(state){
    return state.address||[]
  },
  order(state){
    return state.order||{}
  },
  payId(state){
    return state.payId||''
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
};
