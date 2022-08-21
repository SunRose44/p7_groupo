<template>
	<nav class="navbar navbar-expand-lg bg-light">
		<div class="container-fluid">
			<!-- <a class="navbar-brand" href="#">Navbar</a> -->
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link class="nav-link" to="/">Accueil</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/login">Connexion</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/signup">S'inscrire</router-link>
					</li>
					<li class="nav-item" @click="onLogout()">
						Se déconnecter
					</li>
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
		return {
			email: '',
			password: '',
			error: ''
		}
	},
	methods: {
		async onLogout() {
			try {
				localStorage.removeItem('jwt')
				localStorage.removeItem('userID')
				router.push('/login')
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>