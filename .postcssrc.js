module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 把px转为rem
    'postcss-pxtorem': {
      // lib-flexible 的rem适配方案 把一行分为10份，每份就是十分之一
      // 所以rootValue应该设置为你的设计稿宽度的十分之一
      // 我们的设计稿是750，所以应该设置为 750 / 10 = 75
      // 但是vant建议设置为 37.5 为什么vant 是基于 375 写的
      // 所以必须设置为37.5 唯一的缺点是 设计稿的尺寸应该除二
      // 有没有更好的方法
      // 如果是vant的样式，就按照37.5来转换
      // 如果是我们自己的样式，就按照75来转换
      // postcss 处理每个css文件的时候都会来调用这个函数
      // 它会把被处理的css文件相关的信息通过参数传递给该函数
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性
      // * 表示所有
      propList: ['*']
    }
  }
}
