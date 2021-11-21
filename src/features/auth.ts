import AuthService from '../services/auth.services';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export type UserInfo = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

type LoginIn = {
	email?: string | null;
	token: string | null;
};

export type AuthState = {
	user: UserInfo | null;
	isAuthenticated: boolean;
	isError: boolean;
	isSuccess: boolean;
	message: string;
	isVerified: boolean;
	loggedIn: boolean;
};

// type AuthReducers = {
// 	clearServerMessage: (state: AuthState) => AuthState;
// 	// clearIt: (state: AuthState, action: PayloadAction<string>) => void;
// };

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isError: false,
	isSuccess: false,
	message: '',
	isVerified: false,
	loggedIn: false,
};

export const signupUser = createAsyncThunk('users/signupuser', async (formData: UserInfo, { rejectWithValue }) => {
	try {
		const res = await AuthService.signupUser(formData);
		return res.data.data;
	} catch (err) {
		return rejectWithValue((err as AxiosError)?.response?.data);
	}
});

export const verifyUser = createAsyncThunk('users/verification', async (formData: LoginIn, { rejectWithValue }) => {
	try {
		const res = await AuthService.verifyToken(formData);
		return res.data.data;
	} catch (err) {
		return rejectWithValue((err as AxiosError)?.response?.data);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// standard reducer logic, with auto-generated action types per reducer
		clearServerMessage: (state) => {
			state.isError = false;
			state.isSuccess = false;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isError = false;
			state.isSuccess = true;
		});

		builder.addCase(signupUser.pending, (state) => {
			state.isError = false;
		});

		builder.addCase(signupUser.rejected, (state, action) => {
			state.isError = true;
			// @ts-ignore ignoring this for now
			state.message = action.payload.error;
		});

		builder.addCase(verifyUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isVerified = true;
			state.isError = false;
		});

		builder.addCase(verifyUser.pending, (state) => {
			state.isAuthenticated = false;
			state.isVerified = false;
			state.isError = false;
		});

		builder.addCase(verifyUser.rejected, (state, action) => {
			state.isAuthenticated = false;
			state.isError = true;
			state.isVerified = false;
			// @ts-ignore ignoring this for now
			state.message = action.payload.error;
		});
	},
});

export const { clearServerMessage } = authSlice.actions;
export default authSlice.reducer;
