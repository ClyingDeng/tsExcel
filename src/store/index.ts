import Vue from 'vue';
import Vuex from 'vuex';
import { StoreData } from './modules/user';
Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    StoreData
  }
});
export default Store;
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
// actions: {
// },
// modules: {
// },
// });
