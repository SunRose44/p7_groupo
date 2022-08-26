<template>
	<section class="container section">
		<h3>Messages</h3>
		<router-link class="btn btn-primary" to="post">Créer un post</router-link>
		<div class="content-posts" v-for="(post, index) in sortedPosts" :key="index">
			<div>
				Utilisateur: {{ post.user.email }}
			</div>
			<div>
				Date: {{ getDate(post.creationDate) }}
			</div>
			<div class="text-post form-control">
				{{ post.content }}
			</div>
			<div>
			<img class="image" v-if="post.imageURL" :src="post.imageURL"/>
			</div>
			<div>
				Likes: {{ post.likes }}
			</div>
			<button class="btn btn-primary" v-if="isUserAllowed(post)" @click="deletePost(post)">Supprimer</button>
			<button class="btn btn-primary" v-if="isUserAllowed(post)" @click="updatePost(post)">Modifier</button>
			<button class="btn btn-primary" v-if="isUserNotLiked(post)" @click="likePost(post)">Like</button>
			<button class="btn btn-primary" v-if="isUserLiked(post)" @click="dislikePost(post)">Dislike</button>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import router from '@/router'
import { mapState } from "vuex"

export default {
	data() {
		return {
			posts: []
		}
	},
	computed: {
		...mapState(["token"]),
		sortedPosts() {
			return this.posts.sort(function (current, next) {
				return new Date(next.creationDate) - new Date(current.creationDate)
			})
		}
	},
	methods: {
		async readPosts() {
			try {
				const response = await axios.get(
					'http://localhost:3000/api/posts',
					{
						headers: {Authorization: `Bearer ${this.token}`}
					}
				)

				this.posts = response.data
			} catch (error) {
				console.log(error)
			}
		},
		getDate(date) {
			return moment(date).format('DD/MM/YYYY HH:mm')
		},
		async updatePost(post) {
			return router.push(`/post?postID=${post._id}`)
		},
		async deletePost(post) {
			
			await axios.delete(
				`http://localhost:3000/api/post/${post._id}`,
				{
					headers: {Authorization: `Bearer ${this.token}`}
				}
			)

			return this.readPosts()
		},
		async likePost(post) {
		
			await axios.put(
				`http://localhost:3000/api/post/${post._id}/like`,
				{ isLiked: true },
				{
					headers: { Authorization: `Bearer ${this.token}` }
				}
			)
			return this.readPosts()
		},
		async dislikePost(post) {
		
			await axios.put(
				`http://localhost:3000/api/post/${post._id}/like`,
				{ isLiked: false },
				{
					headers: { Authorization: `Bearer ${this.token}` }
				}
			)
			return this.readPosts()
		},
		isUserAllowed(post) {
			return post.user.userID === localStorage.getItem('userID')
				|| localStorage.getItem('roles').includes('admin')
		},
		isUserNotLiked(post) {
			return !post.userLikes.includes(localStorage.getItem('userID'))
		},
		isUserLiked(post) {
			return post.userLikes.includes(localStorage.getItem('userID'))
		}
	},
	created() {
		return this.readPosts()
	}
}
</script>

