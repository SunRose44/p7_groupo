<template>
<section class="container" style="width: 60%;">
	<h4>Saississez votre commentaire</h4>
	<form @submit.prevent="createOrUpdatePost()">
		<div>
			<label>Content</label>
			<textarea class="form-control" v-model="content"/>
		</div>
		<div class="form-group">
			<label>Image</label>
			<input class="form-control"  type="file" ref="image" @change="uploadImage"/>
		</div>
		<img v-if="imageURL" :src="imageURL">
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





<style >
.navbar-nav{
    width: 100%;
}

@media(min-width:568px){
    .end{
        margin-left: auto;
    }
}

@media(max-width:768px){
    #post{
        width: 100%;
    }
}
#clicked{
    padding-top: 1px;
    padding-bottom: 1px;
    text-align: center;
    width: 100%;
    background-color: #ecb21f;
    border-color: #a88734 #9c7e31 #846a29;
    color: rgb(209, 38, 38);
    border-width: 1px;
    border-style: solid;
    border-radius: 13px;
}

#profile{
    background-color: unset;

}

#post{
    margin: 10px;
    padding: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
    text-align: center;
    background-color:  #f6724a;
    border-color:  #f6724a;
    color: rgb(0, 0, 0);
    border-width: 1px;
    border-style: solid;
    border-radius: 13px;
    width: 50%;
}

body{
    background-color: #4E5166;
}

#nav-items li a,#profile{
    text-decoration: none;
    color: rgb(224, 219, 219);
    background-color: rgb(225, 63, 63);
}


.comments{
    margin-top: 5%;
    margin-left: 20px;
}

.darker{
    border: 1px solid grey;
    background-color: rgb(227, 3, 3);
    float: right;
    border-radius: 5px;
    padding-left: 40px;
    padding-right: 30px;
    padding-top: 10px;
}

.comment{
    border: 1px solid rgba(16, 46, 46, 1);
    background-color: rgba(31, 175, 175, 0.973);
    float: left;
    border-radius: 5px;
    padding-left: 40px;
    padding-right: 30px;
    padding-top: 10px;

}
.comment h4,.comment span,.darker h4,.darker span{
    display: inline;
}

.comment p,.comment span,.darker p,.darker span{
    color: rgb(184, 183, 183);
}

h1,h4{
    color: #FD2D01;
    font-weight: bold;
}
label{
    color:  #FD2D01;
}

#align-form{
    margin-top: 20px;
}
.form-group p a{
    color: white;
}

#checkbx{
    background-color: black;
}

#darker img{
    margin-right: 15px;
    position: static;
}

.form-group input,.form-group textarea{
    background-color: rgb(255, 255, 255);
    border: 1px solid rgba(16, 46, 46, 1);
    border-radius: 12px;
}

form{
    border: 1px solid rgba(16, 46, 46, 1);
    background-color:  #FFD7D7;
    border-radius: 5px;
    padding: 20px;
 }
/* body{
	background-image: none;
} */

.btn-primary{
	margin-right: 10px;
	margin-top:10px;
	margin-bottom: 10px;
    
}
.btn:hover{
    background-color: olivedrabs;
}


</style>
