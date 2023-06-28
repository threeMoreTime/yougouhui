import { reqPhoneCode,signAccount } from "@/api";
// Register模块的数据仓库
const state = {
     code:''
};
const mutations = {
  // 更改state中状态的唯一方式
  GETCODE(state,code){
    state.code = code
 }
};
const actions = {
//  验证码获取
async getPhoneCode({commit},phone){

        let result = await reqPhoneCode(phone);
        if (result.code==200) {
         
         commit('GETCODE',result.data)
        }else{
          return Promise.reject(new error("faile"));
        }
},
// 注册账号
async registrationInfo({},data){
  let  result = await signAccount(data);
  try {
    if (result.code==200) {
      console.log(result);
      
    }
  } catch (error) {
    console.error(error);
    
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
