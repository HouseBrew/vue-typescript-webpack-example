import Vue from 'vue'
// import router from '@/router'
// import store from '@/store'

import {router, store} from '@/modules'

import App from '@/App.vue'

const app = new Vue({
  components: { App },
  el: '#app',
  router,
  store,
  template: '<App/>'
})
export default app
