import axios, { AxiosRequestConfig, AxiosInstance, AxiosError as GenericAxiosError } from 'axios';

const config: AxiosRequestConfig = {
	baseURL: `${process.env.REACT_APP_API_URL}`,
};

const client: AxiosInstance = axios.create(config);

client.defaults.headers.post['Content-Type'] = 'application/json';
client.defaults.withCredentials = true;
export default client;
export type AxiosErrorPayload<T = string> = { status: 'failure'; error: T };
export type AxiosError<T = string> = GenericAxiosError<AxiosErrorPayload<T>>;
