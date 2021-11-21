import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const config: AxiosRequestConfig = {
	baseURL: `${process.env.REACT_APP_API_URL}`,
};

const client: AxiosInstance = axios.create(config);

client.defaults.headers.post['Content-Type'] = 'application/json';
client.defaults.withCredentials = true;
export default client;
