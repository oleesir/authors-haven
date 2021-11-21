import React, { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: FunctionComponent<{
	component: FunctionComponent;
	path: string;
	exact: boolean;
}> = ({ path, exact, component }) => {
	return 'condition' ? <Route path={path} exact={exact} component={component} /> : <Redirect to='/' />;
};

export default PrivateRoute;
