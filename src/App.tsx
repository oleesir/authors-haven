import React, { FunctionComponent } from 'react';
import Home from './pages/Home/Home';
import Welcome from './pages/Welcome/Welcome';
import PrivateRoute from './helpers/PrivateRoute';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import EmailVerification from './pages/EmailVerificationn/EmailVerification';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App: FunctionComponent = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route path='/' exact component={Welcome} />
					<Route path='/reset_password' component={ResetPassword} />
					<Route path='/forgot_password' component={ForgotPassword} />
					<Route path='/verification' component={EmailVerification} />
					<PrivateRoute path='/home' component={Home} exact />
				</Switch>
			</Router>
		</div>
	);
};
export default App;
