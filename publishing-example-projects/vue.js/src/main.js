import Vue from 'vue'
import App from './App.vue'

// WEB COMPONENTS IMPORTS
import { defineCustomElements } from 'web-components-stencil/loader'

Vue.config.productionTip = false

// WEB COMPONENTS IMPORTS
defineCustomElements(window);

new Vue({
  render: h => h(App),
}).$mount('#app')