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

interface IState {
	auth: AuthState;
}

const Welcome: FunctionComponent = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [toggleSignupModal, setToggleSignupModal] = useState<boolean>(false);
	const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false);
	const { isSuccess, isAuthenticated, isAuthenticating } = useSelector((state: IState) => state.auth);

	useEffect(() => {
		const getData = () => {
			if (isSuccess === true) {
				setToggleSignupModal(false);
				dispatch(
					createNotification({
						message: 'verification mail',
						type: 'success',
					}),
				);
			}
		};
		getData();
	}, [isSuccess, dispatch]);

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
		<div className={classes.Home}>
			<div className={classes.NotifyContent}>
				<Notification />
			</div>

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
							<Button btnTypes='JoinBtn' disabled={undefined} sizes={''} onClick={openSignupModel} type='button'>
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
