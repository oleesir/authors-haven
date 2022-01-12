import { MouseEventHandler } from 'react';

export type UserInfo = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type VerifyInfo = {
	email: string | null;
	token: string | null;
};

export type LoginInfo = {
	email: string | null;
	password: string | null;
};

export type EmailInfo = {
	email: string | null;
};

export type ActiveParam = {
	active?: string;
};

export type AuthState = {
	user: UserInfo | null;
	loadingStatus: string;
	isAuthenticated: boolean;
	isError: boolean;
	isSuccess: boolean;
	errorMessage?: string;
	isVerified: boolean;
	isAuthenticating: boolean;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type SignupInput = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type IState = {
	auth: AuthState;
};

export type HomeProps = {
	closeModal: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type ResetPasswordInput = {
	password: string;
	confirmPassword: string;
	token: string | null;
};
