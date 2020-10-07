// IE polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/css/reset.less'
import '@/plugins/antdv'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
