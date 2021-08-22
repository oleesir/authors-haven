import React, { FunctionComponent } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Article from '../../components/Articles/Article/Article';
import Banner from '../../components/Banner/Banner';
import classes from './Home.module.css';

const Home: FunctionComponent = () => {
	return (
		<div className={classes.Home}>
			<Navbar />
			<Banner />
			<div className={classes.Explore}>
				<p className={classes.ExploreTop}>Explore Amazing Topics</p>
				<p className={classes.ExploreBottom}>
					Curated stories based on your prefrence
				</p>
			</div>
			<div className={classes.Articles}>
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				{/* <Article /> */}
			</div>
			<div className={classes.HomeFooter}>
				<p>© 2021 Olisa Emodi</p>
			</div>
		</div>
	);
};

export default Home;
