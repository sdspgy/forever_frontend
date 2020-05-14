module.exports = {
    publicPath: '/' + process.env.VUE_APP_PUBLICPATH + '/',
    outputDir: process.env.VUE_APP_OUTPUTDIR,
    assetsDir: process.env.VUE_APP_ASSETSDIR,
    devServer: {
        host: '10.2.10.41',
        port: 1199,
        proxy: {
            '/meng': {
                target: 'http://10.2.10.41:9001',  // 请求本地 拦截/rbac代理到后台项目
                ws: true
            },
            // '/forever': {
            //     target: 'http://127.0.0.1:11111',
            //     ws: true,//如果要代理websockets,配置这个参数
            //     changeOrigin: true,//是否跨域
            //     pathRewrite: {
            //         '^/forever': ''
            //     }
            // }
        }
    },
}
