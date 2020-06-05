import Vue from 'vue'
import Vuex from 'vuex'
import Todo from './module/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo: Todo
  }
})
