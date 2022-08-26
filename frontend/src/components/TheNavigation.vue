<template>
	<nav class="navbar navbar-expand-lg bg-light">
		<div class="container-fluid">
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
				<div>
			<!-- <img src="./images/icon_logo.png" class="logo" /> -->
			</div>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item" v-if="isLogged">
						<router-link class="nav-link" to="/">Messages</router-link>
					</li>
					<li class="nav-item" v-if="!isLogged">
						<router-link class="nav-link" to="/login">Connexion</router-link>
					</li>
					<li class="nav-item" v-if="!isLogged">
						<router-link class="nav-link" to="/signup">S'inscrire</router-link>
					</li>
					<li class="nav-item" v-if="isLogged">
						<router-link class="nav-link" to="/" @click="onLogout()">
							Se déconnecter
						</router-link>
					</li>
				</ul>
				<img src="./images/icon_logo.png" class="logo" />
			</div>
		</div>
	</nav>
</template>
<script>
import router from "@/router"
import { mapActions, mapGetters } from "vuex"

export default {
	data() {
		return {
			email: '',
			password: '',
			error: ''
		}
	},
	computed: {
		...mapGetters(["isLogged"])
	},
	methods: {
		...mapActions(["logout"]),
		async onLogout() {
			try {
				await this.logout()
				return router.push('/login')
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>
