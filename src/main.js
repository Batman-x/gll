import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入重置样式
import './assets/resrt/resrt.css'

// 引入iocn
import './assets/fontcss/iconfont.css'

// 给vue原型挂载￥bus
Vue.prototype.$bus = new Vue()

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


