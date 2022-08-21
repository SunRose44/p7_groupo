<template>
	<div class="row">
		<div class="col-md-6 offset-md-3">
			<div>
				<div>
					<h3>Login</h3>
					<hr/>
				</div>
				<form @submit.prevent="onLogin()">
					<div class="error" v-if="error">{{ error }}</div>
					<div class="form-group">
						<label>Email</label>
						<input type="text" class="form-control" v-model="email"/>
					</div>
					<div class="form-group">
						<label> Mot de passe </label>
						<input type="password" class="form-control" v-model="password"/>
					</div>
					<div class="my-3">
						<button type="submit" class="btn btn-primary">Connexion</button>
					</div>
				</form>
			</div>
		</div>
	</div>
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
		async onLogin() {
			try {
				const response = await axios.post(
					'http://localhost:3000/api/auth/login',
					{
						email: this.email,
						password: this.password
					}
				)
				localStorage.setItem('jwt', response.data.token)
				localStorage.setItem('userID', response.data.userID)
				router.push('/posts')
			} catch (error) {
				console.log(error)
				this.error = "Email et/ou mot de passe incorrectes"
			}
		}
	}
}
</script>