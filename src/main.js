import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'lib-flexible/flexible.js'
import './config/http'
import 'mint-ui/lib/style.min.css'
import './common/style/swiper.min.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueAwesomeSwiper)

window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  var lastTouchEnd = 0
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  }, false)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
