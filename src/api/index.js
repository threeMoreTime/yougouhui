// 统一管理API
import requests from "./request";
import mockrequest from "./mockrequest"
import { get } from "lodash";
// 三级联动接口
export const reqCategoryList = () => requests({ method: 'get', url: '/product/getBaseCategoryList' });
// 上层轮播图数据
export const getbannerlist = () => mockrequest({ method: 'get', url: '/banner' })
//底层轮播图数据
export const getfloorlist =()=>mockrequest({method:'get',url:'/floor'})

