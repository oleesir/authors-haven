import React, {
	FunctionComponent,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';
import { FaBookReader, FaBars } from 'react-icons/fa';
import SearchBar from '../SearchBar/SearchBar';
import classes from './Navbar.module.css';

type HomeProps = {
	setToggleModal: Dispatch<SetStateAction<boolean>>;
};

const Navbar: FunctionComponent<HomeProps> = ({ setToggleModal }) => {
	const [openBurger, setOpenBurger] = useState<boolean>(false);

	const openAuthModel = () => {
		setToggleModal((toggle) => !toggle);
		setOpenBurger(false);
	};

	const handleToggle = () => {
		setOpenBurger(!openBurger);
	};

	return (
		<nav className={classes.Navbar}>
			<FaBookReader size={30} color={'orange'} />
			<SearchBar />
			{!openBurger ? (
				<div className={classes.AuthLink}>
					<button
						className={classes.AuthBtn}
						data-testid='open-signup-modal-btn'
						onClick={openAuthModel}
					>
						Signup
					</button>
					<button className={classes.AuthBtn}>
						<p>Login</p>
					</button>
				</div>
			) : (
				<div className={`${classes.AuthLink} ${classes.Active}`}>
					<button className={classes.AuthBtn} onClick={openAuthModel}>
						Signup
					</button>
					<button className={classes.AuthBtn}>
						<p>Login</p>
					</button>
				</div>
			)}

			<button className={classes.Burger} onClick={handleToggle}>
				<FaBars size={20} color={'orange'} />
			</button>
		</nav>
	);
};
export default Navbar;
