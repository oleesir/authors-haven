/* eslint-disable jsx-a11y/aria-role */
import React, { FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { FiX } from 'react-icons/fi';
import { clearServerMessage } from '../../../features/authentication/auth';
import { signupUser } from '../../../features/authentication/auth';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP_STATUS } from '../../../constants';
import classes from './SignupModal.module.css';
import { HomeProps, IState, SignupInput } from '../../../types/authTypes';
import { ClipLoader } from 'react-spinners';

const SignupModal: FunctionComponent<HomeProps> = ({ closeModal }) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<SignupInput>({ mode: 'onBlur' });

	const { errorMessage, isError, isSuccess, loadingStatus } = useSelector((state: IState) => state.auth);

	useEffect(() => {
		const getData = () => {
			if (isSuccess === true) {
				setValue('firstName', '');
				setValue('lastName', '');
				setValue('email', '');
				setValue('password', '');
			}
		};
		getData();
	}, [isSuccess, setValue]);

	const submitForm = async (data: any) => {
		if (data) {
			dispatch(signupUser(data));
		}
	};

	const handleChange = (event: any) => {
		setValue(event?.target?.name, event?.target?.value);
		if (isError === true) {
			dispatch(clearServerMessage());
		}
	};

	return (
		<div className={classes.Container} data-testid='signup-modal'>
			<div className={classes.LeftMessage}>
				<p className={classes.TopMessage} data-testid='share'>
					Share your stories
				</p>
				<p className={classes.MidMessage}>Create your free Account</p>
				<p className={classes.BottomMessage}>
					We will need your details for setting up your account to serve you more personalized stories from creatives
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
								<input
									aria-label='firstName'
									id='firstName'
									className={classes.InputField}
									type='text'
									{...register('firstName', {
										required: 'First name is required',
										pattern: {
											value: /^[a-zA-Z_ ]*$/i,
											message: 'First name should contain only letters',
										},
									})}
									onChange={(event) => {
										handleChange(event);
									}}
									placeholder={'Firstname'}
								/>

								{errors.firstName && (
									<span data-testid='firstname-error' className={classes.InputFieldErrors}>
										{errors.firstName?.message}
									</span>
								)}
							</div>

							<div className={classes.InputFieldContainer}>
								<input
									aria-label='lastName'
									data-testid='lastname'
									className={classes.InputField}
									type='text'
									{...register('lastName', {
										required: 'Last name is required',
										pattern: {
											value: /^[a-zA-Z_ ]*$/i,
											message: 'Last name should contain only letters',
										},
									})}
									onChange={handleChange}
									placeholder={'Lastname'}
								/>
								{errors.lastName && (
									<span className={classes.InputFieldErrors} data-testid='lastname-error'>
										{errors.lastName?.message}
									</span>
								)}
							</div>

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
									dataTestId='signup-modal-btn'
									disabled={loadingStatus === HTTP_STATUS.PENDING}
									sizes={''}
									onClick={submitForm}
									type='submit'
								>
									{loadingStatus === HTTP_STATUS.PENDING ? <ClipLoader color='#fff' size={15} /> : 'Signup'}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupModal;
