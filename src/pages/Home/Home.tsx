import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button/Button';
import { logoutUser } from '../../features/authentication/auth';

const Home: FunctionComponent = () => {
	const dispatch = useDispatch();

	const logout = () => {
		return dispatch(logoutUser());
	};

	return (
		<div data-testid='sweet-home'>
			<h1>HOME SWEET HOME</h1>
			<Button btnTypes='SubmitModalBtn' dataTestId='login-modal-btn' sizes={''} onClick={logout} type='button'>
				Logout
			</Button>
		</div>
	);
};

export default Home;
