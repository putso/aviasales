import { configureStore } from '@reduxjs/toolkit';
import ticketSlice from './slice/ticketSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
    tickets: ticketSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
