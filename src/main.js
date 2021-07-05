import { createApp } from 'vue'
import App from './App.vue'
import VueWeb3 from "./plugins/vue-web3";
import VueIpfs from "./plugins/vue-ipfs";
import router from "./router";

createApp(App)
  .use(router)
  .use(VueWeb3)
  .use(VueIpfs)
  .mount('#app')
