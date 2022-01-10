import React, { FunctionComponent, useState, Dispatch, SetStateAction } from 'react';
import { FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import classes from './Navbar.module.css';
import { logoutUser } from '../../features/authentication/auth';
import { IState } from '../../types/authTypes';
import { NavLink } from 'react-router-dom';

type HomeProps = {
	setToggleSignupModal?: Dispatch<SetStateAction<boolean>>;
	setToggleLoginModal?: Dispatch<SetStateAction<boolean>>;
};

const Navbar: FunctionComponent<HomeProps> = ({ setToggleSignupModal, setToggleLoginModal }) => {
	const [openBurger, setOpenBurger] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { isAuthenticated } = useSelector((state: IState) => state.auth);
	const dispatch = useDispatch();

	const openSignupModal = () => {
		setToggleSignupModal?.((toggle) => !toggle);
		setOpenBurger(false);
	};

	const openLoginModal = () => {
		setToggleLoginModal?.((toggle) => !toggle);
		setOpenBurger(false);
	};

	const handleToggle = () => {
		setOpenBurger(!openBurger);
	};

	const logout = () => {
		dispatch(logoutUser());
	};

	const togglePanel = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<nav className={classes.Navbar}>
			{isAuthenticated && (
				<>
					<div className={classes.Logo}>
						<p>
							1kb<span>Ideas</span>
						</p>
					</div>

					{!openBurger ? (
						<div className={classes.DropDown}>
							<Button
								btnTypes='ImgBtn'
								sizes={''}
								type='button'
								dataTestId='open-login-modal-btn'
								onClick={togglePanel}
							>
								<img src='/images/avatar.png' alt='author' className={classes.TheImage} />
							</Button>
							{isOpen && (
								<ul>
									<li>
										<NavLink exact to='/home' activeClassName={classes.ActiveLink}>
											Home
										</NavLink>
									</li>
									<li>
										<NavLink to='/profile' activeClassName={classes.ActiveLink}>
											Profile
										</NavLink>
									</li>

									<li onClick={logout}>Logout</li>
								</ul>
							)}
						</div>
					) : (
						<div className={`${classes.AuthLink} ${classes.Active}`}>
							<Button btnTypes='AuthBtn' sizes={''} type='button' onClick={openSignupModal}>
								Signup
							</Button>
							<Button btnTypes='AuthBtn' sizes={''} type='button' onClick={openLoginModal}>
								Login
							</Button>
						</div>
					)}

					<button className={classes.Burger} onClick={handleToggle}>
						<FaBars size={20} color={'orange'} />
					</button>
				</>
			)}
			{!isAuthenticated && (
				<>
					{' '}
					<div className={classes.Logo}>
						<p>
							1kb<span>Ideas</span>
						</p>
					</div>
					<SearchBar />
					{!openBurger ? (
						<div className={classes.AuthLink}>
							<Button
								btnTypes='AuthBtn'
								sizes={''}
								type='button'
								dataTestId='open-signup-modal-btn'
								onClick={() => {
									openSignupModal();
								}}
							>
								Signup
							</Button>
							<Button
								btnTypes='AuthBtn'
								sizes={''}
								type='button'
								dataTestId='open-login-modal-btn'
								onClick={() => {
									openLoginModal();
								}}
							>
								Login
							</Button>
						</div>
					) : (
						<div className={`${classes.AuthLink} ${classes.Active}`}>
							<Button btnTypes='AuthBtn' sizes={''} type='button' onClick={openSignupModal}>
								Signup
							</Button>
							<Button btnTypes='AuthBtn' sizes={''} type='button' onClick={openLoginModal}>
								Login
							</Button>
						</div>
					)}
					<button className={classes.Burger} onClick={handleToggle}>
						<FaBars size={20} color={'orange'} />
					</button>
				</>
			)}
		</nav>
	);
};
export default Navbar;
