import axios from '../axios';

const AuthService = {
	signupUser(formData: any) {
		return axios.post('/auth/signup', formData);
	},
	verifyToken(formData: any) {
		return axios.post('/auth/verification', formData, {
			withCredentials: true,
		});
	},
	loggedIn() {
		return axios.get('/auth/loggedin', {
			withCredentials: true,
		});
	},
};

export default AuthService;
