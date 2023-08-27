// 统一管理API
import requests from "./request";
import mockrequest from "./mockrequest"
import { method } from "lodash";
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
export const reqPhoneCode = (phone) => requests({ method: 'get', url: `/user/passport/sendCode/${phone}` });
//获取商品信息 需要一个对象参数 (params)
export const reqgoodslist = (params)=>requests({method:'post',url:'/list',data:params})
// 获取详细商品信息数据
export const detailedInfo = (skuId ) => requests({method:'get',url:`/item/${skuId}`})
// 添加购物车
export const addToCart  = (skuId, skuNum) => requests({method:'post',url:`/cart/addToCart/${skuId}/${skuNum}`});
// 获取购物车信息
export const reqCartInfo = () => requests({ method: 'get', url: '/cart/cartList' });
// 删除购物车信息
export const deleteCartInfo =(skuId)=>requests({method:'DELETE',url:`/cart/deleteCart/${skuId}`})
// 修改购物车选中信息
export const EditCartInfo =(skuID,isChecked)=>requests({method:'get',url:`/cart/checkCart/${skuID}/${isChecked}`})
// 注册用户账号
export const signAccount = (data) => requests({url:'/user/passport/register',data,method:'post'})
// 用户登陆
export const userLogin = (data) =>requests({url:'/user/passport/login',data,method:'post'})
// 获取用户信息
export const reqUserInfo=(token)=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登陆
export const signOut=()=>requests({url:'/user/passport/logout',method:'get'})
// 获取用户订单信息
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})
// 获取用户地址信息
export const reqUserAddress=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 提交订单接口
export const pushOrderInfo=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
// 获取支付信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
//查询支付结果
export const reqPayResult = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取我的订单
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});