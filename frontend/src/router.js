import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Posts from './pages/Posts.vue'
import auth from './middlewares/auth'

const routes = [
	{ name: 'login', path: '/login', component: Login },
	{ name: 'signup', path: '/signup', component: Signup },
	{ name: 'posts', path: '/posts', component: Posts, beforeEnter: auth }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router