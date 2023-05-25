import {reqgoodslist} from '@/api'
// search模块的数据仓库
const state ={
    searchlist:{},
}
const mutations ={
    GETSEARCHLIST(state,searchlist){
        state.searchlist=searchlist
    }
}
const computed ={

}
const actions ={
    // 发送请求获取数据的地方
    async getsearchlist({commit},params){
       let result =  await reqgoodslist(params);
       if (result.code==200) {
        commit('GETSEARCHLIST',result.data)
       }
    }
 
    
}
const getters ={}



export default {
    state,
    mutations,
    actions,
    getters
}