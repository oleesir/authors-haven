import { render as rtlRender, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../store';

const render = (component: {} | null | undefined) =>
	rtlRender(<Provider store={store}>{component}</Provider>);

describe('App', () => {
	test('renders learn react link', () => {
		render(<App />);
		const linkElement = screen.getByText(/Explore Amazing Topics/i);
		expect(linkElement).toBeInTheDocument();
	});
});
