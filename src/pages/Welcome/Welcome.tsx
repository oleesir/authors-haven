import React, { FunctionComponent, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Articles from '../../components/Articles/Articles';
import Banner from '../../components/Banner/Banner';
import SignupModal from '../../components/Modals/SignupModal/SignupModal';
import LoginModal from '../../components/Modals/LoginModal/LoginModal';
import GenericModal from '../../components/Modals/GenericModal/GenericModal';
import Notification from '../../components/Notifications/Notification';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { createNotification } from '../../features/notification';
import { useHistory } from 'react-router-dom';
import { AuthState } from '../../types/authTypes';
import classes from './Welcome.module.css';
import { notificationValue } from '../../constants';
import { clearServerMessage } from '../../features/authentication/auth';

interface IState {
	auth: AuthState;
}

const Welcome: FunctionComponent = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [toggleSignupModal, setToggleSignupModal] = useState<boolean>(false);
	const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false);
	const [closeNotification, setCloseNotification] = useState<boolean>(false);
	const { isSuccess, isAuthenticated, isAuthenticating } = useSelector((state: IState) => state.auth);

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
				setCloseNotification(false);
			}
		};
		getData();
	}, [isSuccess]);

	useEffect(() => {
		const getData = () => {
			if (isSuccess === true) {
				dispatch(
					createNotification({
						message: notificationValue.VERIFYEMAIL,
						type: 'success',
					}),
				);
				setToggleSignupModal(false);

				setCloseNotification(true);
			}
		};
		getData();
	}, [isSuccess, dispatch]);

	console.log('🧨', isSuccess);

	const openSignupModel = () => {
		setToggleSignupModal(true);
	};
	const closeSignupModal = () => {
		setToggleSignupModal(false);
	};
	const closeLoginModal = () => {
		setToggleLoginModal(false);
	};

	if (isAuthenticating) {
		return <p>'Loading'</p>;
	}

	if (isAuthenticated) {
		history.push('/home');
	}

	return (
		<div className={classes.Home} data-testid='welcome'>
			<div className={classes.NotifyContent}>{closeNotification && <Notification />}</div>

			<Navbar setToggleSignupModal={setToggleSignupModal} setToggleLoginModal={setToggleLoginModal} />
			<Banner />

			<div className={classes.Explore}>
				<p className={classes.ExploreTop}>Explore Amazing Topics</p>
				<p className={classes.ExploreBottom}>Curated stories based on your prefrence</p>
			</div>
			<Articles />
			<div className={classes.SecondBannerContainer}>
				<div className={classes.SecondBanner}>
					<div className={classes.SecondBannerLeft}>
						<p className={classes.Discover}>Discover</p>
						<p className={classes.Curated}>Curated stories based on your selection</p>
						<p className={classes.Tailored}>Top stories tailored to meet your needs.</p>
						<div className={classes.BtnContent}>
							<Button btnTypes='JoinBtn' sizes={''} onClick={openSignupModel} type='button'>
								Join 1KbIdeas
							</Button>
						</div>
					</div>
					<div className={classes.SecondBannerMobileRight}>
						<div className={classes.CircleFour}></div>
						<div className={classes.QuoteMobile}>
							<div className={classes.QuoteContentMobile}>
								<p className={classes.QuoteMsgMobile}>"This is the best place to live on the internet"</p>
								<p className={classes.QuoteNameMobile}>Olisa Emodi</p>
							</div>
						</div>
					</div>
					<div className={classes.SecondBannerRight}>
						<div className={classes.CircleOne}></div>
						<div className={classes.CircleTwo}></div>
						<div className={classes.CircleThree}></div>
						<div className={classes.Quote}>
							<div className={classes.QuoteContent}>
								<p className={classes.QuoteMsg}>"This is the best place to live on the internet"</p>
								<p className={classes.QuoteName}>Olisa Emodi</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Articles />
			<div className={classes.HomeFooter}>
				<p>© 2021 Olisa Emodi</p>
			</div>
			{toggleSignupModal && (
				<GenericModal>
					<SignupModal closeModal={closeSignupModal} />
				</GenericModal>
			)}

			{toggleLoginModal && (
				<GenericModal>
					<LoginModal closeModal={closeLoginModal} />
				</GenericModal>
			)}
		</div>
	);
};

export default Welcome;
