export default function auth(to, from, next) {
	if (!localStorage.getItem('jwt')) {
		next({ name: 'login' })
	} else {
		next()
	}
}