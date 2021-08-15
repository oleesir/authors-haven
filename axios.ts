import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const config: AxiosRequestConfig = {
	baseURL: `${process.env.PUBLIC_URL}`,
};

const client: AxiosInstance = axios.create(config);

client.defaults.headers.post['Content-Type'] = 'application/json';

export default client;
