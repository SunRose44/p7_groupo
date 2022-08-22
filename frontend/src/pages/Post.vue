<template>
	<form @submit.prevent="createOrUpdatePost()">
		<div class="form-group">
			<label>Content</label>
			<textarea v-model="content"/>
		</div>
		<div class="form-group">
			<label>Image</label>
			<input type="file" ref="image" @change="uploadImage"/>
		</div>
		<img v-if="imageURL" :src="imageURL">
		<button type="submit" class="btn btn-primary">{{ postID ? "Modifier" : "Créer" }}</button>
	</form>
	<button class="btn btn-primary" @click="deleteImage()">Supprimer l'image</button>
</template>

<script>
import axios from "axios"
import router from "@/router"

export default {
	data() {
		return {
			content: '',
			imageURL: '',
			postID: ''
		}
	},
	methods: {
		uploadImage() {
			this.imageURL = URL.createObjectURL(this.$refs.image.files[0])
		},
		async createOrUpdatePost() {
			const formData = new FormData()

			formData.append('content', this.content)
			formData.append('imageURL', this.imageURL)
			formData.append('image', this.$refs.image.files[0])

			const token = localStorage.getItem('jwt')
			const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }

			this.postID ?
				await axios.put(
					`http://localhost:3000/api/post/${this.postID}`,
					formData,
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				: await axios.post('http://localhost:3000/api/post', formData, { headers })

			return router.push('/')
		},
		deleteImage() {
			this.imageURL = ''
			this.$refs.image.value = null
		}
	},
	async created() {
		this.postID = this.$route.query.postID

		const token = localStorage.getItem('jwt')
		const response = await axios.get(
			`http://localhost:3000/api/post/${this.postID}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		)

		this.content = response.data.content
		this.imageURL = response.data.imageURL
	}
}
</script>