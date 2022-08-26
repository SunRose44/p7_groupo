<template>
	<div class="row">
		<div class="col-md-6 offset-md-3">
			<div>
				<div>
					<h3>S'inscrire </h3>
					<hr/>
				</div>
				<form @submit.prevent="onSignup()">
					<div class="form-group">
						<label> Email </label>
						<input type="text" class="form-control" v-model.trim="email"/>
						<div class="error" v-if="errors.email">{{ errors.email }}</div>
					</div>
					<div class="form-group">
						<label> Mot de passe </label>
						<input type="password" class="form-control" v-model.trim="password"/>
						<div class="error" v-if="errors.password">{{ errors.password }}</div>
					</div>
					<div class="my-3">
						<button type="submit" class="btn btn-primary">Inscription</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import router from "@/router"
import { mapActions } from "vuex"

export default {
	data() {
		return {
			email: '',
			password: '',
			errors: []
		}
	},
	methods: {
		...mapActions(["signup"]),
		checkEmail(email) {
			return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)

		},
		minLength(name, minLength) {
			return name.length >= minLength
		},
		checkValidations() {
			let errors = []

			if (!this.checkEmail(this.email)) {
				errors['email'] = 'Email Invalide'
			}

			if (!this.minLength(this.password, 6)) {
				errors['password'] = 'Le mot de passe doit contenir au moins 6 caractères'
			}

			return errors
		},
		async onSignup() {
			try {
				this.errors = this.checkValidations()
				if ('email' in this.errors || 'password' in this.errors) {
					return false
				}

				await this.signup(
					{
						email: this.email,
						password: this.password
					}
				)
				return router.push('/')
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>


