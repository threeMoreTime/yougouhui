import { reqPhoneCode, signAccount, userLogin ,reqUserInfo,signOut} from "@/api";
import {setToken,getToken,deleteToken} from '@/utils/TOKEN'
// user模块的数据仓库
const state = {
  code: "",
  token:getToken(),
  userinfo:{}
};
const mutations = {
  // 更改state中状态的唯一方式
  GETCODE(state, code) {
    state.code = code;
  },
  GETUSERINFO(STATE,result){
    STATE.userinfo = result
  },
  GETTOKEN(state,token){
    state.token=token
  },
  CLEARALL(state){
    state.userinfo='',
    state.token='',
    // 清楚本地存储中的token
    deleteToken();
  }
};
const actions = {
  //  验证码获取
  async getPhoneCode({ commit }, phone) {
    let result = await reqPhoneCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
    } else {
      return Promise.reject(new error("faile"));
    }
  },
  // 注册账号
  async registrationInfo({}, data) {
    let result = await signAccount(data);
    try {
      if (result.code == 200) {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  },
  // 登陆获取TOKEN信息
  async userLogin({ commit }, data) {
    let result = await userLogin(data);
    if (result.code == 200) {
      commit('GETTOKEN',result.data.token)
      // 持久化存储token
      setToken(result.data.token)
      return 'OK'
    }else{
      return Promise.reject(new Error(result.message));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit('GETUSERINFO',result.data)
      return 'OK'
    }else{
      return Promise.reject(('用户信息异常'))
    }
  },
  // 退出登陆
  async userSignOut({commit}){
    let result = await signOut();
    if (result.code==200) {
      // 清除用户信息
      commit('CLEARALL')

    }else{
      return Promise.reject(new Error('退出失败'))
    }
  }
};
const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters,
};
