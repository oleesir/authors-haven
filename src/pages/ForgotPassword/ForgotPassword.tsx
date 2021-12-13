import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearServerMessage } from '../../features/authentication/auth';
import classes from './ForgotPassword.module.css';
import { ClipLoader } from 'react-spinners';
import { IState } from '../../types/authTypes';
import Notification from '../../components/Notifications/Notification';
import { createNotification } from '../../features/notification';
import { notificationValue } from '../../constants';

const ForgotPassword: FunctionComponent = () => {
	const [email, setEmail] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [closeNotification, setCloseNotification] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { isSuccess, errorMessage, isError } = useSelector((state: IState) => state.auth);

	useEffect(() => {
		if (isSuccess === true) {
			const timer = setTimeout(() => {
				clearServerMessage();
				setCloseNotification(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isSuccess]);

	useEffect(() => {
		const getData = () => {
			if (isSuccess === false) {
				return setCloseNotification(false);
			}
			return setCloseNotification(true);
		};
		getData();
	}, [isSuccess]);

	useEffect(() => {
		const getData = () => {
			if (isSuccess === true) {
				dispatch(
					createNotification({
						message: notificationValue.FORGOTPASSWORD,
						type: 'success',
					}),
				);
			}
		};
		getData();
	}, [isSuccess, dispatch]);

	const handleChange = (e: any) => {
		if (e.target.value.length > 0) {
			dispatch(clearServerMessage());
		}
		setEmail(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (email) {
			setIsLoading(true);
			dispatch(forgotPassword({ email: email }));
			setEmail('');
			setIsLoading(false);
		}
		return;
	};

	return (
		<div className={classes.Container}>
			<div className={classes.NotificationPanel}>{closeNotification && <Notification />}</div>
			<div className={classes.Content}>
				<p className={classes.Title}>Enter your email address</p>
				<p className={classes.SubTitle}>We'll send you a one-time reset link</p>

				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={email}
						onChange={handleChange}
						className={classes.InputField}
						placeholder={'someone@example.com'}
					/>
					<div className={classes.ErrorPanel}>{isError === true ? <p>{errorMessage}</p> : ''}</div>
					<Button btnTypes={'ResetBtn'} type='submit' disabled={isLoading} sizes={''} onClick={handleSubmit}>
						{isLoading && <ClipLoader color='white' size={15} />}
						{!isLoading && 'Send'}
					</Button>
				</form>

				<Link to='/' className={classes.LinkContent}>
					Back
				</Link>
			</div>
		</div>
	);
};

export default ForgotPassword;
