import axios from '../axios';

const AuthService = {
	signupUser(formData: any) {
		return axios.post('/auth/signup', formData);
	},
	verifyToken(formData: any) {
		return axios.post('/auth/verification', formData);
	},
	signinUser(formData: any) {
		return axios.post('/auth/signin', formData);
	},
	loggedIn() {
		return axios.get('/auth/loggedin');
	},
	logout() {
		return axios.get('/auth/logout');
	},
};

export default AuthService;
