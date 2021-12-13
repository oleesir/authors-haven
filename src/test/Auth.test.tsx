import {
	screen,
	fireEvent,
	render as rtlRender,
	waitFor,
	act,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupModal from '../components/Modals/SignupModal/SignupModal';
import LoginModal from '../components/Modals/LoginModal/LoginModal';
import { Provider } from 'react-redux';
import { store } from '../store';
import { createMemoryHistory } from 'history';
import Welcome from '../pages/Welcome/Welcome';
import { BrowserRouter, Router } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import authSlice, {
	initialState,
	signupUser,
	loginUser,
	verifyUser,
	clearServerMessage,
	loadUser,
	logoutUser,
	forgotPassword,
} from '../features/authentication/auth';
import axios from '../axios';

const render = (component: {} | null | undefined) =>
	rtlRender(
		<BrowserRouter>
			<Provider store={store}>{component}</Provider>
		</BrowserRouter>,
	);

//jest.mock(...) is used to automatically mock the axios module.jest.mock('axios');
jest.mock('../axios', () => ({
	post: jest.fn(),
	get: jest.fn(),
}));

// Create an object of type of mocked Axios.
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Authentication', () => {
	describe('Signup', () => {
		test('Open modal', async () => {
			const { getByText } = render(<Welcome />);
			const button = getByText('Signup');
			expect(button.textContent).toBe('Signup');
			fireEvent.click(button);
			expect(getByText('Create your free Account')).toBeTruthy();
		});

		test('Should render the basic field', async () => {
			render(
				<SignupModal
					closeModal={function (event: React.MouseEvent<HTMLButtonElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>,
			);
			expect(
				screen.getByRole('img', {
					name: 'imgOne',
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('img', {
					name: 'imgTwo',
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('img', {
					name: 'imgThree',
				}),
			).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'firstName' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'lastName' })).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
			expect(screen.getByRole('password')).toHaveAttribute('type', 'password');
		});

		test('should validate empty form fields', async () => {
			render(
				<SignupModal
					closeModal={function (event: React.MouseEvent<HTMLButtonElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>,
			);

			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () =>
				expect(screen.getByTestId('firstname-error')).toHaveTextContent('First name is required'),
			);

			await waitFor(async () =>
				expect(screen.getByTestId('lastname-error')).toHaveTextContent('Last name is required'),
			);

			await waitFor(async () => expect(screen.getByTestId('email-error')).toHaveTextContent('email is required'));

			await waitFor(async () => expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required'));

			expect(axios.post).not.toHaveBeenCalled();
		});

		test('should validate invalid fields', async () => {
			render(
				<SignupModal
					closeModal={function (event: React.MouseEvent<HTMLButtonElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>,
			);

			fireEvent.change(screen.getByRole('textbox', { name: 'firstName' }), {
				target: { value: 'Ja1e-ck' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () =>
				expect(screen.getByTestId('firstname-error')).toHaveTextContent('First name should contain only letters'),
			);

			fireEvent.change(screen.getByRole('textbox', { name: 'lastName' }), {
				target: { value: 'Ja19-ck' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () =>
				expect(screen.getByTestId('lastname-error')).toHaveTextContent('Last name should contain only letters'),
			);

			fireEvent.change(screen.getByRole('textbox', { name: 'email' }), {
				target: { value: 'Ja19@kcom' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () =>
				expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address'),
			);

			fireEvent.change(screen.getByPlaceholderText('Password'), {
				target: { value: 'Ja1m' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () =>
				expect(screen.getByTestId('password-error')).toHaveTextContent('Password should not be less than 8 characters'),
			);

			// expect(api.signupUser).not.toBeCalled();

			expect(axios.post).not.toHaveBeenCalled();
		});

		test('Submit correct form data', async () => {
			const mockedResponse: AxiosResponse = {
				data: {
					data: {
						firstName: 'Jack',
						lastName: 'Danoski',
						email: 'test@gmail.net',
					},
				},
				status: 200,
				statusText: 'OK',
				headers: {},
				config: {},
			};

			// Make the mock return the custom axios response
			mockedAxios.post.mockResolvedValueOnce(mockedResponse);
			const screen = render(<Welcome />);

			await act(async () => {
				fireEvent.click(screen.getByTestId('open-signup-modal-btn'));

				await waitFor(() => expect(screen.getByTestId('signup-modal')).toBeInTheDocument());

				fireEvent.change(screen.getByRole('textbox', { name: 'firstName' }), {
					target: { value: 'Jack' },
				});
				fireEvent.input(screen.getByRole('textbox', { name: 'lastName' }), {
					target: { value: 'Danoski' },
				});
				fireEvent.input(screen.getByRole('textbox', { name: 'email' }), {
					target: { value: 'test@gmail.net' },
				});
				fireEvent.input(screen.getByPlaceholderText('Password'), {
					target: { value: 'helloworld' },
				});

				fireEvent.submit(screen.getByTestId('signup-modal-btn'));

				await waitForElementToBeRemoved(screen.getByTestId('signup-modal'));
				// await screen.findByText('A verification mail has been sent to your email address.');
				await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
				await waitFor(() =>
					expect(axios.post).toHaveBeenCalledWith('/auth/signup', {
						firstName: 'Jack',
						lastName: 'Danoski',
						email: 'test@gmail.net',
						password: 'helloworld',
					}),
				);
			});
		});
	});

	describe('Login', () => {
		test('Open modal', async () => {
			const { getByText } = render(<Welcome />);
			const button = getByText('Login');
			expect(button.textContent).toBe('Login');
			fireEvent.click(button);
			expect(getByText('Welcome back')).toBeTruthy();
		});

		test('Should render the basic field', async () => {
			render(
				<LoginModal
					closeModal={function (event: React.MouseEvent<HTMLButtonElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>,
			);
			expect(
				screen.getByRole('img', {
					name: 'imgOne',
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('img', {
					name: 'imgTwo',
				}),
			).toBeInTheDocument();
			expect(
				screen.getByRole('img', {
					name: 'imgThree',
				}),
			).toBeInTheDocument();
			expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
			expect(screen.getByRole('password')).toHaveAttribute('type', 'password');
		});

		test('should validate empty form fields', async () => {
			render(
				<LoginModal
					closeModal={function (event: React.MouseEvent<HTMLButtonElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>,
			);

			fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

			await waitFor(async () => expect(screen.getByTestId('email-error')).toHaveTextContent('email is required'));

			await waitFor(async () => expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required'));

			expect(axios.post).not.toHaveBeenCalled();
		});

		test('should validate invalid fields', async () => {
			render(
				<LoginModal
					closeModal={function (event: React.MouseEvent<HTMLButtonElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>,
			);

			fireEvent.change(screen.getByRole('textbox', { name: 'email' }), {
				target: { value: 'Ja19@kcom' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

			await waitFor(async () =>
				expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address'),
			);

			fireEvent.change(screen.getByPlaceholderText('Password'), {
				target: { value: 'Ja1m' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

			await waitFor(async () =>
				expect(screen.getByTestId('password-error')).toHaveTextContent('Password should not be less than 8 characters'),
			);

			expect(axios.post).not.toHaveBeenCalled();
		});

		test('Submit correct form data', async () => {
			const history = createMemoryHistory();
			history.push('/home');

			const mockedResponse: AxiosResponse = {
				data: {
					data: {
						firstName: 'Jack',
						lastName: 'Danoski',
						email: 'test@gmail.net',
					},
				},
				status: 200,
				statusText: 'OK',
				headers: {},
				config: {},
			};

			// Make the mock return the custom axios response
			mockedAxios.post.mockResolvedValueOnce(mockedResponse);

			const screen = render(
				<Router history={history}>
					<Welcome />
				</Router>,
			);
			await act(async () => {
				fireEvent.click(screen.getByTestId('open-login-modal-btn'));

				await waitFor(() => expect(screen.getByTestId('login-modal')).toBeInTheDocument());

				fireEvent.input(screen.getByRole('textbox', { name: 'email' }), {
					target: { value: 'test@gmail.net' },
				});
				fireEvent.input(screen.getByPlaceholderText('Password'), {
					target: { value: 'helloworld' },
				});

				fireEvent.submit(screen.getByTestId('login-modal-btn'));

				await waitForElementToBeRemoved(screen.getByTestId('login-modal'));

				await waitFor(() =>
					expect(axios.post).toHaveBeenCalledWith('/auth/signin', {
						email: 'test@gmail.net',
						password: 'helloworld',
					}),
				);
				await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
				expect(history.location.pathname).toEqual('/home');
			});
		});
	});

	describe('AuthSlice', () => {
		it('should clear server messages', () => {
			const nextState = authSlice(initialState, clearServerMessage());
			expect(nextState).toStrictEqual({ ...initialState, isError: false, isSuccess: false });
		});

		it('signupUser.fulfilled', () => {
			const user = {
				email: 'sevahe7418@latovic.com',
				firstName: 'olisa',
				id: 'f947f8fe-4917-4f93-93da-64cde0868a0d',
				isVerified: true,
				lastName: 'emodi',
				passwordResetToken: null,
				passwordTokenExpiry: null,
				role: 'user',
			};

			const fulfilledAction = signupUser.fulfilled(
				// mock response from thunk
				{
					email: 'sevahe7418@latovic.com',
					firstName: 'olisa',
					id: 'f947f8fe-4917-4f93-93da-64cde0868a0d',
					isVerified: true,
					lastName: 'emodi',
					passwordResetToken: null,
					passwordTokenExpiry: null,
					role: 'user',
				},
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					firstName: 'olisa',
					lastName: 'emodi',
					email: 'sevahe7418@latovic.com',
					password: 'any',
				},
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/signup/fulfilled');
			expect(fulfilledAction.payload).toEqual(user);
			expect(nextState).toStrictEqual({
				...initialState,
				user: fulfilledAction.payload,
				isError: false,
				isSuccess: true,
				isAuthenticating: false,
			});
		});

		it('signupUser.pending', () => {
			const pendingAction = signupUser.pending(
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					firstName: 'olisa',
					lastName: 'emodi',
					email: 'sevahe7418@latovic.com',
					password: 'any',
				},
			);

			const nextState = authSlice(initialState, pendingAction);

			expect(pendingAction.type).toEqual('users/signup/pending');
			expect(pendingAction.payload).toEqual(undefined);

			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticating: true,
				isError: false,
			});
		});

		it('signupUser.rejected', () => {
			const rejectedAction = signupUser.rejected(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					firstName: 'olisa',
					lastName: 'emodi',
					email: 'sevahe7418@latovic.com',
					password: 'any',
				},
				{ status: 'failure', error: 'error message from request' },
			);

			const nextState = authSlice(initialState, rejectedAction);

			expect(rejectedAction.type).toEqual('users/signup/rejected');
			expect(rejectedAction.error).toEqual({ message: 'Rejected' });
			expect(rejectedAction.payload).toEqual({ status: 'failure', error: 'error message from request' });

			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticating: false,
				isError: true,
				errorMessage: 'error message from request',
			});
		});

		it('loginUser.fulfilled', () => {
			const user = {
				email: 'sevahe7418@latovic.com',
				firstName: 'olisa',
				id: 'f947f8fe-4917-4f93-93da-64cde0868a0d',
				isVerified: true,
				lastName: 'emodi',
				passwordResetToken: null,
				passwordTokenExpiry: null,
				role: 'user',
			};

			const fulfilledAction = loginUser.fulfilled(
				// mock response from thunk
				{
					email: 'sevahe7418@latovic.com',
					firstName: 'olisa',
					id: 'f947f8fe-4917-4f93-93da-64cde0868a0d',
					isVerified: true,
					lastName: 'emodi',
					passwordResetToken: null,
					passwordTokenExpiry: null,
					role: 'user',
				},
				// mock request id string
				'6537yu2hf',
				// mock parameter to signinUser thunk
				{
					email: 'sevahe7418@latovic.com',
					password: 'any',
				},
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/signin/fulfilled');
			expect(fulfilledAction.payload).toEqual(user);
			expect(nextState).toStrictEqual({
				...initialState,
				user: fulfilledAction.payload,
				isError: false,
				isSuccess: true,
				isAuthenticating: false,
				isAuthenticated: true,
			});
		});

		it('loginUser.pending', () => {
			const pendingAction = loginUser.pending(
				// mock request id string
				'6537yu2hf',
				// mock parameter to signinUser thunk
				{
					email: 'sevahe7418@latovic.com',
					password: 'any',
				},
			);

			const nextState = authSlice(initialState, pendingAction);

			expect(pendingAction.type).toEqual('users/signin/pending');
			expect(pendingAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticating: true,
				isAuthenticated: false,
				isError: false,
			});
		});

		it('loginUser.rejected', () => {
			const rejectedAction = loginUser.rejected(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					email: 'sevahe7418@latovic.com',
					password: 'any',
				},
				{ status: 'failure', error: 'error message from request' },
			);

			const nextState = authSlice(initialState, rejectedAction);

			expect(rejectedAction.type).toEqual('users/signin/rejected');
			expect(rejectedAction.error).toEqual({ message: 'Rejected' });
			expect(rejectedAction.payload).toEqual({ status: 'failure', error: 'error message from request' });

			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticating: false,
				isError: true,
				errorMessage: 'error message from request',
			});
		});

		it('forgotPassword.fulfilled', () => {
			const user = {
				email: 'sevahe7418@latovic.com',
				firstName: 'olisa',
				id: 'f947f8fe-4917-4f93-93da-64cde0868a0d',
				isVerified: true,
				lastName: 'emodi',
				passwordResetToken: null,
				passwordTokenExpiry: null,
				role: 'user',
			};

			const fulfilledAction = forgotPassword.fulfilled(
				// mock response from thunk
				undefined,
				// mock request id string
				'6537yu2hf',
				// mock parameter to signinUser thunk
				{
					email: 'sevahe7418@latovic.com',
				},
			);

			const nextState = authSlice(initialState, fulfilledAction);
			expect(fulfilledAction.type).toEqual('users/forgotpassword/fulfilled');
			expect(fulfilledAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				user: fulfilledAction.payload,
				isError: false,
				isSuccess: true,
				isAuthenticating: false,
			});
		});

		it('forgotPassword.pending', () => {
			const pendingAction = forgotPassword.pending(
				// mock request id string
				'6537yu2hf',
				// mock parameter to signinUser thunk
				{
					email: 'sevahe7418@latovic.com',
				},
			);

			const nextState = authSlice(initialState, pendingAction);

			expect(pendingAction.type).toEqual('users/forgotpassword/pending');
			expect(pendingAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticating: true,
				isSuccess: false,
				isError: false,
			});
		});

		it('forgotPassword.rejected', () => {
			const rejectedAction = forgotPassword.rejected(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					email: 'sevahe7418@latovic.com',
				},
				undefined,
				// { status: 'failure', error: 'error message from request' },
			);

			const nextState = authSlice(initialState, rejectedAction);

			expect(rejectedAction.type).toEqual('users/forgotpassword/rejected');
			expect(rejectedAction.error.message).toEqual({ email: 'Rejected' });
			expect(rejectedAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticating: false,
				isError: true,
				errorMessage: 'error message from request',
			});
		});

		it('verifyUser.fulfilled', () => {
			const user = {
				email: 'sevahe7418@latovic.com',
				firstName: 'olisa',
				id: 'f947f8fe-4917-4f93-93da-64cde0868a0d',
				isVerified: true,
				lastName: 'emodi',
				passwordResetToken: null,
				passwordTokenExpiry: null,
				role: 'user',
			};

			const fulfilledAction = verifyUser.fulfilled(
				// mock response from thunk
				{
					email: 'sevahe7418@latovic.com',
					firstName: 'olisa',
					id: 'f947f8fe-4917-4f93-93da-64cde0868a0d',
					isVerified: true,
					lastName: 'emodi',
					passwordResetToken: null,
					passwordTokenExpiry: null,
					role: 'user',
				},
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					email: 'sevahe7418@latovic.com',
					token: 'any',
				},
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/verification/fulfilled');
			expect(fulfilledAction.payload).toEqual(user);
			expect(nextState).toStrictEqual({
				...initialState,
				user: fulfilledAction.payload,
				isError: false,
				isAuthenticated: true,
				isVerified: true,
				isAuthenticating: false,
			});
		});

		it('verifyUser.pending', () => {
			const pendingAction = verifyUser.pending(
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					email: 'sevahe7418@latovic.com',
					token: 'any',
				},
			);

			const nextState = authSlice(initialState, pendingAction);

			expect(pendingAction.type).toEqual('users/verification/pending');
			expect(pendingAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isVerified: false,
				isError: false,
				isAuthenticating: true,
			});
		});

		it('verifyuser.rejected', () => {
			const rejectedAction = verifyUser.rejected(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
				// mock parameter to signupUser thunk
				{
					email: 'sevahe7418@latovic.com',
					token: 'any',
				},
				{ status: 'failure', error: 'error message from request' },
			);

			const nextState = authSlice(initialState, rejectedAction);

			expect(rejectedAction.type).toEqual('users/verification/rejected');
			expect(rejectedAction.error).toEqual({ message: 'Rejected' });
			expect(rejectedAction.payload).toEqual({ status: 'failure', error: 'error message from request' });

			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isError: true,
				isVerified: false,
				isAuthenticating: false,
				errorMessage: 'error message from request',
			});
		});

		it('loadUser.fulfilled', () => {
			const fulfilledAction = loadUser.fulfilled(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/loggedin/fulfilled');
			expect(fulfilledAction.payload).toEqual(null);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isError: false,
				isAuthenticating: false,
			});
		});

		it('loadUser.pending', () => {
			const fulfilledAction = loadUser.pending(
				// mock request id string
				'6537yu2hf',
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/loggedin/pending');
			expect(fulfilledAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isError: false,
				isAuthenticating: true,
			});
		});

		it('loadUser.rejected', () => {
			const fulfilledAction = loadUser.rejected(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/loggedin/rejected');
			expect(fulfilledAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isError: true,
				isAuthenticating: false,
			});
		});

		it('logoutUser.fulfilled', () => {
			const fulfilledAction = logoutUser.fulfilled(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/logout/fulfilled');
			expect(fulfilledAction.payload).toEqual(null);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isError: false,
				isSuccess: false,
				isAuthenticating: false,
			});
		});

		it('logout.pending', () => {
			const fulfilledAction = logoutUser.pending(
				// mock request id string
				'6537yu2hf',
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/logout/pending');
			expect(fulfilledAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isError: false,
				isAuthenticating: true,
			});
		});

		it('logoutUser.rejected', () => {
			const fulfilledAction = logoutUser.rejected(
				// error is null because we are handling rejected value manually with `rejectWithValue`
				null,
				// mock request id string
				'6537yu2hf',
			);

			const nextState = authSlice(initialState, fulfilledAction);

			expect(fulfilledAction.type).toEqual('users/logout/rejected');
			expect(fulfilledAction.payload).toEqual(undefined);
			expect(nextState).toStrictEqual({
				...initialState,
				isAuthenticated: false,
				isError: true,
				isAuthenticating: false,
			});
		});
	});
});
