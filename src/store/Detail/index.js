import { detailedInfo, addToCart } from "@/api";
import { getuuid } from "@/utils/UUID_TOKEN";
//home模块的数据仓库
const state = {
  // 起始值是一个空数组 根据接口返回值创建数据
  goodinfo: {},
  // 获取游客身份
  UUID_TOKEN: getuuid(),
};
const computed = {};
const mutations = {
  DETAILINFO(state, goodinfo) {
    state.goodinfo = goodinfo;
  },
};
const actions = {
  // 派发action  商品列表数据
  async detailedInfo({ commit }, sukId) {
    let result = await detailedInfo(sukId);
    if (result.code == 200) {
      commit("DETAILINFO", result.data);
    } else {
      console.log("请求错误");
    }
  },
  async addToCart({ commit }, { skuId, skuNum }) {
    let result = await addToCart(skuId, skuNum);
    if (result.code == 200) {
      console.log('成功');
      console.log('result',result);
      
    } else {
      return Promise.reject(new error("faile"));
    }
  },
};
const getters = {
  categoryView(state) {
    // goodinfo初始是空对象 加上按位或判断 防止控制台报错
    return state.goodinfo.categoryView || {};
  },
  // 售卖信息书简化
  skuInfo(state) {
    return state.goodinfo.skuInfo || {};
  },
  // 售卖属性简化
  spuSaleAttrList(state) {
    return state.goodinfo.spuSaleAttrList || [];
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
