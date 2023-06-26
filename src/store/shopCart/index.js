// 购物车仓库
import { reqCartInfo, deleteCartInfo, EditCartInfo } from "@/api";
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
  // 删除某个商品的信息
  async deleteCartInfo({ commit }, skuId) {
    let result = await deleteCartInfo(skuId);

    if (result.code == 200) {
      console.log("删除成功", result);
    } else {
      return Promise.reject(new error("faile"));
    }
  },
  // 删除勾选的商品
  allDeleteCartInfo({ commit, state, dispatch }) {
    let arr = [];
    state.Cartinfo[0].cartInfoList.forEach((item) => {
      if (item.isChecked == 1) {
        let delteInfo = dispatch("deleteCartInfo", item.skuId);
        arr.push(delteInfo);
      }
      return Promise.all(arr);
    });
  },
  // 修改某一个商品选中状态
  async EditCartInfo({ commit }, { skuId, isChecked }) {
    let result = await EditCartInfo(skuId, isChecked);
    if (result.code == 200) {
      console.log(result, "result");
      return "ok";
    } else {
      return Promise.reject(new error("faile"));
    }
  },
  // 修改全部商品的勾选信息
  allUpdateChecked({ commit, state, dispatch }, isChecked) {
    let arr = [];
    // 遍历购物车数据 根据数量决定调用EditCartInfo的次数
    state.Cartinfo[0].cartInfoList.forEach((item) => {
      let editArr = dispatch("EditCartInfo", { skuId: item.skuId, isChecked });
      arr.push(editArr);
    });
    return Promise.all(arr);
  },
};
const getters = {
  // 简化后的信息数组
  cartListInfo(state) {
    return state.Cartinfo[0] || [];
  },
  // 简化后的购物车列表信息
  cartInfoList(state) {
    return state.Cartinfo[0].cartInfoList || [];
  },
};

export default {
  // 命名空间 上锁 防止其它仓库有重名的方法
  // namespaced:true,
  state,
  mutations,
  actions,
  getters,
};
