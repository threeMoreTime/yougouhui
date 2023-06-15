import { reqCategoryList, getbannerlist, getfloorlist } from '@/api'

//home模块的数据仓库
const state = {
  // 起始值是一个空数组 根据接口返回值创建数据
  categoryList: [],
  bannerList: [],
  floorList:[],
};
const computed = {


};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state,floorList){
    state.floorList = floorList
  }
};
const actions = {
  // 商品列表数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();

    if (result.code == 200) {
      commit('CATEGORYLIST', result.data);
    } else {
      console.log('请求错误');
    }
  },
  // 上层轮播图数据  getbannerlist
  async getbannerlist({ commit }) {
    try {
      let result = await getbannerlist();
      // console.log(result, 'bannner轮播图中的数据');
      commit('BANNERLIST', result.data);
    }
    catch (error) {
      console.error(error);
    }
  },
  //底层轮播图数据
  async getfloorlist({commit}) {
    
    try {
      let result = await getfloorlist();
      commit('FLOORLIST',result.data);
      // console.log(result,'floor轮播图中的数据');
      
    } catch (error) {
      console.log('error');
      
    }

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
