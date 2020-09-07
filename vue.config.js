module.exports = {
  publicPath: "/",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.map.baidu.com',
        changeOrigin: true,//是否跨域 开启代理：在本地创建一个虚拟服务器
        // ws: true,//是否代理websockets
        // secure: false,//如果是https接口，需要配置这个参数
        pathRewrite: { '^/api': '' } //重写路径
      }
    },
    open: true
  },
}