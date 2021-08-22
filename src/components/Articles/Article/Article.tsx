import React, { FunctionComponent } from 'react';
import classes from './Article.module.css';
const Article: FunctionComponent = () => {
	return (
		<div className={classes.Container}>
			<img src='/images/gym.png' alt='pic' className={classes.CardImg} />
			<div className={classes.Content}>
				<div className={classes.Tag}>
					<p className={classes.TagLeft}>Productivity</p>
					<img src='/images/bookMarkTicked.svg' alt='ticked' />
				</div>
				<div className={classes.Title}>
					<p>Productivity in the workplace</p>
				</div>
				<div className={classes.Info}>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
						mollitia, molestiae quas vel sint commodi repudiandae consequuntur
						voluptatum laborum numquam blanditiis harum quisquam eius sed odit
						fugiat iusto fuga praesentium optio, eaque rerum! Provident iure...
					</p>
				</div>
				<div className={classes.Bottom}>
					<img
						src='/images/avatar.png'
						alt='author'
						className={classes.BottomPic}
					/>
					<div>
						<img
							src='/images/eyes.svg'
							alt='author'
							className={classes.BottomEyes}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Article;
