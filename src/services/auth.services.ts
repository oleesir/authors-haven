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
	forgotPassword(formData: any) {
		return axios.post('/auth/forgot_password', formData);
	},
	resetPassword(formData: any) {
		return axios.post('/auth/reset_password', formData);
	},
	loggedIn() {
		return axios.get('/auth/loggedin');
	},

	logout() {
		return axios.get('/auth/logout');
	},
};

export default AuthService;
