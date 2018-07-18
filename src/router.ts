import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  fallback: true,
  routes: [
    { name: 'home', path: '', redirect: { name: 'members/home' } }
  ]
})

/* for debug only */
router.beforeEach((to, from, next) => {
  console.debug(to, from, next)
  next()
})

export default router
