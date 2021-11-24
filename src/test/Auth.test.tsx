import { screen, fireEvent, render as rtlRender, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupModal from '../components/Modals/SignupModal/SignupModal';
import LoginModal from '../components/Modals/LoginModal/LoginModal';
import { Provider } from 'react-redux';
import { store } from '../store';
import AuthService from '../services/auth.services';
import Welcome from '../pages/Welcome/Welcome';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const render = (component: {} | null | undefined) => rtlRender(<Provider store={store}>{component}</Provider>);

jest.mock('../services/auth.services', () => ({
	signupUser: jest.fn(),
	signinUser: jest.fn(),
	// verifyToken: jest.fn(),
}));

let api: jest.Mocked<typeof AuthService>;

beforeAll(() => {
	api = AuthService as any;
});

// Clean up after yourself.
// Do you want bugs? Because that's how you get bugs.
afterAll(() => {
	jest.unmock('../services/auth.services');
});

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

			await waitFor(async () => expect(screen.getByTestId('firstname-error')).toHaveTextContent('First name is required'));

			await waitFor(async () => expect(screen.getByTestId('lastname-error')).toHaveTextContent('Last name is required'));

			await waitFor(async () => expect(screen.getByTestId('email-error')).toHaveTextContent('email is required'));

			await waitFor(async () => expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required'));

			expect(api.signupUser).not.toBeCalled();
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

			await waitFor(async () => expect(screen.getByTestId('firstname-error')).toHaveTextContent('First name should contain only letters'));

			fireEvent.change(screen.getByRole('textbox', { name: 'lastName' }), {
				target: { value: 'Ja19-ck' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () => expect(screen.getByTestId('lastname-error')).toHaveTextContent('Last name should contain only letters'));

			fireEvent.change(screen.getByRole('textbox', { name: 'email' }), {
				target: { value: 'Ja19@kcom' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () => expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address'));

			fireEvent.change(screen.getByPlaceholderText('Password'), {
				target: { value: 'Ja1m' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () => expect(screen.getByTestId('password-error')).toHaveTextContent('Password should not be less than 8 characters'));

			expect(api.signupUser).not.toBeCalled();
		});

		test('Submit correct form data', async () => {
			(AuthService.signupUser as jest.Mock).mockResolvedValue({
				data: {
					data: {
						firstName: 'Jack',
						lastName: 'Danoski',
						email: 'test@gmail.net',
					},
				},
			});
			render(
				<SignupModal
					closeModal={function (event: React.MouseEvent<HTMLButtonElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>,
			);

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

			fireEvent.submit(screen.getByRole('button', { name: 'Signup' }));

			await waitFor(async () =>
				expect(api.signupUser).toHaveBeenCalledWith({
					firstName: 'Jack',
					lastName: 'Danoski',
					email: 'test@gmail.net',
					password: 'helloworld',
				}),
			);
			await waitFor(() => {
				expect(api.signupUser).toHaveBeenCalledTimes(1);
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

			expect(api.signinUser).not.toBeCalled();
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

			await waitFor(async () => expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email address'));

			fireEvent.change(screen.getByPlaceholderText('Password'), {
				target: { value: 'Ja1m' },
			});
			fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

			await waitFor(async () => expect(screen.getByTestId('password-error')).toHaveTextContent('Password should not be less than 8 characters'));

			expect(api.signinUser).not.toBeCalled();
		});

		test('Submit correct form data', async () => {
			const closeModal = jest.fn();
			const history = createMemoryHistory();
			const route = '/home';
			history.push(route);

			(AuthService.signinUser as jest.Mock).mockResolvedValue({
				data: {
					data: {
						firstName: 'Jack',
						lastName: 'Danoski',
						email: 'test@gmail.net',
					},
				},
			});
			render(
				<Router history={history}>
					<LoginModal closeModal={closeModal} />
				</Router>,
			);

			fireEvent.input(screen.getByRole('textbox', { name: 'email' }), {
				target: { value: 'test@gmail.net' },
			});
			fireEvent.input(screen.getByPlaceholderText('Password'), {
				target: { value: 'helloworld' },
			});

			fireEvent.submit(screen.getByRole('button', { name: 'Login' }));

			await waitFor(async () =>
				expect(api.signinUser).toHaveBeenCalledWith({
					email: 'test@gmail.net',
					password: 'helloworld',
				}),
			);
			await waitFor(() => {
				expect(api.signinUser).toHaveBeenCalledTimes(1);
			});
			expect(history.length).toBe(3);
			expect(history.location.pathname).toBe('/home');
		});
	});
});
