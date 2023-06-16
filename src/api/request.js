
import axios from "axios"
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
const requests = axios.create({
	// 基础路径
	baseURL:'/api',
	// 超时时间5秒
	timeout:5000,
});
// 请求拦截器 在发送请求前可以做一些时间
requests.interceptors.request.use((config)=>{
	nprogress.start();
	console.log(store);
	
	if(store.state.detail.UUID_TOKEN){
		config.headers.userTempId=store.state.detail.UUID_TOKEN
		// console.log(store.state.detail.UUID_TOKEN);
		
	}
	
	
	return config;
});

// 响应拦截器 响应后成功失败后的反应
requests.interceptors.response.use((res)=>{
	nprogress.done();
	return res.data;
},(error)=>{
	return Promise.reject();
});

// 暴露axios对象requests
export default requests;



