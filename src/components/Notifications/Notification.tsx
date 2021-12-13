import React, { useEffect, useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import classes from './Notification.module.css';
import { notificationMessages, notificationValue } from '../../constants';

type toastObject = {
	message: string;
	type: string;
};
interface IState {
	notify: { notifications: Array<toastObject> };
}

const Notification: FunctionComponent = () => {
	const [newNotifications, setNewNotifications] = useState({
		type: '',
		message: '',
	});

	const [show, setShow] = useState(false);
	const { notifications } = useSelector((state: IState) => state.notify);

	let notificationMsg;

	useEffect(() => {
		const getData = () => {
			if (notifications.length > 0) {
				setNewNotifications(notifications[notifications.length - 1]);
				setShow(true);
			}
		};
		if (notifications.length) {
			getData();
		}
	}, [notifications]);

	const onClose = () => {
		setShow(false);
	};

	const notificationType = newNotifications.type === 'success' ? 'Success' : 'Error';

	switch (newNotifications.message) {
		case notificationValue.FORGOTPASSWORD:
			notificationMsg = notificationMessages.FORGETPASSWORDMAIL;
			break;
		case notificationValue.VERIFYEMAIL:
			notificationMsg = notificationMessages.VERIFICATIONMAIL;
			break;
		case notificationValue.RESETPASSWORD:
			notificationMsg = notificationMessages.RESETPASSWORDMAIL;
			break;

		default:
			break;
	}

	return (
		<>
			{show && (
				<div className={classes[notificationType]}>
					<div className={classes.Content}>
						<FaCheckCircle size={'1.5em'} />
						<div className={classes.IconMsg}>
							<p>{notificationMsg}</p>
						</div>
						<FaRegTimesCircle size={'1.5em'} onClick={onClose} />
					</div>
				</div>
			)}
		</>
	);
};

export default Notification;
