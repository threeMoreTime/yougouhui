import {reqCategoryList} from '@/api'
//home模块的数据仓库
const state ={ 
  arr:[]
};
const computed ={};
const mutations ={
  // test(state,res){
  //   state.arr=res
  //   console.log(state.arr)
  // }
};
const actions = {
    async CategoryList({commit}) {
      let result = await reqCategoryList();
      
      if(result.code == 200){
        console.log('请求成功');
        console.log(result);
      }else{
        console.log('请求错误');
      }
      // commit("test",result)
     
    }
  };
const getters ={};

export default{
  // 命名空间 上锁
  // namespaced:true, 
  state,
  mutations,
  actions,
  getters
} 
