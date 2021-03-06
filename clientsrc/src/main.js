// @ts-nocheck
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./AuthConfig.js";
import { QuickVue } from "@bcwdev/quickvue";
import "./baseComponents"; // REVIEW Registers your file to be used globally
import "./eventBus"; // REVIEW State itself is actually an eventBus... Read up on this

Vue.use(QuickVue);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
