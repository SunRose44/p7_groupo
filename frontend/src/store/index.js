import axios from 'axios'
import { createStore } from 'vuex'

const index = createStore({
	state: {
		token: null,
		userID: null,
		roles: null
	},
	getters: {
		isLogged(state) {
			console.log(state)
			return state.token && state.userID
		},
		isAdmin(state) {
			return state.roles.includes['admin']
		}
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		setUserID(state, userID) {
			state.userID = userID
		},
		setRoles(state, roles) {
			state.roles = roles
		},
		initialiseStore(state) {
			console.log("init")
			console.log(localStorage)
			if(localStorage.getItem('token')) {
				state.token = localStorage.getItem('token')
			}

			if(localStorage.getItem('userID')) {
				state.userID = localStorage.getItem('userID')
			}

			if(localStorage.getItem('roles')) {
				state.roles = localStorage.getItem('roles')
			}
		}
	},
	actions: {
		async login({ commit }, credentials) {
			let response = await axios.post('http://localhost:3000/api/auth/login', credentials)
			commit('setToken', response.data.token)
			commit('setUserID', response.data.userID)
			commit('setRoles', response.data.roles)
			localStorage.setItem('token', response.data.token)
			localStorage.setItem('userID', response.data.userID)
			localStorage.setItem('roles', response.data.roles)
			return null
		},

		async signup({ commit }, credentials) {
			let response = await axios.post('http://localhost:3000/api/auth/signup', credentials)
			commit('setToken', response.data.token)
			commit('setUserID', response.data.userID)
			commit('setRoles', response.data.roles)
			localStorage.setItem('token', response.data.token)
			localStorage.setItem('userID', response.data.userID)
			localStorage.setItem('roles', response.data.roles)
			return null
		},

		logout({ commit }) {
			commit('setToken', null)
			commit('setUser', null)
			commit('setRoles', null)
			localStorage.removeItem('token')
			localStorage.removeItem('userID')
			localStorage.removeItem('roles')
			return null
		}
	},
})

export default index
