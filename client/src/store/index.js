import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import moduleProduit from './modules/produit'

Vue.use(Vuex)
export default new Vuex.Store({
  // initialisation des données
  state: {
    produits: [],
    produit: {},
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  // les getters sont utilisés pour récupérer tout ou parti des variables du store ou en calculer
  getters: {
    getProduits: state => state.produits,
    logged: state => !!state.token,
    authStatus: state => state.status,
  },
  // sles mutations sont utilisées pour mettre à jour les données
  mutations: {
    setProduits(state, listeProduits) {
      state.produits = listeProduits
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.status = ''
    }
    // ajoutProduit(state, nouveauProduit){
    //   state.produits += nouveauProduit
    // }
  },
  actions: {
    getProduits: ({ commit }) => {
      axios.get('http://localhost:4000/api/produits')
        .then((response) => { commit('setProduits', response.data) })
    },
    login({ commit }, user) {
      return new Promise((resolve) => {
        commit('auth_request')
        axios({ url: 'http://localhost:4000/api/auth/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)

          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
  modules: {
    // moduleProduit
  }
})
