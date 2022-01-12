import React from 'react';
import classes from './Draft.module.css';

const Drafts = () => {
	return (
		<div className={classes.Container}>
			<p>Drafts</p>
			<div className={classes.AuthCard}>
				<img src='/images/pregnant.jpg' alt='author' className={classes.AuthCardImg} />
				<div className={classes.AuthCardInfo}>
					<div className={classes.AuthCardTop}>
						<h5 className={classes.AuthCardTag}>HEALTH</h5>
						<img className={classes.BookmarkChecked} src='/images/bookMarkTicked.svg' alt='ticked' />
					</div>
					<div className={classes.AuthCardMid}>
						<div>
							<p className={classes.Title}>The world is mine, check it out...</p>
						</div>

						<p className={classes.Body}>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt...
						</p>

						<p className={classes.Date}>12 june 2022</p>
					</div>
					<div className={classes.AuthCardBottom}>
						<img src='/images/avatar.png' alt='author' className={classes.BottomPic} />
						<div>
							<img src='/images/eyes.svg' alt='author' className={classes.BottomEyes} />
						</div>
					</div>
				</div>
			</div>

			<div className={classes.AuthCard}>
				<img src='/images/pregnant.jpg' alt='author' className={classes.AuthCardImg} />
				<div className={classes.AuthCardInfo}>
					<div className={classes.AuthCardTop}>
						<h5 className={classes.AuthCardTag}>HEALTH</h5>
						<img className={classes.BookmarkChecked} src='/images/bookMarkTicked.svg' alt='ticked' />
					</div>
					<div className={classes.AuthCardMid}>
						<div>
							<p className={classes.Title}>The world is mine, check it out...</p>
						</div>

						<p className={classes.Body}>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt...
						</p>

						<p className={classes.Date}>12 june 2022</p>
					</div>
					<div className={classes.AuthCardBottom}>
						<img src='/images/avatar.png' alt='author' className={classes.BottomPic} />
						<div>
							<img src='/images/eyes.svg' alt='author' className={classes.BottomEyes} />
						</div>
					</div>
				</div>
			</div>

			<div className={classes.AuthCard}>
				<img src='/images/pregnant.jpg' alt='author' className={classes.AuthCardImg} />
				<div className={classes.AuthCardInfo}>
					<div className={classes.AuthCardTop}>
						<h5 className={classes.AuthCardTag}>HEALTH</h5>
						<img className={classes.BookmarkChecked} src='/images/bookMarkTicked.svg' alt='ticked' />
					</div>
					<div className={classes.AuthCardMid}>
						<div>
							<p className={classes.Title}>The world is mine, check it out...</p>
						</div>

						<p className={classes.Body}>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt...
						</p>

						<p className={classes.Date}>12 june 2022</p>
					</div>
					<div className={classes.AuthCardBottom}>
						<img src='/images/avatar.png' alt='author' className={classes.BottomPic} />
						<div>
							<img src='/images/eyes.svg' alt='author' className={classes.BottomEyes} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Drafts;
