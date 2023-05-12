// 统一管理API
import requests from "./request";
import mockrequest from "./mockrequest"
// 三级联动接口
export const reqCategoryList = () => requests({ method: 'get', url: '/product/getBaseCategoryList' });
// 轮播图数据
export const getbannerlist = () => mockrequest({ method: 'get', url: '/banner' })


