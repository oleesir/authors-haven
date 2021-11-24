import React, { FunctionComponent } from 'react';
import Aux from '../../../Aux';
import classes from './GenericModal.module.css';

const GenericModal: FunctionComponent = ({ children }) => {
	return (
		<Aux>
			<div className={classes.Backdrop} />
			<div className={`${classes.ModalContainer} ${classes.FullscreenModalContainer}`}>{children}</div>
		</Aux>
	);
};

export default GenericModal;
