import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
    },
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.token = payload
            localStorage.setItem('token', payload)
        },

        SET_USER_INFO: (state, payload) => {
            state.userInfo = payload
            sessionStorage.setItem('userInfo', JSON.stringify(payload)) // TODO: session Storage
        },

        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem('token', '')
            sessionStorage.setItem('userInfo', JSON.stringify(''))
        }
    },
    getters: {
        getUser: state => {
            return state.userInfo
        }
    },
    actions: {},
    modules: {}
})
