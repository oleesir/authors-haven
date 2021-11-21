import React, { useEffect, useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import classes from './Notification.module.css';

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

	const notificationType =
		newNotifications.type === 'success' ? 'Success' : 'Error';
	const notificationMsg =
		newNotifications.message === 'verification mail'
			? 'A verification mail has been sent to your email address.'
			: 'Error';
	return (
		<>
			{show && (
				<div className={classes[notificationType]}>
					<div className={classes.Content}>
						<div className={classes.IconMsg}>
							<FaCheckCircle size={'1.1em'} />
							<p>{notificationMsg}</p>
						</div>
						<FaRegTimesCircle size={'1.2em'} onClick={onClose} />
					</div>
				</div>
			)}
		</>
	);
};

export default Notification;
