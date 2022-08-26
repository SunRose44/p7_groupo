export default function auth(to, from, next) {
	if (!localStorage.getItem('token')) {
		next({ name: 'login' })
	} else {
		next()
	}
}
