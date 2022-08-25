<template>
<section class="container" style="width: 60%;">
	<h4>Saississez votre messages</h4>
	<form @submit.prevent="createOrUpdatePost()">
		<div>
			<label>Content</label>
			<textarea class="form-control" v-model="content"/>
		</div>
		<div class="form-group">
			<label>Image</label>
			<input class="form-control"  type="file" ref="image" @change="uploadImage"/>
		</div>
		<img style="max-widht:200px" v-if="imageURL" :src="imageURL">
		<button type="submit" class="btn btn-primary">{{ postID ? "Modifier" : "Créer" }}</button>
		<button type="button" class="btn btn-primary" @click="deleteImage()">Supprimer l'image</button>
	</form>

</section>
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
      if (this.imageURL) {
        formData.append('imageURL', this.imageURL)
      }
			if (this.$refs.image.files[0]) {
        formData.append('image', this.$refs.image.files[0])
      }

			const token = localStorage.getItem('jwt')
			const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }

			this.postID ?
				await axios.put(`http://localhost:3000/api/post/${this.postID}`, formData, { headers })
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

		if (this.postID) {
			const token = localStorage.getItem('jwt')
			const response = await axios.get(
				`http://localhost:3000/api/post/${this.postID}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			this.content = response.data.content
			this.imageURL = response.data.imageURL
		}
	}
}
</script>


