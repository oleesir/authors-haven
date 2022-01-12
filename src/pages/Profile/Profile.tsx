import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import { faFacebookSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import UserArticles from '../../components/TabComponents/UserArticles/UserArticles';
import BookmarkedArticles from '../../components/TabComponents/BookmarkedArticles/BookmarkedArticles';
import Drafts from '../../components/TabComponents/Drafts/Drafts';
import { Link, Switch, Route } from 'react-router-dom';
import Button from '../../components/Button/Button';
import EditProfile from '../../components/TabComponents/EditProfile/EditProfile';
import TabLinks from '../../components/TabComponents/TabLinks/TabLinks';
import classes from './Profile.module.css';

const Profile = () => {
	const [profileTab, setProfileTab] = useState(false);

	const handleTab4 = () => {
		setProfileTab(true);
	};

	return (
		<>
			<Navbar />
			<div className={classes.Container}>
				<div className={classes.Content}>
					<div className={classes.Banner}>
						<div className={classes.TopBanner}></div>
						<img
							src='/images/georgi-kalaydzhiev-aWvlmtDGqkE-unsplash.jpg'
							alt='author'
							className={classes.ImageContent}
						/>
						<div className={classes.BottomBanner}>
							<div className={classes.BioContent}>
								<p className={classes.Name}>Jeff Jack Renon </p>
								{!profileTab && (
									<Button btnTypes={'FollowBtn'} sizes={''}>
										<Link to='/profile/edit_profile' onClick={handleTab4}>
											Edit
										</Link>
									</Button>
								)}
								<div className={classes.Bio}>
									<p className={classes.BioText}>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ab quidem voluptatum praesentium!
										Voluptas voluptatum dolore necessitatibus.
									</p>
								</div>
								<div className={classes.FindMe}>
									<div className={classes.Location}>
										<FontAwesomeIcon icon={faMapMarkerAlt} className={classes.Marker} />
										<p className={classes.LocationName}>Lagos</p>
									</div>
									<div className={classes.Social}>
										<FontAwesomeIcon icon={faFacebookSquare} className={classes.Facebook} />
										<FontAwesomeIcon icon={faTwitterSquare} className={classes.Twitter} />
										<FontAwesomeIcon icon={faLinkedin} className={classes.Linkedin} />
									</div>
								</div>
								{profileTab && <div className={classes.EmptyBannerNav}></div>}
								{!profileTab && <TabLinks />}
							</div>
						</div>
					</div>
					<div className={classes.TabView}>
						{profileTab && <EditProfile />}
						{!profileTab && (
							<Switch>
								<Route path='/profile' exact component={UserArticles} />
								<Route path='/profile/bookmarks' component={BookmarkedArticles} />
								<Route path='/profile/drafts' component={Drafts} />
							</Switch>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
