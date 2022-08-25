<template>
	<nav class="navbar navbar-expand-lg bg-light">
		<div class="container-fluid">
				<!-- <img src="./images/icon_logo.png" class="logo"/> -->
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item" v-if="isOnline">
						<router-link class="nav-link" to="/">Messages</router-link>
					</li>
					<li class="nav-item" v-if="!isOnline">
						<router-link class="nav-link" to="/login">Connexion</router-link>
					</li>
					<li class="nav-item" v-if="!isOnline" >
						<router-link class="nav-link" to="/signup">S'inscrire</router-link>
					</li>
					<li class="nav-item" v-if="isOnline">
						<router-link class="nav-link" to="/" @click="onLogout()">
						Se déconnecter </router-link>
					</li>
					<img src="./images/icon_logo.png" class="logo"/>

				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
import axios from 'axios'
import router from "@/router"

export default {
	data() {
		console.log("45",localStorage.getItem("userID"));
			const isOnline=  (null !== localStorage.getItem("userID"));
		return {
			email: '',
			password: '',
			error: '',
			isOnline: isOnline,
		}
	},
	methods: {
		async onLogout() {

			try {
				localStorage.removeItem('jwt')
				localStorage.removeItem('userID')
				localStorage.removeItem('roles')
				router.push('/login')
				window.location.reload();
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style>

</style>