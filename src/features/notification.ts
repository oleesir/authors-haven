import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
type Notification = {
	message: string;
	type: string;
};

type NotificationsState = {
	notifications: Array<Notification>;
};

type Error = {
	message: string;
};

type NotificationsReducers = {
	createNotification: CaseReducer<
		NotificationsState,
		PayloadAction<Notification | Error>
	>;
};

const notificationSlice = createSlice<
	NotificationsState,
	NotificationsReducers,
	'notify'
>({
	name: 'notify',
	initialState: {
		notifications: [],
	},
	reducers: {
		createNotification: (state, action) => {
			state.notifications.push({
				message: action.payload.message,
				type: (action.payload as Notification).type,
			});
		},
	},
});
export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
