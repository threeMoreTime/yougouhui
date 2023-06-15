// 统一管理API
import requests from "./request";
import mockrequest from "./mockrequest"
// 三级联动接口
export const reqCategoryList = () => requests({ method: 'get', url: '/product/getBaseCategoryList' });
// 上层Mock轮播图数据
export const getbannerlist = () => mockrequest({ method: 'get', url: '/banner' })
//  底层Mock轮播图数据
export const getfloorlist = () => mockrequest({ method: 'get', url: '/floor' })
//  获取线上轮播图数据
export const reqbanner = () => requests({ method: 'get', url: '/cms/banner' });
//  获取用户信息数据
export const reuUserInfo = () => requests({ method: 'get', url: '/user/passport/auth/getUserInfo' });
//  获取验证码数据
export const reqphone = () => requests({ method: 'get', url: '/user/passport/sendCode/${17770215704}' });
//获取商品信息 需要一个对象参数 (params)
export const reqgoodslist = (params)=>requests({method:'post',url:'/list',data:params})
// 获取详细商品信息数据
export const detailedInfo = (skuId ) => requests({method:'get',url:`/item/${skuId}`})
// 添加购物车
export const addToCart  = (sukId, skuNum) => requests({method:'post',url:`/cart/addToCart/${sukId}/${skuNum}`});