// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')



// import Vue from 'vue'
// import App from './App.vue'
// import router from '../src/router/index';

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')