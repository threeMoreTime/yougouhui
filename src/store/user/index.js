import { reqPhoneCode, signAccount, userLogin ,reqUserInfo} from "@/api";
import {setToken} from '@/utils/TOKEN'
import { result } from "lodash";
// user模块的数据仓库
const state = {
  code: "",
  token:localStorage.getItem('TOKEN'),
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
      return Promise.reject(('账号或密码错误'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }, data) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      console.log(result);
      commit('GETUSERINFO',result.data)
      return 'OK'
    }else{
      return Promise.reject(('用户信息异常'))
    }
  },
};
const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters,
};
