import React, { FunctionComponent } from 'react';
import Welcome from './pages/Welcome/Welcome';
import Home from './pages/Home/Home';
import EmailVerification from './pages/EmailVerificationn/EmailVerification';
import PrivateRoute from './helpers/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App: FunctionComponent = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route path='/' exact component={Welcome} />
					<Route path='/verification' component={EmailVerification} />
					<PrivateRoute path='/home' component={Home} exact />
				</Switch>
			</Router>
		</div>
	);
};
export default App;
