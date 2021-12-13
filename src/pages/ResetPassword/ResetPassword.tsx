import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearServerMessage } from '../../features/authentication/auth';
import { ClipLoader } from 'react-spinners';
import { IState } from '../../types/authTypes';
import Notification from '../../components/Notifications/Notification';
import { createNotification } from '../../features/notification';
import { notificationValue } from '../../constants';
import classes from './ResetPassword.module.css';

const useQueryString = () => {
	const location = useLocation();
	return new URLSearchParams(location.search);
};

const ResetPassword: FunctionComponent = () => {
	const queryString = useQueryString();
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
	const [closeNotification, setCloseNotification] = useState<boolean>(false);
	const dispatch = useDispatch();
	const token = queryString.get('token');
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
						message: notificationValue.RESETPASSWORD,
						type: 'success',
					}),
				);
			}
		};
		getData();
	}, [isSuccess, dispatch]);

	const handleChangeNewPassword = (e: any) => {
		if (e.target.value.length > 0) {
			dispatch(clearServerMessage());
		}
		setNewPassword(e.target.value);
	};

	const handleChangeConfirmNewPassword = (e: any) => {
		if (e.target.value.length > 0) {
			dispatch(clearServerMessage());
		}

		setConfirmNewPassword(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (newPassword && confirmNewPassword) {
			dispatch(resetPassword({ password: newPassword, confirmPassword: confirmNewPassword, token: token }));
		}
		return;
	};

	return (
		<div className={classes.Container}>
			<div className={classes.NotificationPanel}>{closeNotification && <Notification />}</div>
			<div className={classes.Content}>
				<p className={classes.Title}>Reset password</p>
				<form onSubmit={handleSubmit}>
					<div className={classes.InputContent}>
						<div>
							<input
								type='password'
								value={newPassword}
								onChange={handleChangeNewPassword}
								className={classes.InputField}
								placeholder={'Enter password'}
							/>

							<div className={classes.ErrorPanel}>{isError === true ? <p>{errorMessage}</p> : ''}</div>
						</div>

						<div>
							<input
								type='password'
								value={confirmNewPassword}
								onChange={handleChangeConfirmNewPassword}
								className={classes.InputField}
								placeholder={'Confirm password'}
							/>
						</div>
					</div>

					<Button btnTypes={'ResetBtn'} type='submit' sizes={''} onClick={handleSubmit}>
						{/* {isLoading && <ClipLoader color='white' size={15} />} */}
						{/* {!isLoading && 'Reset'} */}
						Reset
					</Button>
				</form>

				{/* <Link to='/' className={classes.LinkContent}>
					Back
				</Link> */}
			</div>
		</div>
	);
};

export default ResetPassword;
