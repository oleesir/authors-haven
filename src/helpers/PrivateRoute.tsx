import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: FunctionComponent<{
	component: FunctionComponent;
	path: string;
	exact: boolean;
}> = ({ path, exact, component }) => {
	const { isAuthenticated } = useSelector((state: any) => state.auth);

	// if (isAuthenticating) {
	// 	return <p>'Loading'</p>;
	// }

	if (!isAuthenticated) {
		return <Redirect to='/' />;
	}

	return <Route path={path} exact={exact} component={component} />;
};

export default PrivateRoute;
