import React from 'react';
import Article from './Article/Article';
import classes from './Articles.module.css';

const Articles = () => {
	return (
		<div className={classes.Container}>
			<div className={classes.ArticleContent}>
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
				<Article />
			</div>
		</div>
	);
};

export default Articles;
