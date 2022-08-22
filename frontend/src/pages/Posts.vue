<template>
	<div>
		<router-link to="post">Créer un post</router-link>
		<div v-for="(post, index) in sortedPosts" :key="index">
			<div>
				Author: {{ post.user.email }}
			</div>
			<div>
				Date: {{ getDate(post.creationDate) }}
			</div>
			<div>
				{{ post.content}}
			</div>
			<img v-if="post.imageURL" :src="post.imageURL" />
			<div>
				Likes: {{ post.likes }}
			</div>
			<div>
				Dislikes: {{ post.dislikes }}
			</div>
			<button v-if="isUserAllowed(post)" @click="deletePost(post)">Supprimer</button>
			<button v-if="isUserAllowed(post)" @click="updatePost(post)">Modifier</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import router from '@/router'

export default {
	data() {
		return {
			posts: []
		}
	},
	computed: {
		sortedPosts() {
			return this.posts.sort(function(current, next){
				return new Date(next.creationDate) - new Date(current.creationDate)
			})
		}
	},
	methods: {
		async readPosts() {
			try {
				const token = localStorage.getItem('jwt')
				const response = await axios.get(
					'http://localhost:3000/api/posts',
					{
						headers: { Authorization: `Bearer ${token}` }
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
			const token = localStorage.getItem('jwt')
			await axios.delete(
				`http://localhost:3000/api/post/${post._id}`,
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			)

			return this.readPosts()
		},
		isUserAllowed(post) {
			return post.user.userID === localStorage.getItem('userID')
		}
	},
	created() {
		return this.readPosts()
	}
}
</script>