<template>
	<TheNavigation/>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div>
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import TheNavigation from './components/TheNavigation.vue'
import { mapMutations } from 'vuex'

export default {
	components: { TheNavigation },
	name: 'App',
	component: {
		TheNavigation
	},
	mounted() {
		this.initialiseStore()
	},
	methods: {
		...mapMutations(["initialiseStore"])
	}
}
</script>
