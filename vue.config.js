module.exports = {
	productionSourceMap:false,
	// 关闭ESLINT校验工具
	lintOnSave: false,
	//配置代理跨域
	devServer: {
		// port:'8080',
		// host:'loaclhost',
	  proxy: {
		"/api": {
		  target:"http://gmall-h5-api.atguigu.cn",
		  ChangeOrigin:true
		},
	  },
	},
  };
  