import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { tabLink } from '../constant';
import classes from './TabLinks.module.css';

const TabLinks = () => {
	const [activeTab, setActiveTab] = useState(tabLink.PUBLISHED_TAB);

	const handleTab1 = () => {
		setActiveTab(tabLink.PUBLISHED_TAB);
	};

	const handleTab2 = () => {
		setActiveTab(tabLink.BOOKMARKS_TAB);
	};

	const handleTab3 = () => {
		setActiveTab(tabLink.DRAFTS_TAB);
	};

	return (
		<div className={classes.BannerNav}>
			<ul>
				<li className={activeTab === tabLink.PUBLISHED_TAB ? classes.ActiveLink : ''}>
					<Link to='/profile' onClick={handleTab1}>
						Published
					</Link>
				</li>
				<li className={activeTab === tabLink.BOOKMARKS_TAB ? classes.ActiveLink : ''}>
					<Link to='/profile/bookmarks' onClick={handleTab2}>
						Bookmarks
					</Link>
				</li>

				<li className={activeTab === tabLink.DRAFTS_TAB ? classes.ActiveLink : ''}>
					<Link to='/profile/drafts' onClick={handleTab3}>
						Drafts
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default TabLinks;
