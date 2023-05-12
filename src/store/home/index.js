import { reqCategoryList, getbannerlist } from '@/api'

//home模块的数据仓库
const state = {
  // 起始值是一个空数组 根据接口返回值创建数据
  categoryList: [],
};
const computed = {


};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
};
const actions = {

  async categoryList({ commit }) {
    let result = await reqCategoryList();

    if (result.code == 200) {
      commit('CATEGORYLIST', result.data);
    } else {
      console.log('请求错误');
    }
  },
  async getbannerlist(){
    let  result = await getbannerlist();
    console.log('result');
    
  }
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
