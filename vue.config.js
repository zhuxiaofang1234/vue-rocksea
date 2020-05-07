const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-rocksea/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"));
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    host: "localhost",
    port: "8084",
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true
    },
    proxy: {
      //配置跨域
      "/api": {
        target: "http://test.rocksea.net.cn:9000/",
        changOrigin: true, //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          "^/api": ""
        }
      }
    }
  }
};
