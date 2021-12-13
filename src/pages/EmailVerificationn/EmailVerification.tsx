import React, { FunctionComponent, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { verifyUser } from '../../features/authentication/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import classes from './EmailVerification.module.css';

const useQueryString = () => {
	const location = useLocation();
	return new URLSearchParams(location.search);
};

const EmailVerification: FunctionComponent = () => {
	const queryString = useQueryString();
	const email = queryString.get('email');
	const token = queryString.get('token');
	const history = useHistory();
	const dispatch = useDispatch();
	const authenticated = useSelector((state: any) => state.auth.isAuthenticated);

	useEffect(() => {
		const getData = () => {
			if (!authenticated) {
				dispatch(verifyUser({ email, token }));
				history.push('/home');
			} else {
				history.push('/home');
			}
		};
		return getData();
	}, [email, token, dispatch, authenticated, history]);

	return (
		<div className={classes.Container}>
			<div className={classes.Content}>
				<BeatLoader color='#fd8234' size={50} margin={5} />
				<p>Verifying...</p>
			</div>
		</div>
	);
};

export default EmailVerification;
