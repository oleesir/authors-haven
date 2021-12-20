import React, { FunctionComponent, ReactNode } from 'react';
import classes from './Button.module.css';

type BtnProps = {
	type?: 'submit' | 'reset' | 'button';
	disabled?: boolean;
	btnTypes: string;
	sizes: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	children?: ReactNode;
	dataTestId?: string;
};

const Button: FunctionComponent<BtnProps> = ({ type, disabled, btnTypes, sizes, children, onClick, dataTestId }) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={[classes[btnTypes], classes[sizes]].join(' ')}
			data-testid={dataTestId}
			{...(type !== 'submit' && { onClick: onClick })}
		>
			{children}
		</button>
	);
};

export default Button;
