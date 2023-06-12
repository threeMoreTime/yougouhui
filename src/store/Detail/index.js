import { detailedInfo } from "@/api";

//home模块的数据仓库
const state = {
  // 起始值是一个空数组 根据接口返回值创建数据
  goodinfo: {},
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
      console.log(result);
      
      // console.log(result);
      
    } else {
      console.log("请求错误");
    }
  },
};
const getters = {
  categoryView(state) {
    // goodinfo初始是空对象 加上按位或判断 防止控制台报错
    return state.goodinfo.categoryView||{};
  },
  // 售卖信息书简化
  skuInfo(state) {
    return state.goodinfo.skuInfo||{};
  },
  // 售卖属性简化
  spuSaleAttrList(state) {
    return state.goodinfo.spuSaleAttrList||[];
  },
};

export default {
  // 命名空间 上锁
  // namespaced:true,
  state,
  mutations,
  actions,
  getters,
};
