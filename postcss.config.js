module.exports = {
    plugins: {
        // autoprefixer: {
        //     browsers:['Android >= 4.0', 'IOS >= 8']
        // },
        // postcss-pxtorem 插件的版本需要 >= 5.0.0
        // 用于将 px 单位转化为 rem 单位
        // 该插件**不能转换行内样式中的 `px`**
        //vant ui 是以37.5px 为基准值 而设计稿/10等于75,所以rootValue函数动态设置根元素的px
        'postcss-pxtorem': {
          rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75;
          },
          propList: ['*'],//是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
          unitPrecision: 5, //保留rem小数点多少位
          //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
          replace: true, //这个真不知到干嘛用的。有知道的告诉我一下
          mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
          minPixelValue: 12, //px小于12的不会被转换
          },
      },
}