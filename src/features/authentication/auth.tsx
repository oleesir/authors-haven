import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserInfo, VerifyInfo, LoginInfo, EmailInfo, ResetPasswordInput } from '../../types/authTypes';
import AuthService from '../../services/auth.services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosErrorPayload } from '../../axios';

export const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isError: false,
	isSuccess: false,
	errorMessage: '',
	isVerified: false,
	isAuthenticating: false,
};

export const signupUser = createAsyncThunk('users/signup', async (formData: UserInfo, { rejectWithValue }) => {
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

export const forgotPassword = createAsyncThunk(
	'users/forgotpassword',
	async (formData: EmailInfo, { rejectWithValue }) => {
		try {
			const res = await AuthService.forgotPassword(formData);
			return res.data.data;
		} catch (err) {
			return rejectWithValue((err as AxiosError)?.response?.data);
		}
	},
);

export const resetPassword = createAsyncThunk(
	'users/resetpassword',
	async (formData: ResetPasswordInput, { rejectWithValue }) => {
		try {
			const res = await AuthService.resetPassword(formData);
			return res.data.data;
		} catch (err) {
			return rejectWithValue((err as AxiosError)?.response?.data);
		}
	},
);

export const loadUser = createAsyncThunk('users/loggedin', async (_, { rejectWithValue }) => {
	try {
		const res = await AuthService.loggedIn();
		return res.data.data;
	} catch (err) {
		return rejectWithValue((err as AxiosError)?.response?.data);
	}
});

export const logoutUser = createAsyncThunk('users/logout', async (_, { rejectWithValue }) => {
	try {
		const res = await AuthService.logout();
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
			state.isAuthenticating = false;
			return state;
		});

		builder.addCase(signupUser.pending, (state) => {
			state.isError = false;
			state.isAuthenticating = true;
			return state;
		});

		builder.addCase(signupUser.rejected, (state, action) => {
			state.isError = true;
			state.isAuthenticating = false;
			state.errorMessage = (action.payload as AxiosErrorPayload).error;

			return state;
		});

		builder.addCase(verifyUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isVerified = true;
			state.isError = false;
			state.isAuthenticating = false;

			return state;
		});

		builder.addCase(verifyUser.pending, (state) => {
			state.isAuthenticated = false;
			state.isVerified = false;
			state.isError = false;
			state.isAuthenticating = true;

			return state;
		});

		builder.addCase(verifyUser.rejected, (state, action) => {
			state.isAuthenticated = false;
			state.isError = true;
			state.isVerified = false;
			state.isAuthenticating = false;
			// @ts-ignore ignoring this for now
			state.errorMessage = action.payload.error;
			return state;
		});

		builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isError = false;
			state.isAuthenticating = false;
			state.isSuccess = true;
			return state;
		});

		builder.addCase(loginUser.pending, (state) => {
			state.isAuthenticated = false;
			state.isError = false;
			state.isAuthenticating = true;
			return state;
		});

		builder.addCase(loginUser.rejected, (state, action) => {
			state.isAuthenticated = false;
			state.isError = true;
			state.isAuthenticating = false;
			state.errorMessage = (action.payload as AxiosErrorPayload).error;
			return state;
		});

		builder.addCase(forgotPassword.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isSuccess = true;
			state.isError = false;
			state.isAuthenticating = false;
			return state;
		});

		builder.addCase(forgotPassword.pending, (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isAuthenticating = true;
			return state;
		});

		builder.addCase(forgotPassword.rejected, (state, action) => {
			state.isError = true;
			state.isAuthenticating = false;
			state.errorMessage = (action.payload as AxiosErrorPayload<{ email: string }>).error.email;

			return state;
		});

		builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isSuccess = true;
			state.isError = false;
			state.isAuthenticating = false;
			return state;
		});

		builder.addCase(resetPassword.pending, (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isAuthenticating = true;
			return state;
		});

		builder.addCase(resetPassword.rejected, (state, action) => {
			state.isError = true;
			state.isAuthenticating = false;
			state.errorMessage = (action.payload as AxiosErrorPayload<{ password: string }>).error.password;
			return state;
		});

		builder.addCase(loadUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
			state.isError = false;
			state.isAuthenticating = false;
			return state;
		});

		builder.addCase(loadUser.pending, (state) => {
			state.isAuthenticated = false;
			state.isError = false;
			state.isAuthenticating = true;
			return state;
		});

		builder.addCase(loadUser.rejected, (state, action) => {
			state.isAuthenticated = false;
			state.isError = true;
			state.isAuthenticating = false;
			// state.errorMessage = (action.payload as AxiosErrorPayload).error;

			return state;
		});

		builder.addCase(logoutUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = false;
			state.isError = false;
			state.isSuccess = false;
			state.isAuthenticating = false;

			return state;
		});

		builder.addCase(logoutUser.pending, (state) => {
			state.isAuthenticated = false;
			state.isError = false;
			state.isAuthenticating = true;

			return state;
		});

		builder.addCase(logoutUser.rejected, (state, action) => {
			state.isAuthenticated = false;
			state.isError = true;
			state.isAuthenticating = false;
			// state.errorMessage = (action.payload as AxiosErrorPayload).error;
			return state;
		});
	},
});

export const { clearServerMessage } = authSlice.actions;
export default authSlice.reducer;
