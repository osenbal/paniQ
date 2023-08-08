import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NotificationLocalStorage from '@/Data/DataSource/LocalStorage/NotificationLocalStorage';
import { NotificationUseCaseImpl } from '../UseCase/Notification/NotificationUseCaseImpl';

const notificationPermission = NotificationLocalStorage.getNotifications();
const notificationUseCase = NotificationUseCaseImpl.getInstance();

interface INotificationState {
  notificationPermission: NotificationPermission;
}

// Define the initial state using that type
const initialState: INotificationState = {
  notificationPermission,
};

export const asyncSubscribeToTopic = createAsyncThunk(
  'global/subscribeToTopic',
  async (fcmTokenClient: string, { rejectWithValue }) => {
    try {
      const res = await notificationUseCase.getSubscribeToTopic(fcmTokenClient);
      if (res.status === true) {
        return res.data;
      } else {
        return rejectWithValue(res.message || 'Something went wrong');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

export const asyncUnsubscribeFromTopic = createAsyncThunk(
  'global/unsubscribeFromTopic',
  async (fcmTokenClient: string, { rejectWithValue }) => {
    if (!fcmTokenClient) {
      return;
    }
    try {
      const res = await notificationUseCase.getUnsubscribeFromTopic(
        fcmTokenClient
      );
      if (res.status === true) {
        return res.data;
      } else {
        return rejectWithValue(res.message || 'Something went wrong');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

export const notificationSlice = createSlice({
  name: 'notification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotificationPermission: (state, action) => {
      NotificationLocalStorage.setNotifications(action.payload);
      state.notificationPermission = action.payload;
    },
  },
});

export const { setNotificationPermission } = notificationSlice.actions;

export default notificationSlice.reducer;
