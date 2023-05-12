import Mock from 'mockjs'
// webpack图片和json文件默认暴露
import banner from './banner.json'
import floor from './floor.json'
// mock模拟banner和floor轮播图的数据
Mock.mock('./mock/banner', { code: 200, data: banner })//首页大的轮播图数据
Mock.mock('./mock/floor', { code: 200, data: floor })