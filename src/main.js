import Vue from 'vue'
import App from './App'
import './style/icon/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: ['^pages/index/main','pages/myCenter/main','pages/study/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: "#bbb",
      selectedColor: "#1296db",
      borderStyle: "white",
      list: [
        {
          iconPath:"/static/imgs/index.png",
          selectedIconPath:"/static/imgs/index-active.png",
          pagePath: "pages/index/main",
          text: "首页"
        },
        {
          iconPath:"/static/imgs/study.png",
          selectedIconPath:"/static/imgs/study-active.png",
          pagePath: "pages/study/main",
          text: "我的学习"
        },
        {
          iconPath:"/static/imgs/mycenter.png",
          selectedIconPath:"/static/imgs/mycenter-active.png",
          pagePath: "pages/myCenter/main",
          text: "个人中心"
        }
      ]
    }
  }
}
