import { detailedInfo} from '@/api'

//home模块的数据仓库
const state = {
  // 起始值是一个空数组 根据接口返回值创建数据
  Detailinfo:{},
};
const computed = {


};
const mutations = {
  DETAILINFO(state, Detailinfo) {
    state.Detailinfo = Detailinfo;
  },
};
const actions = {
  // 商品列表数据
  async detailedInfo({ commit },sukId={}) {
    let result = await detailedInfo(sukId);
    if (result.code == 200) {
      commit('DETAILINFO', result.data);
    } else {
      console.log('请求错误');
    }
  },
};
const getters = {};

export default {
  // 命名空间 上锁
  // namespaced:true, 
  state,
  mutations,
  actions,
  getters
} 
