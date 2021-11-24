import React, { MouseEventHandler } from 'react';

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

export type AuthState = {
	user: UserInfo | null;
	isAuthenticated: boolean;
	isError: boolean;
	isSuccess: boolean;
	message: string;
	isVerified: boolean;
	loggedIn: boolean;
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
	auth: {
		message: string;
		isError: boolean;
		isSuccess: boolean;
		user: null;
	};
};

export type HomeProps = {
	closeModal: MouseEventHandler<HTMLButtonElement> | undefined;
};