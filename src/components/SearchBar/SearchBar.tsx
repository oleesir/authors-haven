import React, { FunctionComponent } from 'react';
import classes from './SearchBar.module.css';

const SearchBar: FunctionComponent = () => {
	return (
		<>
			<input className={classes.SearchBar} />
		</>
	);
};

export default SearchBar;
