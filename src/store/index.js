import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
// 导入组件
import home from './home'
import search from './search'
import detail from './Detail'
// 创建Vuex的实例
 const store = new Vuex.Store({
    modules:{
        home,search,detail

    } 
})
export default store