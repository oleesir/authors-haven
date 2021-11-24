import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserInfo } from '../../types/authTypes';
import { signupUser, loginUser, verifyUser, loggedIn } from './authThunks';

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isError: false,
	isSuccess: false,
	message: '',
	isVerified: false,
	loggedIn: false,
	isAuthenticating: false,
};

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
			return state;
		});

		builder.addCase(signupUser.pending, (state) => {
			state.isError = false;
			return state;
		});

		builder.addCase(signupUser.rejected, (state, action) => {
			state.isError = true;
			// @ts-ignore ignoring this for now
			state.message = action.payload.error;

			return state;
		});

		builder.addCase(verifyUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isVerified = true;
			state.isError = false;

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
			state.message = action.payload.error;

			return state;
		});

		builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.isVerified = true;
			state.isError = false;
			state.loggedIn = true;
			state.isAuthenticating = false;

			return state;
		});

		builder.addCase(loginUser.pending, (state) => {
			state.isAuthenticated = false;
			state.isVerified = false;
			state.isError = false;
			state.loggedIn = false;
			state.isAuthenticating = true;

			return state;
		});

		builder.addCase(loginUser.rejected, (state, action) => {
			state.isAuthenticated = false;
			state.isError = true;
			state.isVerified = false;
			state.loggedIn = false;
			state.isAuthenticating = false;

			// @ts-ignore ignoring this for now
			state.message = action.payload.error;

			return state;
		});

		builder.addCase(loggedIn.fulfilled, (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
			state.isVerified = !!action.payload;
			state.isError = false;
			state.loggedIn = !!action.payload;
			state.isAuthenticating = false;

			return state;
		});

		builder.addCase(loggedIn.pending, (state) => {
			state.isAuthenticated = false;
			state.isVerified = false;
			state.isError = false;
			state.loggedIn = false;
			state.isAuthenticating = true;
			return state;
		});

		builder.addCase(loggedIn.rejected, (state, action) => {
			state.isAuthenticated = false;
			state.isError = true;
			state.isVerified = false;
			state.loggedIn = false;
			state.isAuthenticating = false;

			// @ts-ignore ignoring this for now
			state.message = action.payload.error;

			return state;
		});
	},
});

export const { clearServerMessage } = authSlice.actions;
export default authSlice.reducer;
