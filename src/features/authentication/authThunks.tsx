import AuthService from '../../services/auth.services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { VerifyInfo, LoginInfo } from '../../types/authTypes';

export const signupUser = createAsyncThunk('users/signupuser', async (formData: LoginInfo, { rejectWithValue }) => {
	try {
		const res = await AuthService.signupUser(formData);
		return res.data.data;
	} catch (err) {
		return rejectWithValue((err as AxiosError)?.response?.data);
	}
});

export const verifyUser = createAsyncThunk('users/verification', async (formData: VerifyInfo, { rejectWithValue }) => {
	try {
		const res = await AuthService.verifyToken(formData);
		return res.data.data;
	} catch (err) {
		return rejectWithValue((err as AxiosError)?.response?.data);
	}
});

export const loginUser = createAsyncThunk('users/signin', async (formData: LoginInfo, { rejectWithValue }) => {
	try {
		const res = await AuthService.signinUser(formData);
		return res.data.data;
	} catch (err) {
		return rejectWithValue((err as AxiosError)?.response?.data);
	}
});

export const loggedIn = createAsyncThunk('users/loggedin', async () => {
	try {
		const res = await AuthService.loggedIn();

		return res.data.data;
	} catch (err) {
		return err;
		// return rejectWithValue((err as AxiosError)?.response?.data);
	}
});
