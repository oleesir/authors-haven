/* eslint-disable jsx-a11y/aria-role */
import React, { FunctionComponent, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { FiX } from 'react-icons/fi';
import { clearServerMessage } from '../../../features/authentication/auth';
import { loginUser } from '../../../features/authentication/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginInput, IState, HomeProps } from '../../../types/authTypes';
import classes from './LoginModal.module.css';

const LoginModal: FunctionComponent<HomeProps> = ({ closeModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const authenticated = useSelector((state: any) => state.auth.isAuthenticated);

	useEffect(() => {
		const getData = () => {
			if (authenticated) {
				history.push('/home');
			}
		};
		return getData();
	}, [history, authenticated]);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<LoginInput>({ mode: 'onBlur' });

	const [loading, setLoading] = useState<boolean>(false);
	const { errorMessage, isError, isSuccess } = useSelector((state: IState) => state.auth);

	useEffect(() => {
		const getData = () => {
			if (isSuccess === true) {
				setValue('email', '');
				setValue('password', '');
			}
		};
		getData();
	}, [isSuccess, setValue]);

	const submitForm = async (data: any) => {
		setLoading(true);
		if (data) {
			dispatch(loginUser(data));
		}
		setLoading(false);
	};

	const handleChange = (event: any) => {
		setValue(event?.target?.name, event?.target?.value);
		if (isError === true) {
			dispatch(clearServerMessage());
		}
	};

	return (
		<div className={classes.Container} data-testid='login-modal'>
			<div className={classes.LeftMessage}>
				<p className={classes.TopMessage} data-testid='share'>
					Share your stories
				</p>
				<p className={classes.MidMessage}>Welcome back</p>
				<p className={classes.BottomMessage}>
					Sign into your account to serve you more personerlized stories from creatives.
				</p>
			</div>
			<div className={classes.RightMessageContent}>
				<div className={classes.TopBtn}>
					{' '}
					<Button btnTypes='CloseBtn' sizes={''} onClick={closeModal} type='button'>
						<FiX size={'2em'} />
					</Button>
				</div>
				<div className={classes.RightMessage}>
					<p className={classes.MsgOne}>Select one to get started</p>
					<div className={classes.SocialContent}>
						<img aria-label='imgOne' src='/images/google.svg' alt='banner' className={classes.SocialItem} />
						<img aria-label='imgTwo' src='/images/twitter.svg' alt='banner' className={classes.SocialItem} />
						<img aria-label='imgThree' src='/images/facebook.svg' alt='banner' className={classes.SocialItem} />
					</div>
					<div className={classes.ErrorMessageContent}>
						{isError === true && <p className={classes.ErrorMessage}>{errorMessage}</p>}
					</div>
					<div className={classes.AuthForm}>
						<form onSubmit={handleSubmit(submitForm)}>
							<div className={classes.InputFieldContainer}>
								{' '}
								<input
									aria-label='email'
									data-testid='email'
									className={classes.InputField}
									type={'email'}
									{...register('email', {
										required: 'email is required',
										pattern: {
											value:
												/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: 'Please enter a valid email address',
										},
									})}
									onChange={handleChange}
									placeholder={'Email'}
								/>
								<div className={classes.InputFieldErrorContent}>
									{errors.email && (
										<span className={classes.InputFieldErrors} data-testid='email-error'>
											{errors.email?.message}
										</span>
									)}
								</div>
							</div>

							<div className={classes.InputFieldContainerPassword}>
								<input
									role='password'
									data-testid='password'
									className={classes.InputField}
									type={'password'}
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message: 'Password should not be less than 8 characters',
										},
									})}
									onChange={handleChange}
									placeholder={'Password'}
								/>
								{errors.password && (
									<span className={classes.InputFieldErrors} data-testid='password-error'>
										{errors.password?.message}
									</span>
								)}
							</div>
							<div className={classes.AuthBtnContent}>
								<Button
									btnTypes='SubmitModalBtn'
									dataTestId='login-modal-btn'
									disabled={loading}
									sizes={''}
									onClick={submitForm}
									type='submit'
								>
									Login
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
