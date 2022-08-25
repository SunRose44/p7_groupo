<template >
	<section  class="container" style="width: 60%;">
        <h3>Messages</h3>
		<router-link  class="btn btn-primary" to="post">Créer un post</router-link>
		<div class="content-posts" v-for="(post, index) in sortedPosts" :key="index">
			<div>
				Utilisateur: {{ post.user.email }}
			</div>
			<div>
				Date: {{ getDate(post.creationDate) }}
			</div>
			<div class="text-post form-control" >
				{{ post.content}}
			</div>
			<img v-if="post.imageURL" :src="post.imageURL" />
			<div>
				Likes: {{ post.likes }}
			</div>
			<button class="btn btn-primary" v-if="isUserAllowed(post)" @click="deletePost(post)">Supprimer</button>
			<button  class="btn btn-primary" v-if="isUserAllowed(post)" @click="updatePost(post)">Modifier</button>
			<button  class="btn btn-primary" v-if="isUserNotLiked(post)" @click="likePost(post)">Like</button>
			<button  class="btn btn-primary" v-if="isUserLiked(post)" @click="dislikePost(post)">Dislike</button>
		</div>
	</section>
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
		async likePost(post) {
			const token = localStorage.getItem('jwt')
			await axios.put(
				`http://localhost:3000/api/post/${post._id}/like`,
				{ isLiked: true },
				{
					headers: { Authorization: `Bearer ${token}` }
				}
				)
			return this.readPosts()
		},
		async dislikePost(post) {
			const token = localStorage.getItem('jwt')
			await axios.put(
				`http://localhost:3000/api/post/${post._id}/like`,
				{ isLiked: false },
				{
					headers: { Authorization: `Bearer ${token}` }
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

.body-logo{
    
	background-image: none;
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

.content-posts{
    background-color: #FFD7D7;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px
}
.text-post{
    	
word-wrap:break-word;
margin-bottom: 4px;
}




</style>