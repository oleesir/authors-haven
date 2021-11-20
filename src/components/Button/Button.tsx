import React, { FunctionComponent, ReactNode } from 'react';
import classes from './Button.module.css';

type BtnProps = {
	type: 'submit' | 'reset' | 'button' | undefined;
	disabled: boolean | undefined;
	btnTypes: string;
	sizes: string;
	onClick: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
	children?: ReactNode;
};

const Button: FunctionComponent<BtnProps> = ({
	type,
	disabled,
	btnTypes,
	sizes,
	children,
	onClick,
}) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={[classes[btnTypes], classes[sizes]].join(' ')}
			{...(type !== 'submit' && { onClick: onClick })}
		>
			{children}
		</button>
	);
};

export default Button;
