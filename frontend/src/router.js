import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Posts from './pages/Posts.vue'
import Post from './pages/Post.vue'
import auth from './middlewares/auth'

const routes = [
	{ name: 'login', path: '/login', component: Login },
	{ name: 'signup', path: '/signup', component: Signup },
	{ name: 'posts', path: '/', component: Posts, beforeEnter: auth },
	{ name: 'post', path: '/post', component: Post, beforeEnter: auth }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
